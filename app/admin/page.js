'use client';
import { useState, useTransition, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { RiGlassesLine } from 'react-icons/ri';
import { GoTrash } from 'react-icons/go';
import { AnimatePresence } from 'framer-motion';
import { RWebShare } from 'react-web-share';
import { Document, Page } from 'react-pdf';

import { images, icons } from '../../constants';
import {
	InspectionsList,
	BusinessCard,
	AddBusiness,
	AddedChecklists,
	SelectChecklist,
	AddChecklist,
	MyChecklist,
	Empty,
	Loading,
	LoadingFailed,
	Button,
	Purchase,
	FormError,
	FormSuccess,
} from '../../components';
import {
	SidePopupWrapper,
	TitlePopupWrapper,
	IconPopupWrapper,
} from '../../wrappers';

import { SideNavIcons } from '../../components/svgs';
const defaultPDF = '/qc-advanced.pdf';

// SERVER ACTIONS/COMPONENTS
import {
	getBusinessList,
	deleteBusiness,
	completeInspection,
} from '@/actions/getBusiness'; //GET BUSINESS, DELETE BUSINESS, GET REPORT/COMPLETE INSPECTION

const overviewCardColors = ['#2d2d2b08', '#2d2d2b08', '#f5edc7'];

const OverviewCard = ({ i, label, value }) => (
	<div
		className={`p-5 rounded-xl`}
		style={{ background: overviewCardColors[i] }}
	>
		{i === 0 && (
			<RiGlassesLine className="text-[2.8rem] bg-[--tag] rounded-full p-[6px] mb-[-6px]" />
		)}
		{i === 1 && <SideNavIcons i={1} color={'#2d2d2b'} w={35} />}
		{i === 2 && <SideNavIcons i={2} color={'#2d2d2b'} w={35} />}
		<p className="text-[--black] !font-semibold pt-5 pb-1">{label}</p>
		<h1 className="text-[--brand]">{value}</h1>
	</div>
);

export default function Dashboard() {
	const [isLoading, setIsLoading] = useState(true); // The loading state of the business list
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [businessList, setBusinessList] = useState(); // For storing the business list information that would be placed on the dashboard
	const [overview, setOverview] = useState([]); //Overview data
	const [businessId, setBusinessId] = useState(); // For Storing The business id that would be gotten after a business is added and would be used by the checklist section
	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [pendingDelete, setPendingDelete] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	// VIEW REPORT
	const [showReport, setShowReport] = useState(false);
	const [loadingReport, setLoadingReport] = useState(false);
	const [reportPDF, setReportPDF] = useState();
	const [pageNumber, setPageNumber] = useState(1);

	// UI VARIABLES, as their names suggest
	const [showAddBusiness, setShowAddBusiness] = useState(false);
	const [showAddedChecklists, setShowAddedChecklists] = useState(false);
	const [showSelectChecklist, setShowSelectChecklist] = useState(false);
	const [showInspectionsList, setShowInspectionsList] = useState(false);
	const [activeBusiness, setActiveBusiness] = useState(0);
	const [showPurchase, setShowPurchase] = useState(true);
	const [showOptions, setShowOptions] = useState(false);
	const [activeBusinessName, setActiveBusinessName] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		getBusinessList(userId).then((data) => {
			// console.log(data?.data);
			// console.log(data?.overview);
			setBusinessList(data?.data?.data);
			setOverview([
				data?.overview?.data?.no_of_business,
				data?.overview?.data?.no_of_pending_actions,
				data?.overview?.data?.no_of_training_materials,
			]);
			setIsLoading(false);
			if (data?.data?.ResponseCode === 1) {
				setSuccessfullyLoaded(true);
			}
			if (String(data?.overview?.data?.is_subscription) === '1') {
				setShowPurchase(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// // ADD A STORE FUNCTIONS

	// SHOW OPTIONS FUNCTION
	const optionsPopup = (id, i) => {
		//id=business_is,i=list map's ndex
		setActiveBusiness(id);
		setActiveBusinessName(businessList[i].business_name);
		setShowOptions(true);
	};

	// INSPECTIONS FUNCTION
	const showInspection = () => {
		setShowOptions(false);
		setShowInspectionsList(true);
	};

	// DELETE BUSINESS
	const viewReport = () => {
		setShowReport(true);
		setLoadingReport(true);
		setShowOptions(false);

		completeInspection(activeBusiness).then((data) => {
			if (data?.response === 1) {
				setTimeout(() => {
					setLoadingReport(false);
					setReportPDF(data.report);
				}, 500);
			}
		});
	};

	// DELETE BUSINESS
	const requestDeleteBusiness = () => {
		setError('');
		setSuccess('');
		setPendingDelete(true);

		deleteBusiness(activeBusiness).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setPendingDelete(false);

			if (data?.response === 1) {
				let newBusinessList = businessList.filter((list) => {
					return list.business_id !== activeBusiness;
				});
				setBusinessList(newBusinessList);

				let newOverview = overview;
				newOverview[0] = overview[0] - 1;
				setOverview(newOverview);

				setTimeout(() => {
					setPendingDelete(false);
					setIsDeleting(false);
				}, 500);
			}
		});
	};

	return isLoading ? (
		<Loading notFull />
	) : successfullyLoaded ? (
		<>
			<div className="md:p-10">
				<h1 className="h-[15vh] lg:h-auto flex-center text-center">
					QC Advanced
				</h1>
				{/* OVERVIEW */}
				<div className="hidden lg:block w-full bg-white rounded-[--rounding] p-7 my-7">
					<div className="w-full h-full space-y-5">
						<h1 className="text-[--black]">Overview</h1>
						<div className="grid grid-cols-3 gap-5">
							<OverviewCard
								i={0}
								label="Number of Businesses"
								value={overview[0]}
							/>
							<OverviewCard i={1} label="Pending Actions" value={overview[1]} />
							<OverviewCard
								i={2}
								label="Training Materials"
								value={overview[2]}
							/>
						</div>
					</div>
				</div>
				{/* DASHBOARD CONTENT */}
				<div className="dashboard-content-box">
					<div className="!hidden md:!flex p-7 pb-0 flex-v-center justify-between">
						<h2 className="text-[--black]">My Stores</h2>

						<div className="!shadow-[#00000044] !w-auto">
							<Button
								onClick={() => setShowAddBusiness(true)}
								// onClick={() => setShowSelectChecklist(true)}
								text="Add Store"
							/>
						</div>
					</div>
					{businessList?.length > 0 ? (
						<div className="w-full px-4 py-5 md:p-7 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
							{[
								...businessList,
								...businessList,
								...businessList,
								...businessList,
								...businessList,
								...businessList,
								...businessList,
								...businessList,
							]?.map(
								(
									{
										business_img,
										business_name,
										business_email,
										location,
										business_id,
									},
									i
								) => (
									<BusinessCard
										key={i}
										img={business_img}
										name={business_name}
										email={business_email}
										location={location}
										onClick={() => optionsPopup(business_id, i)}
									/>
								)
							)}
						</div>
					) : (
						<Empty text="No material added" />
					)}
					<div className="md:hidden pt-2 container">
						<button className="btn-1" onClick={() => setShowAddBusiness(true)}>
							add a store
						</button>
						<div className="pb" />
					</div>
				</div>
			</div>

			{/* ADD BUSINESS */}
			{showAddBusiness && (
				<AddBusiness
					close={() => setShowAddBusiness(false)}
					nextPopup={() => setShowAddedChecklists(true)}
					setBusinessId={setBusinessId}
					userId={userId}
					businessList={businessList}
					setBusinessList={setBusinessList}
				/>
			)}

			{/* ADDED CHECKLISTS */}
			<AnimatePresence>
				{showAddedChecklists && (
					<AddedChecklists
						back={() => setShowAddedChecklists(false)}
						close={() => {
							setShowAddBusiness(false);
							setShowAddedChecklists(false);
						}}
						businessId={businessId}
						userId={userId}
						inspection={false}
					/>
				)}
			</AnimatePresence>

			{/* SELECT CHECKLIST */}
			{/* <AnimatePresence>
				{showSelectChecklist && (
					<SelectChecklist
						back={() => setShowSelectChecklist(false)}
						close={() => {
							setShowAddBusiness(false);
							setShowSelectChecklist(false);
						}}
						businessId={businessId}
						userId={userId}
					/>
				)}
			</AnimatePresence> */}

			{/* BUSINESS CARD OPTIONS */}
			{showOptions && (
				<TitlePopupWrapper darkBg options close={() => setShowOptions(false)}>
					<div className="bg-[--card] border border-[--border] rounded-2xl flex flex-col w-full overflow-hidden">
						{/* INSPECTIONS */}
						<button
							type="button"
							className="options-btn group"
							onClick={() => viewReport()}
						>
							<span className="group-hover:scale-110 group-hover:text-[--brand] inline-block transition duration-700">
								view report
							</span>
						</button>
						<button
							type="button"
							className="options-btn group"
							onClick={() => showInspection()}
						>
							<span className="group-hover:scale-110 group-hover:text-[--brand] inline-block transition duration-700">
								Inspection
							</span>
						</button>
						{/* DELETE */}
						<button
							type="button"
							className="options-btn group"
							onClick={() => {
								setError('');
								setSuccess('');
								setIsDeleting(true);
							}}
						>
							<div className="group-hover:scale-110 group-hover: text-[--brand] inline-flex items-center gap-[6px] transition duration-700 ">
								<GoTrash className="scale-110" />
								<span>Delete Business</span>
							</div>
						</button>
					</div>
				</TitlePopupWrapper>
			)}
			{showPurchase && <Purchase close={() => setShowPurchase(false)} />}

			{/* DELETE PROMPT */}
			{isDeleting && (
				<IconPopupWrapper
					icon={
						success
							? images.congratulations
							: error
							? images.query
							: images.query
					}
					title={`Delete Business`}
					text={
						success
							? ''
							: error
							? ''
							: `Are you sure you want to delete ${activeBusinessName}`
					}
					smallIcon
					className={pendingDelete && 'pointer-events-none'}
				>
					<div
						className={`space-y-3 pt-3 w-full ${pendingDelete && 'pending'}`}
					>
						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}

						<div className="grid grid-cols-2 gap-3 w-[80%] mx-auto">
							<Button onClick={() => setIsDeleting(false)} text="no" noBg />
							<Button
								onClick={() => requestDeleteBusiness()}
								text="Yes"
								sm
								submitting={pendingDelete}
							/>
						</div>
					</div>
				</IconPopupWrapper>
			)}
			{/* VIEW REPORT */}
			{showReport && (
				<SidePopupWrapper close={() => setShowReport(false)} title="Report">
					{loadingReport ? (
						<Loading inner />
					) : (
						<div className="h-full w-full py-5 px-4 lg:p-5 relative">
							<iframe
								src={reportPDF ? reportPDF : defaultPDF}
								title="Report"
								className="w-full h-full overflow-auto pb-[65px]"
							>
								<p>{`Can't view report on this device`}</p>
							</iframe>
							{/* <Document file={reportPDF}>
								<Page pageNumber={pageNumber} />
							</Document> */}
							<div className="absolute bottom-0 right-0 w-full py-4 px-4 lg:p-x7 grid grid-cols-2 gap-2 bg-[--white]">
								<Button
									noBg
									text="Download"
									// link={reportPDF ? reportPDF : defaultPDF}
									// newPage
									onClick={() =>
										window.open(reportPDF ? reportPDF : defaultPDF)
									}
								/>
								<RWebShare
									data={{
										url: reportPDF ? reportPDF : defaultPDF,
										title: `Report on ${activeBusinessName}`,
									}}
									// onClick={() => console.log('shared successfully!')}
								>
									<Button text="Share" noClick />
								</RWebShare>
							</div>
						</div>
					)}
				</SidePopupWrapper>
			)}

			{showInspectionsList && (
				<InspectionsList
					close={() => setShowInspectionsList(false)}
					title={activeBusinessName}
					userId={userId}
					businessId={activeBusiness}
				/>
			)}
		</>
	) : (
		<LoadingFailed />
	);
}

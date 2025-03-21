'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { RiGlassesLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import { images, icons, variants } from '../../constants';
import {
	InspectionCard,
	InspectionDetails,
	Loading,
	LoadingFailed,
	Button,
	Empty,
	InspectionsArchive,
} from '../../components';
import {
	SidePopupWrapper,
	TitlePopupWrapper,
	IconPopupWrapper,
} from '../../wrappers';

import { SideNavIcons } from '../../components/svgs';

// API RELATED
import { getListOfChecklistUser } from '@/actions/getChecklist';
import { completeInspection } from '@/actions/misc';

// OVERVIEW
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
	const [showInspectionCompleted, setShowInspectionCompleted] = useState(false);
	const [showInspectionError, setShowInspectionError] = useState(false);
	const [submittingInspection, setSubmittingInspection] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [inspectionData, setInspectionData] = useState();
	const [archiveList, setArchiveList] = useState();
	const [overview, setOverview] = useState([]); //Overview data
	const [businessId, setBusinessId] = useState();

	const { data: session } = useSession();
	const userId = session?.user?.id;

	const [activeInspection, setActiveInspection] = useState(0);
	const [toggleInspectionDetails, setToggleInspectionDetails] = useState(false);
	const [showArchive, setShowArchive] = useState(false);
	const [invitees, setInvitees] = useState();

	// SUBCHECKLIST VARIABLES
	const [activeSubchecklist_id, setActiveSubchecklist_id] = useState();

	const showInspectionDetails = async (i) => {
		await setActiveInspection(i);
		await setToggleInspectionDetails(true);
	};

	const callGetInspectionList = () => {
		setIsLoading(true);
		setSuccessfullyLoaded(false);
		getListOfChecklistUser()
			.then((data) => {
				// console.log(data);
				setInspectionData(data?.checklist?.data?.checklist_data);
				setArchiveList(data?.archive?.data);
				setInvitees(data?.checklist?.data?.invited_user_list);
				setOverview([
					data?.overview?.data?.no_of_business,
					data?.overview?.data?.no_of_pending_actions,
					data?.overview?.data?.no_of_training_materials,
				]);
				setBusinessId(data?.overview?.data?.business_id);

				// return
				return {
					success: data.response,
				};
			})
			.then((data) => {
				if (data?.success === 1) {
					setSuccessfullyLoaded(true);
				}
				setIsLoading(false);
			});
	};

	// LOAD CHECKLIST DATA
	useEffect(() => {
		callGetInspectionList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const callCompleteInspection = () => {
		setSubmittingInspection(true);
		completeInspection(businessId).then((data) => {
			setSubmittingInspection(false);

			// console.log(data?.data);

			if (data?.response === 1) {
				setShowInspectionCompleted(true);
			} else {
				setShowInspectionError(true);
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
					<div
						className={`!hidden md:!flex p-7 pb-0 flex-v-center justify-between ${
							submittingInspection && 'pending'
						}`}
					>
						<h2 className="text-[--black]">Inspections</h2>
						<div className="flex-v-center gap-2">
							<motion.button
								type="button"
								whileTap="tap"
								whileHover="hover"
								variants={variants.buttonClick}
								onClick={() => setShowArchive(true)}
								className="flex-v-center py-3 px-[10px] md:px-3 !gap-2 bg-[--highlight-bg] border border-[--brand] rounded-lg"
							>
								<Image
									src={icons.archive}
									alt={'invite new user'}
									className={`w-[18px] min-w-[18px] max-w-[18px] h-auto object-cover md:w-[20px] md:min-w-[20px] md:max-w-[20px]`}
								/>
								<p className="black-text">My Archive</p>
							</motion.button>
							<div className="md:hidden lg:block">
								<Button
									onClick={() => callCompleteInspection()}
									text="Complete Inspection"
									submitting={submittingInspection}
								/>
							</div>
						</div>
					</div>

					{inspectionData && inspectionData.length > 0 ? (
						<div
							className={`w-full px-4 py-5 md:p-7 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 ${
								submittingInspection && 'pending'
							}`}
						>
							<motion.button
								type="button"
								whileTap="tap"
								whileHover="hover"
								variants={variants.buttonClick}
								onClick={() => setShowArchive(true)}
								className="flex-v-center py-3 px-[10px] md:px-3 !gap-2 bg-[--highlight-bg] border border-[--brand] rounded-lg md:hidden"
							>
								<Image
									src={icons.archive}
									alt={'invite new user'}
									className={`w-[18px] min-w-[18px] max-w-[18px] h-auto object-cover md:w-[20px] md:min-w-[20px] md:max-w-[20px]`}
								/>
								<p className="black-text">My Archive</p>
							</motion.button>
							{inspectionData.map((inspection, i) => (
								<InspectionCard
									key={i}
									inspectionContent={inspection}
									title={inspection.name}
									percentage={inspection.percentage}
									completed={inspection.ans_yes_count}
									total={inspection.ans_yes_no_count}
									toggled={activeInspection === i}
									onClick={() => showInspectionDetails(i)}
									userId={userId}
									business_checklist_id={inspection.business_checklist_id}
									archiveList={archiveList}
									setArchiveList={setArchiveList}
									inspectionData={inspectionData}
									setInspectionData={setInspectionData}
								/>
							))}
							<div className="lg:hidden pt-5">
								<Button
									onClick={() => callCompleteInspection()}
									text="Complete Inspection"
									submitting={submittingInspection}
								/>
							</div>
						</div>
					) : (
						<div className="w-full h-full min-h-[50vh]">
							<Empty text="No Checklist Added" />
						</div>
					)}
				</div>

				{toggleInspectionDetails && (
					<SidePopupWrapper
						close={() => setToggleInspectionDetails(false)}
						title={inspectionData[activeInspection].name}
					>
						<InspectionDetails
							userId={userId}
							checklistId={
								inspectionData[activeInspection].business_checklist_id
							}
							businessId={businessId}
						/>
					</SidePopupWrapper>
				)}

				{showArchive && (
					<InspectionsArchive
						close={() => setShowArchive(false)}
						userId={userId}
						archiveList={archiveList}
						setArchiveList={setArchiveList}
						inspectionData={inspectionData}
						setInspectionData={setInspectionData}
						sidebar
						user
					/>
				)}

				{showInspectionCompleted && (
					<IconPopupWrapper
						icon={images.congratulations}
						title={`Inspection Completed`}
						text={`You have successfully completed this inspection`}
						smallIcon
					>
						<div className={`space-y-3 pt-3 w-[75px]`}>
							<Button
								onClick={() => setShowInspectionCompleted(false)}
								text="ok"
							/>
						</div>
					</IconPopupWrapper>
				)}

				{showInspectionError && (
					<IconPopupWrapper
						icon={images.query}
						title={`Inspection Failed`}
						text={`Unable to complete this inspection, Try again`}
						smallIcon
					>
						<div className={`space-y-3 pt-3 w-[75px]`}>
							<Button onClick={() => setShowInspectionError(false)} text="ok" />
						</div>
					</IconPopupWrapper>
				)}
			</div>{' '}
		</>
	) : (
		<LoadingFailed />
	);
}

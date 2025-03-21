'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiGlassesLine } from 'react-icons/ri';

import { images, icons, variants } from '../../constants';
import {
	InspectionCard,
	InspectionDetails,
	AddedChecklists,
	SelectChecklist,
	AddInvitee,
	InviteeData,
	InspectionsArchive,
	Loading,
	LoadingFailed,
	Empty,
	Button,
	FormError,
	FormSuccess,
} from '../../components';
import {
	SidePopupWrapper,
	TitlePopupWrapper,
	IconPopupWrapper,
} from '../../wrappers';
// import { inspectionData } from '../../textData/inspectionData';

import { SideNavIcons } from '../../components/svgs';

// API RELATED
import { getListOfChecklist } from '@/actions/getChecklist';
import { removeInvitee } from '@/actions/getInvitee';

export default function InspectionsList({ close, title, businessId, userId }) {
	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [inspectionData, setInspectionData] = useState();
	const [archiveList, setArchiveList] = useState();

	const [activeInspection, setActiveInspection] = useState(0);
	const [toggleInspectionDetails, setToggleInspectionDetails] = useState(false);
	const [showAddedChecklist, setShowAddedChecklist] = useState(false);
	const [showArchive, setShowArchive] = useState(false);
	const [invitees, setInvitees] = useState();
	const [showAddInvitee, setShowAddInvitee] = useState(false);
	const [showInviteeData, setShowInviteeData] = useState(false);
	const [inviteeData, setInviteeData] = useState();

	const [isDeleting, setIsDeleting] = useState(false);
	const [pendingDelete, setPendingDelete] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// SUBCHECKLIST VARIABLES
	const [activeSubchecklist_id, setActiveSubchecklist_id] = useState();

	const showInspectionDetails = async (i) => {
		await setActiveInspection(i);
		await setToggleInspectionDetails(true);
	};

	const callGetInspectionList = () => {
		setIsLoading(true);
		setSuccessfullyLoaded(false);
		getListOfChecklist(businessId).then((data) => {
			console.log(data);
			setInspectionData(data?.checklist?.data?.checklist_data);
			setArchiveList(data?.archive?.data);
			setInvitees(data?.checklist?.data?.invited_user_list);
			if (data?.response === 1) {
				setSuccessfullyLoaded(true);
			}
			setIsLoading(false);
		});
	};

	// DISPLAY INVITEE INFO
	const showInviteeInfo = (i) => {
		setInviteeData({
			id: i,
			data: invitees[i],
		});
		setShowInviteeData(true);
	};

	// LOAD CHECKLIST DATA
	useEffect(() => {
		callGetInspectionList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Delete Assignee
	const requestDeleteAssignee = (id) => {
		setError('');
		setSuccess('');
		setPendingDelete(true);

		removeInvitee(invitees[id].user_id).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setPendingDelete(false);

			if (data?.response === 1) {
				let newData = invitees?.filter((list) => {
					return list !== invitees[id];
				});
				setInvitees(newData);
				setTimeout(() => {
					setShowInviteeData(false);
					setIsDeleting(false);
				}, 1000);
			}
		});
	};

	return (
		<>
			<SidePopupWrapper
				title={title}
				close={close}
				otherIcon={icons.edit}
				otherFunc={() => setShowAddedChecklist(true)}
			>
				{isLoading ? (
					<Loading inner />
				) : successfullyLoaded ? (
					<>
						<div className="w-full px-4 py-5 md:p-5 grid grid-cols-1 gap-3">
							<h2>Invite</h2>
							<div className="flex gap-3 w-full overflow-auto flex-nowrap no-scrollbar pb-2">
								{invitees &&
									invitees?.map(({ username }, i) => (
										<button
											type="button"
											onClick={() => showInviteeInfo(i)}
											key={i}
											className={`w-[50px] min-w-[50px] max-w-[50px] h-[50px] flex-center rounded-full bg-[--brand]`}
										>
											<div className="text-[--white] uppercase !tracking-widest text-center scale-125">
												{username && username.split(' ').length > 1
													? `${username.split(' ')[0][0]}${
															username.split(' ')[1][0]
													  }`
													: `${username.substr(0, 2)}`}
												{/* {username.slice(0, 2)} */}
											</div>
										</button>
									))}
								<button
									type="button"
									onClick={() => setShowAddInvitee(true)}
									className={`w-[50px] min-w-[50px] max-w-[50px] h-[50px] p-[10px] rounded-full border-2 border-dashed bg-[--highlight-bg-2]`}
								>
									<Image
										src={icons.user2}
										alt={'invite new user'}
										className={`w-full h-full object-cover`}
									/>
								</button>
							</div>
							<button
								type="button"
								onClick={() => setShowArchive(true)}
								className="flex-v-center py-3 px-[10px] md:px-2 !gap-2 bg-[--highlight-bg] border border-[--brand] rounded-lg"
							>
								<Image
									src={icons.archive}
									alt={'invite new user'}
									className={`w-[18px] min-w-[18px] max-w-[18px] h-auto object-cover md:w-[20px] md:min-w-[20px] md:max-w-[20px]`}
								/>
								<p className="black-text">Archive</p>
							</button>
							{inspectionData && inspectionData.length > 0 ? (
								inspectionData.map((inspection, i) => (
									<InspectionCard
										key={i}
										inspectionContent={inspection}
										title={inspection.name}
										percentage={inspection.percentage}
										completed={inspection.ans_yes_count}
										total={inspection.ans_yes_no_count}
										toggled={activeInspection === i}
										onClick={() => showInspectionDetails(i)}
										sidebar
										userId={userId}
										business_checklist_id={inspection.business_checklist_id}
										archiveList={archiveList}
										setArchiveList={setArchiveList}
										inspectionData={inspectionData}
										setInspectionData={setInspectionData}
									/>
								))
							) : (
								<div className="w-full h-full min-h-[50vh]">
									<Empty text="No Checklist Added" />
								</div>
							)}
						</div>
					</>
				) : (
					<LoadingFailed />
				)}
			</SidePopupWrapper>

			{toggleInspectionDetails && (
				<SidePopupWrapper
					close={() => setToggleInspectionDetails(false)}
					title={inspectionData[activeInspection].name}
					noBg
				>
					<InspectionDetails
						userId={userId}
						checklistId={inspectionData[activeInspection].business_checklist_id}
						businessId={businessId}
					/>
				</SidePopupWrapper>
			)}

			{showAddedChecklist && (
				<AddedChecklists
					back={() => setShowAddedChecklist(false)}
					close={() => {
						callGetInspectionList();
						setShowAddedChecklist(false);
					}}
					userId={userId}
					businessId={businessId}
					inspection
				/>
			)}
			{showAddInvitee && (
				<TitlePopupWrapper
					title="Invite"
					close={() => setShowAddInvitee(false)}
				>
					<AddInvitee
						close={() => setShowAddInvitee(false)}
						invitees={invitees}
						setInvitees={setInvitees}
						businessId={businessId}
					/>
				</TitlePopupWrapper>
			)}
			{showInviteeData && (
				<TitlePopupWrapper
					title="Invite"
					close={() => setShowInviteeData(false)}
					icon={icons.deleteRed}
					iconFunc={() => setIsDeleting(true)}
				>
					<InviteeData
						close={() => setShowInviteeData(false)}
						invitees={invitees}
						setInvitees={setInvitees}
						businessId={businessId}
						id={inviteeData.id}
						inviteeData={inviteeData.data}
					/>
				</TitlePopupWrapper>
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
				/>
			)}

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
							: `Are you sure you want to delete this Assignee`
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
								onClick={() => requestDeleteAssignee(inviteeData.id)}
								text="Yes"
								sm
								submitting={pendingDelete}
							/>
						</div>
					</div>
				</IconPopupWrapper>
			)}
		</>
	);
}

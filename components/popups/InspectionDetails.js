'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import {
	Loading,
	LoadingFailed,
	Empty,
	MiniAddAction,
	MiniAddMediaSubchecklist,
	MiniAddNote,
	FormError,
} from '@/components';

import { images, icons, variants } from '../../constants';
import { TitlePopupWrapper } from '../../wrappers';

const options = ['Yes', 'No', 'N/A'];
const optionsAnswers = ['yes', 'no', 'na'];
const colors = ['#a2b639', '#b62e32', '#2a85b1'];

import { getSingleChecklistData } from '@/actions/getChecklist';
import {
	answerSubChecklistQuestion,
	addSubChecklistNote,
	deleteSubChecklistMedia,
} from '@/config/answerSubChecklist';

const InspectionDetails = ({ userId, checklistId, businessId }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [inspectionData, setInspectionData] = useState();
	const [assigneeData, setAssigneeData] = useState([]);
	const [pendingSubChecklist, setPendingSubChecklist] = useState(-1);

	const [activeSubchecklist_id, setActiveSubchecklist_id] = useState();

	const [error, setError] = useState();

	// SHOW POPUPS
	const [showAddNote, setShowAddNote] = useState(false);
	const [showAddMedia, setShowAddMedia] = useState(false);
	const [showAddAction, setShowAddAction] = useState(false);

	const getChecklistData = () => {
		setIsLoading(true);
		setSuccessfullyLoaded(false);
		getSingleChecklistData(checklistId, businessId).then((data) => {
			// console.log(data?.checklist?.data?.sub_check_list_dtl);
			// console.log(data?.checklist?.data);
			// console.log(data?.assignees?.data);
			let allAssignees = data?.assignees?.data?.filter((val) => val.username);

			setInspectionData(data?.checklist?.data?.sub_check_list_dtl);
			setAssigneeData(allAssignees);

			if (data?.response === 1) {
				setSuccessfullyLoaded(true);
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		getChecklistData();
	}, []);

	// ! ANSWER QUESTION
	const answerChecklist = (bsc_id, answer, i) => {
		setError('');
		setPendingSubChecklist(i);
		answerSubChecklistQuestion(userId, bsc_id, answer).then((data) => {
			if (data.response) {
				let newInspectionData = [...inspectionData];
				newInspectionData[i].answer = answer;
				setInspectionData(newInspectionData);
			} else {
				setError([i, data.error]);
			}
			setPendingSubChecklist(-1);
		});
	};

	const deleteImage = (user_id, scmm_id, i) => {
		setError('');
		setPendingSubChecklist(i);
		deleteSubChecklistMedia(userId, scmm_id).then((data) => {
			if (data.response) {
				let newInspectionData = [...inspectionData];
				newInspectionData[i].media_list = data?.data?.data;
				setInspectionData(newInspectionData);
			} else {
				setError([i, data.error]);
			}
			setPendingSubChecklist(-1);
		});
	};

	const openAddNote = (bsc_id, i) => {
		setActiveSubchecklist_id(bsc_id);
		setPendingSubChecklist(i);

		setShowAddNote(true);
	};
	const addNote = (note) => {
		setError('');
		let i = pendingSubChecklist;
		addSubChecklistNote(userId, activeSubchecklist_id, note).then((data) => {
			if (data.response) {
				let newInspectionData = [...inspectionData];
				newInspectionData[i].notes_dtl = note;
				setInspectionData(newInspectionData);
				setShowAddNote(false);
			} else {
				setError([i, data.error]);
				setShowAddNote(false);
			}
			setPendingSubChecklist(-1);
		});
	};

	const openAddMedia = (bsc_id, i) => {
		setActiveSubchecklist_id(bsc_id);
		setPendingSubChecklist(i);
		setShowAddMedia(true);
	};
	const openAddAction = (bsc_id, i) => {
		setActiveSubchecklist_id(bsc_id);
		setPendingSubChecklist(i);
		setShowAddAction(true);
	};

	return isLoading ? (
		<Loading inner />
	) : successfullyLoaded ? (
		<>
			<div className="h-auto w-full py-5 px-4 lg:p-5 space-y-5  relative">
				{inspectionData && inspectionData.length > 0 ? (
					inspectionData.map((item, i) => (
						<div
							key={i}
							className={`slide-animated-children p-4 lg:p-5 bg-[--card] space-y-5 rounded-xl ${
								pendingSubChecklist === i && 'pending'
							}`}
						>
							{error && error[0] === i && <FormError text={error[1]} />}
							<h3>{item.question}</h3>
							<div>
								<div className="btn-group">
									{options.map((option, j) => (
										<motion.button
											whileTap="tap"
											whileHover="hover"
											variants={variants.buttonClick}
											type="button"
											key={j}
											style={{
												backgroundColor:
													item.answer === optionsAnswers[j]
														? colors[j]
														: '#e1e1e1',
											}}
											className={
												item.answer === optionsAnswers[j]
													? 'btn-3 !text-[--white]'
													: 'btn-3'
											}
											onClick={() => {
												if (item.answer !== optionsAnswers[j]) {
													answerChecklist(item.bsc_id, optionsAnswers[j], i);
												}
											}}
										>
											{option}
										</motion.button>
									))}
								</div>
								<div className="grid grid-cols-3 gap-2 pt-4">
									{item.media_list.map((img, k) => (
										<div
											key={k}
											className="relative rounded-md overflow-hidden bg-[--white]"
										>
											<Image
												src={img.media}
												alt={item.question + ' ' + k}
												width={100}
												height={100}
												className="w-full h-[90px] object-cover rounded-md"
											/>
											<motion.button
												whileTap="tap"
												whileHover="hover"
												variants={variants.buttonClick}
												type="button"
												className="p-1 bg-[--transparent-bg] rounded-full absolute top-2 right-2"
												onClick={() => deleteImage(userId, img.scmm_id, k)}
											>
												<Image
													src={icons.bin}
													alt="delete"
													className="w-[15px] h-[15px]"
												/>
											</motion.button>
										</div>
									))}
								</div>
							</div>
							<div className="flex gap-2 justify-between items-center">
								<motion.button
									whileTap="tap"
									whileHover="hover"
									variants={variants.buttonClick}
									type="button"
									className="flex items-center !gap-1 !text-[3.75vw] md:!text-sm"
									onClick={() => openAddNote(item.bsc_id, i)}
								>
									<Image
										src={icons.addNote}
										alt="delete"
										className="w-[15.5px] h-[15.5px]"
									/>{' '}
									{item.notes_dtl ? 'View' : 'Add'} Note
								</motion.button>
								<motion.button
									whileTap="tap"
									whileHover="hover"
									variants={variants.buttonClick}
									type="button"
									className="flex items-center !gap-1 !text-[3.75vw] md:!text-sm"
									onClick={() => openAddMedia(item.bsc_id, i)}
								>
									<Image
										src={icons.gallery}
										alt="delete"
										className="w-[15.5px] h-[15.5px]"
									/>{' '}
									Media
								</motion.button>
								<motion.button
									whileTap="tap"
									whileHover="hover"
									variants={variants.buttonClick}
									type="button"
									className="flex items-center !gap-1 !text-[3.75vw] md:!text-sm"
									onClick={() => openAddAction(item.bsc_id, i)}
								>
									<Image
										src={icons.addAction}
										alt="delete"
										className="w-[15.5px] h-[15.5px]"
									/>{' '}
									Action
								</motion.button>
							</div>
						</div>
					))
				) : (
					<Empty text="You have no Subchecklist added." />
				)}
			</div>

			{showAddNote && (
				<TitlePopupWrapper
					title="Add Note"
					close={() => {
						setPendingSubChecklist(-1);
						setShowAddNote(false);
					}}
				>
					<MiniAddNote
						addNote={addNote}
						close={() => {
							setPendingSubChecklist(-1);
							setShowAddNote(false);
						}}
						prevNote={
							pendingSubChecklist >= 0 &&
							inspectionData[pendingSubChecklist].notes_dtl
						}
					/>
				</TitlePopupWrapper>
			)}
			{showAddMedia && (
				<TitlePopupWrapper
					title="Upload Photo"
					close={() => {
						setPendingSubChecklist(-1);
						setShowAddMedia(false);
					}}
				>
					<MiniAddMediaSubchecklist
						close={() => {
							setPendingSubChecklist(-1);
							setShowAddMedia(false);
						}}
						userId={userId}
						bsc_id={activeSubchecklist_id}
						setError={setError}
						index={pendingSubChecklist}
						inspectionData={inspectionData}
						setInspectionData={setInspectionData}
					/>
				</TitlePopupWrapper>
			)}
			{showAddAction && (
				<TitlePopupWrapper
					title="Action"
					close={() => {
						setPendingSubChecklist(-1);
						setShowAddAction(false);
					}}
				>
					<MiniAddAction
						close={() => {
							setPendingSubChecklist(-1);
							setShowAddAction(false);
						}}
						userId={userId}
						assigneeData={assigneeData}
						bsc_id={activeSubchecklist_id}
					/>
				</TitlePopupWrapper>
			)}
		</>
	) : (
		<LoadingFailed />
	);
};

export default InspectionDetails;

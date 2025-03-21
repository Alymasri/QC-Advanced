'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { images, icons } from '../../constants';
import { SidePopupWrapper } from '../../wrappers';
import { AnimatePresence } from 'framer-motion';
import {
	SelectInput,
	DateTimePicker,
	InputField,
	SubChecklist,
	FormError,
	Loading,
	LoadingFailed,
} from '../../components';

// API RELATED
import { getSingleChecklistData } from '@/actions/getChecklist';

const MyChecklist = ({
	close,
	list,
	setChecklist,
	checklistId,
	businessId,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [checklistData, setChecklistData] = useState();
	const [assigneeList, setAssigneeList] = useState();

	const [options, setOptions] = useState(); // For Assignee SelectOption
	const [values, setValues] = useState(); // For Assignee SelectOption

	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setChecklistData({ ...checklistData, [name]: value });
	};

	useEffect(() => {
		getSingleChecklistData(checklistId, businessId)
			.then((data) => {
				let allAssignees = data?.assignees?.data?.filter((val) => val.username);

				let assigneeNames = [];
				let assigneeIds = [];
				allAssignees.map((val, i) => {
					assigneeNames.push(val.username);
					assigneeIds.push(val.user_id);
				});

				// console.log(data?.assignees?.data);

				return {
					success: data?.response === 1,
					assigneeData: data?.assignees?.data?.filter((val) => val.username),
					allChecklists: data?.checklist?.data,
					assigneeNames: assigneeNames,
					assigneeIds: assigneeIds,
				};
			})
			.then((data) => {
				setChecklistData(data.allChecklists);
				setAssigneeList(data.assigneeData);
				setOptions(data.assigneeNames);
				setValues(data.assigneeIds);

				setIsLoading(false);
				if (data.success) {
					setSuccessfullyLoaded(true);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// FORM FUNCTIONS
	const updateChecklist = () => {
		// if (checklistData.name.length <= 0) {
		// 	setErrorMessage('Enter Checklist Name');
		// 	setShowErrorMessage(true);
		// 	setTimeout(() => {
		// 		setShowErrorMessage(false);
		// 	}, 2000);
		// } else if (errorMessage.length > 0) {
		// 	setShowErrorMessage(true);
		// 	setTimeout(() => {
		// 		setShowErrorMessage(false);
		// 	}, 2000);
		// } else {
		// 	let newData = [...list];
		// 	newData[checklistId] = { ...checklistData, selected: true };
		// 	setChecklist(newData);
		// 	close();
		// }
		// console.log(checklistData);
	};

	return (
		<SidePopupWrapper title={checklistData?.name} close={close} noBg>
			{isLoading ? (
				<Loading inner />
			) : successfullyLoaded ? (
				<>
					<div className={'h-full w-full py-5 px-4 lg:p-7 space-y-8'}>
						<div className="w-full space-y-4">
							{/* Checklist */}
							<InputField
								icon={icons.category}
								label="Checklist"
								type="text"
								placeholder="Name your checklist"
								formData={checklistData}
								setFormData={setChecklistData}
								defaultValue={checklistData?.name}
								nameValue="name"
							/>
							{/* Assignee */}
							<SelectInput
								label="Assignee"
								placeholder="Choose Assignee"
								options={options}
								values={values}
								valueName="assignee_id"
								setFormData={setChecklistData}
								formData={checklistData}
								darkBg
								edit
								defaultValue={checklistData?.assignee_id}
							/>
							<SubChecklist
								setErrorMessage={setErrorMessage}
								formData={checklistData}
								setFormData={setChecklistData}
								nameValue="sub_check_list_dtl"
								edit
							/>
						</div>

						<div className="w-full">
							<button onClick={() => updateChecklist()} className="btn-1 block">
								done
							</button>
						</div>
						<div className="popup-pb" />
						<AnimatePresence>
							{showErrorMessage && (
								<div className="fixed right-0 bottom-[20px] lg:top-[70px] w-full md:w-[--sidebar] px-4 lg:px-7 pointer-events-none">
									{/* <div className="bg-[--white] w-full"> */}
									<FormError message={errorMessage} />
									{/* </div> */}
								</div>
							)}
						</AnimatePresence>
					</div>
				</>
			) : (
				<LoadingFailed />
			)}
		</SidePopupWrapper>
	);
};

export default MyChecklist;

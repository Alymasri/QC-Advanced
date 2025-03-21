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
	FormSuccess,
	Button,
	Loading,
	LoadingFailed,
} from '../../components';

import { getAssigneeData } from '@/actions/getChecklist';
import { addChecklist } from '@/config/addBusinessAndChecklist';

const AddChecklist = ({ close, userId, businessId }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [assigneeList, setAssigneeList] = useState();

	const [options, setOptions] = useState(); // For Assignee SelectOption
	const [values, setValues] = useState(); // For Assignee SelectOption

	const [isPending, setIsPending] = useState();
	const [error, setError] = useState(''); // Update Error
	const [success, setSuccess] = useState(''); // Update Success

	const [checklistData, setChecklistData] = useState({
		name: '',
		assignee_id: '',
		sub_checklist: [],
	});

	const { name, assignee_id, sub_checklist } = checklistData;

	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// LOAD ASSIGNEES
	useEffect(() => {
		getAssigneeData(businessId)
			.then((data) => {
				let allAssignees = data?.assignees?.data?.filter((val) => val.username);

				let assigneeNames = [];
				let assigneeIds = [];
				allAssignees.map((val, i) => {
					assigneeNames.push(val.username);
					assigneeIds.push(val.user_id);
				});

				return {
					success: data?.response === 1,
					assigneeData: data?.assignees?.data?.filter((val) => val.username),
					assigneeNames: assigneeNames,
					assigneeIds: assigneeIds,
				};
			})
			.then((data) => {
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
	const addChecklistFunc = () => {
		if (!checklistData.name) {
			setErrorMessage('Enter Checklist Name');
			setShowErrorMessage(true);
			setTimeout(() => {
				setShowErrorMessage(false);
			}, 2000);
		} else if (errorMessage.length > 0) {
			setShowErrorMessage(true);
			setTimeout(() => {
				setShowErrorMessage(false);
			}, 2000);
		} else {
			setIsPending(true);

			addChecklist(checklistData, userId, businessId).then((data) => {
				setError(data.error);
				setSuccess(data.success);
				setIsPending(false);
				if (data.response) {
					setTimeout(() => {
						close();
					}, 1000);
				}
			});
		}
	};

	return (
		<SidePopupWrapper title="Add Checklist" close={close} noBg>
			{isLoading ? (
				<Loading inner />
			) : successfullyLoaded ? (
				<>
					<div
						className={`h-full w-full py-5 px-4 lg:p-7 space-y-8 relative ${
							isPending && 'pending'
						}`}
					>
						<div className="w-full space-y-4">
							{/* Checklist */}
							<InputField
								icon={icons.category}
								label="Checklist"
								type="text"
								placeholder="Name your checklist"
								formData={checklistData}
								setFormData={setChecklistData}
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
							/>
							<SubChecklist
								setErrorMessage={setErrorMessage}
								formData={checklistData}
								setFormData={setChecklistData}
								nameValue="sub_check_list_dtl"
							/>
						</div>
						<div>
							{error && <FormError message={error} />}
							{success && <FormSuccess message={success} />}
						</div>
						<div className="w-full">
							<Button
								onClick={() => addChecklistFunc()}
								text="add"
								submitting={isPending}
							/>
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

export default AddChecklist;

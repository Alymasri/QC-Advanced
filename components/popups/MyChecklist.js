'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { images, icons } from '../../constants';
import { SidePopupWrapper, IconPopupWrapper } from '../../wrappers';
import { AnimatePresence } from 'framer-motion';
import {
	SelectInput,
	DateTimePicker,
	InputField,
	SubChecklist,
	FormError,
	FormSuccess,
	Loading,
	LoadingFailed,
	Button,
} from '../../components';

// API RELATED
import {
	getSingleChecklistData,
	deleteChecklist,
} from '@/actions/getChecklist';
import { updateChecklist } from '@/config/addBusinessAndChecklist';

const MyChecklist = ({ close, list, checklistId, businessId, userId }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [checklistData, setChecklistData] = useState();
	const [assigneeList, setAssigneeList] = useState();
	const [deleteSubchecklistIds, setDeleteSubchecklistIds] = useState([]);

	const [options, setOptions] = useState(); // For Assignee SelectOption
	const [values, setValues] = useState(); // For Assignee SelectOption

	const [isPending, setIsPending] = useState();
	const [error, setError] = useState(''); // Update Error
	const [success, setSuccess] = useState(''); // Update Success

	const [isDeleting, setIsDeleting] = useState(false);
	const [pendingDelete, setPendingDelete] = useState(false);
	const [deleteError, setDeleteError] = useState(''); // Delete Error
	const [deleteSuccess, setDeleteSuccess] = useState(''); // Delete Success

	const [showErrorMessage, setShowErrorMessage] = useState(false); // Text field error
	const [errorMessage, setErrorMessage] = useState(''); // Text field error

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
				allAssignees?.map((val, i) => {
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

				// console.log(data.allChecklists);

				setIsLoading(false);
				if (data.success) {
					setSuccessfullyLoaded(true);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// FORM FUNCTIONS
	const updateChecklistFunc = () => {
		if (checklistData.name.length <= 0) {
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
			setError('');
			setSuccess('');
			setIsPending(true);

			let prev = { ...checklistData };
			checklistData.sub_check_list_dtl.map((val, i) => {
				prev.sub_check_list_dtl[i] = {
					bsc_id: val.bsc_id,
					question: val.question,
					media_upload_type: val.media_upload_type,
				};
			});
			setChecklistData(prev);

			// console.log(checklistData);
			updateChecklist(
				checklistData,
				userId,
				checklistId,
				deleteSubchecklistIds
			).then((data) => {
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
		// console.log(checklistData);
	};

	const deleteChecklistFunc = () => {
		setDeleteError('');
		setDeleteSuccess('');
		setPendingDelete(true);

		deleteChecklist(checklistId).then((data) => {
			setDeleteError(data.error);
			setDeleteSuccess(data.success);
			setPendingDelete(false);

			if (data?.response === 1) {
				setTimeout(() => {
					close();
				}, 1000);
			}
		});
	};

	return (
		<SidePopupWrapper
			title={checklistData?.name}
			close={close}
			noBg
			otherIcon={icons.deleteRed}
			otherFunc={() => setIsDeleting(true)}
		>
			{isLoading ? (
				<Loading inner />
			) : successfullyLoaded ? (
				<>
					<div
						className={`h-full w-full py-5 px-4 lg:p-7 space-y-8 ${
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
								deleteSubchecklistIds={deleteSubchecklistIds}
								setDeleteSubchecklistIds={setDeleteSubchecklistIds}
							/>
						</div>

						<div>
							{error && <FormError message={error} />}
							{success && <FormSuccess message={success} />}
						</div>

						<div className="w-full">
							<Button
								onClick={() => updateChecklistFunc()}
								text="update"
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
									: `Are you sure you want to delete ${checklistData?.name}`
							}
							smallIcon
							className={pendingDelete && 'pointer-events-none'}
						>
							<div
								className={`space-y-3 pt-3 w-full ${
									pendingDelete && 'pending'
								}`}
							>
								{deleteError && <FormError message={deleteError} />}
								{deleteSuccess && <FormSuccess message={deleteSuccess} />}

								<div className="grid grid-cols-2 gap-3 w-[80%] mx-auto">
									<Button onClick={() => setIsDeleting(false)} text="no" noBg />
									<Button
										onClick={() => deleteChecklistFunc()}
										text="Yes"
										sm
										submitting={pendingDelete}
									/>
								</div>
							</div>
						</IconPopupWrapper>
					)}
				</>
			) : (
				<LoadingFailed />
			)}
		</SidePopupWrapper>
	);
};

export default MyChecklist;

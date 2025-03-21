'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { images, icons } from '../../constants';
import {
	DateTimePicker,
	InputField,
	InputFieldRHF,
	SelectInputRHF,
	SelectInputLabelValueRHF,
	SelectAssignee,
	SubmitButton,
	FormError,
	FormSuccess,
	Button,
} from '../../components';
import { SelectOptionsWrapper } from '@/wrappers';

// SERVER COMPONENT
import { addSubChecklistAction } from '@/config/answerSubChecklist';
import { MiniActionSchema } from '@/schemas';

const AddSubchecklistAction = ({ close, userId, assigneeData, bsc_id }) => {
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [assigneeList, setAssigneeList] = useState();
	const [showInvitees, setShowInvitees] = useState(false);

	useEffect(() => {
		setAssigneeList(assigneeData);
	}, []);

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(MiniActionSchema),
	});

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		addSubChecklistAction(userId, bsc_id, values).then((data) => {
			setIsPending(false);
			setError(data.error);
			setSuccess(data.success);

			if (data.response) {
				setTimeout(() => {
					close();
				}, 1000);
			}
		});
	};

	return (
		<div className={'h-full w-full lg:p-2 space-y-8'}>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`w-full space-y-4 ${isPending && 'pending'}`}
			>
				{/* Title */}
				<InputFieldRHF
					label="Title"
					type="text"
					placeholder="Enter Title"
					rhf={{ ...register('title') }}
					error={errors.title?.message}
				/>
				{/* Description */}
				<InputFieldRHF
					label="Descriptiom"
					type="text"
					placeholder="Enter Description"
					rhf={{ ...register('desc') }}
					error={errors.desc?.message}
				/>
				{/* Priority */}
				<SelectInputLabelValueRHF
					label="Priority"
					options={['High', 'Medium', 'Low', 'None']}
					valueList={['High', 'Medium', 'Low', 'None']}
					colors={['#b62e32', '#2d2d2b', '#177EC1', '#777E90']}
					setValue={setValue}
					name="priority"
					rhf={{ ...register('priority') }}
					error={errors.priority?.message}
				/>
				{/* DueDate */}
				<DateTimePicker
					label="Due Date"
					setValue={setValue}
					name="due_date"
					rhf={{ ...register('due_date') }}
					error={errors.due_date?.message}
				/>

				{/* Assignees */}
				<SelectOptionsWrapper
					list={assigneeList}
					label="Assignees"
					setValue={setValue}
					name="assignee_id"
					error={errors.assignee_id?.message}
				>
					<SelectAssignee
						label="Assignees"
						options={assigneeList}
						setValue={setValue}
						name="assignee_id"
						rhf={{ ...register('assignee_id') }}
						error={errors.assignee_id?.message}
					/>
				</SelectOptionsWrapper>

				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}

				<div className="w-full grid grid-cols-2 gap-4 lg:gap-5">
					<Button text="close" noBg onClick={close} />
					<SubmitButton text={'create'} submitting={isPending} />
				</div>
			</form>

			<div className={''} />
		</div>
	);
};

export default AddSubchecklistAction;

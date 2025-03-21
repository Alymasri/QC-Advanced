'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { images, icons } from '../../constants';
import { IconPopupWrapper } from '../../wrappers';
import {
	InputFieldRHF,
	FormError,
	FormSuccess,
	SubmitButton,
	Button,
} from '../../components';

// SERVER COMPONENTE
import { addInvitee } from '@/actions/getInvitee';
import { InviteSchema } from '@/schemas';

const AddInvitee = ({ close, invitees, setInvitees, businessId }) => {
	const [inviteSent, setInviteSent] = useState(false);
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(InviteSchema),
	});

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		addInvitee(values, businessId).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setIsPending(false);
			if (data?.response === 1) {
				setInvitees([...invitees, data?.data?.data]);
				setInviteSent(true);
			}
		});
	};

	return (
		<form
			onSubmit={handleSubmit((d) => onSubmit(d))}
			className={`flex flex-col gap-3 ${isPending && 'pending'}`}
		>
			{/* Name */}
			<InputFieldRHF
				label="Name"
				icon={icons.user1}
				type="mail"
				placeholder="Enter Invitee Username"
				rhf={{ ...register('username') }}
				error={errors.username?.message}
			/>
			{/* Email */}
			<InputFieldRHF
				label="Email"
				icon={icons.envelope}
				type="mail"
				placeholder="Enter Invitee Email"
				rhf={{ ...register('email') }}
				error={errors.email?.message}
			/>
			{/* Password */}
			<InputFieldRHF
				label="Password"
				icon={icons.lock}
				type="password"
				placeholder="Enter Password"
				rhf={{ ...register('password') }}
				error={errors.password?.message}
			/>
			{/* Confirm Password */}
			<InputFieldRHF
				label="Confirm Password"
				icon={icons.lock}
				type="password"
				placeholder="Confirm Password"
				rhf={{ ...register('confirm_password') }}
				error={errors.confirm_password?.message}
			/>
			<div className="pt-5">
				{error && <FormError message={error} center />}
				{success && <FormSuccess message={success} center />}

				<SubmitButton text="save" submitting={isPending} />
			</div>
			{inviteSent && (
				<IconPopupWrapper
					icon={images.checkmark}
					title="Invite Sent"
					text="Your Assignee would receive an invite email shortly"
					smallIcon
					className="!bg-transparent"
				>
					<div className="mt-5 min-w-[80px]">
						<Button onClick={close} text="ok" />
					</div>
				</IconPopupWrapper>
			)}
		</form>
	);
};

export default AddInvitee;

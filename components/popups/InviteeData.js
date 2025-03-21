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

// SERVER COMPONENT
import { InviteSchema } from '@/schemas';

const ValueField = ({ icon, label, value }) => (
	<div className={`slide-animated-children space-y-[5px]`}>
		<div className={`input-block `}>
			<div className="flex">
				<label>{label}</label>
			</div>

			<div className={'icon-input'}>
				{icon && (
					<Image src={icon} w={20} h={20} alt={label} className="input-img" />
				)}
				<p className="input !text-[--black]">{value}</p>
			</div>
		</div>
		{!value && <p className="text-[--text] text-xs">No {label} added*</p>}
	</div>
);

const InviteeData = ({
	close,
	invitees,
	setInvitees,
	businessId,
	id,
	inviteeData,
}) => {
	const [showDeletePrompt, setShowDeletePrompt] = useState(false);
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const requestRemoveUser = () => {
		// setError('');
		// setSuccess('');
		// setIsPending(true);
		// removeInvitee(values, businessId).then((data) => {
		// 	setError(data.error);
		// 	setSuccess(data.success);
		// 	setIsPending(false);
		// 	if (data?.response === 1) {
		// 		setInvitees([...invitees, data?.data?.data]);
		// 		setInviteSent(true);
		// 	}
		// });
	};

	return (
		<div className={`flex flex-col gap-3 ${isPending && 'pending'}`}>
			{/* Name */}
			<ValueField
				label="Name"
				icon={icons.user1}
				value={inviteeData.username}
			/>
			{/* Email */}
			<ValueField
				label="Email"
				icon={icons.envelope}
				value={inviteeData.email}
			/>
			{/* Password */}
			<ValueField
				label="Password"
				icon={icons.lock}
				value={inviteeData.original_password}
			/>
			<div className="pt-5">
				{error && <FormError message={error} center />}
				{success && <FormSuccess message={success} center />}

				<Button text="done" onClick={close} />
				{/* <SubmitButton text="save" submitting={isPending} /> */}
			</div>

			{/* Delete USer Popup */}
			{showDeletePrompt && (
				<IconPopupWrapper
					icon={images.query}
					title="Remove User"
					text="Are you sure you want to remove this user?"
					smallIcon
					className="!bg-transparent"
				>
					<div className="grid grid-cols-2 gap-3 w-[80%] mx-auto">
						<Button onClick={() => setShowDeletePrompt(false)} text="no" noBg />
						<Button
							onClick={() => requestRemoveUser()}
							text="Yes"
							sm
							submitting={pendingDelete}
						/>
					</div>
				</IconPopupWrapper>
			)}
		</div>
	);
};

export default InviteeData;

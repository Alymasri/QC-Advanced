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
import { changePassword } from '@/actions/changePassword';
import { ChangePasswordSchema } from '@/schemas';

const ChangePassword = () => {
	const [passwordSavedPopup, setPasswordSavedPopup] = useState(false);
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ChangePasswordSchema),
	});

	const onSubmit = (values) => {
		setIsPending(true);

		changePassword(values).then((data) => {
			// console.log(data);
			setError(data.error);
			setSuccess(data.success);
			setIsPending(false);
			if (data?.response === 1) {
				setPasswordSavedPopup(true);
				// clear_cookie();
			}
		});
	};

	const closePopup = () => {
		setValue('old_pass', '');
		setValue('new_pass', '');
		setValue('confirm_pass', '');
		setPasswordSavedPopup(false);
	};

	return (
		<form
			onSubmit={handleSubmit((d) => onSubmit(d))}
			className={`flex flex-col gap-3 ${isPending && 'pending'}`}
		>
			{/* Current Password */}
			<InputFieldRHF
				label="Old Password"
				icon={icons.lock}
				type="password"
				placeholder="Enter Old Password"
				rhf={{ ...register('old_pass') }}
				error={errors.old_pass?.message}
			/>
			{/* New Password */}
			<InputFieldRHF
				label="New Password"
				icon={icons.lock}
				type="password"
				placeholder="Enter New Password"
				rhf={{ ...register('new_pass') }}
				error={errors.new_pass?.message}
			/>
			{/* Confirm Password */}
			<InputFieldRHF
				label="Confirm Password"
				icon={icons.lock}
				type="password"
				placeholder="Confirm New Password"
				rhf={{ ...register('confirm_pass') }}
				error={errors.confirm_pass?.message}
			/>
			<div className="pt-5 space-y-2">
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}

				<div className="pt-3">
					<SubmitButton text="save" submitting={isPending} />
				</div>
			</div>
			{passwordSavedPopup && (
				<IconPopupWrapper
					icon={images.lockApproved}
					title="Password Changed"
					text="Your password has been changed successfully"
					smallIcon
				>
					<div className="mt-5 w-[80%]">
						<Button text="ok" onClick={() => closePopup()} />
					</div>
				</IconPopupWrapper>
			)}
		</form>
	);
};

export default ChangePassword;

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IconBoxWrapper, IconPopupWrapper } from '../../../../wrappers';
import { images, icons } from '../../../../constants';
import {
	InputFieldRHF,
	FormError,
	FormSuccess,
	SubmitButton,
	LinkButton,
} from '../../../../components';

// SERVER COMPONENT
import { useForgotPasswordEmailStore } from '@/config/store';
import { resetPassword } from '@/actions/forgotPassword';
import { ResetPasswordSchema } from '@/schemas';

export default function ResetPassword() {
	const router = useRouter();
	const [isDone, setIsDone] = useState(false);
	const cookie_data = useForgotPasswordEmailStore((state) => state.pendingData); // To store data of the
	// const clear_cookie = useForgotPasswordEmailStore(
	// 	(state) => state.clearPendingData
	// );
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit = (values) => {
		setIsPending(true);

		resetPassword(cookie_data, values).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setIsPending(false);
			if (data?.response === 1) {
				setIsDone(true);
				// clear_cookie();
			}
		});
	};

	return (
		<IconBoxWrapper
			icon={images.lockApproved}
			title="Reset Password"
			text="Your new password must be different from previously used password."
			className=""
			back="/auth/admin/forgot-password"
		>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`flex flex-col items-center justify-center w-full max-w-[350px] gap-5 ${
					isPending && 'pending'
				}`}
			>
				<div className="w-full space-y-3 py-[15px]">
					{/* New Password */}
					<InputFieldRHF
						label="New Password"
						icon={icons.lock}
						type="password"
						placeholder="Enter Password"
						rhf={{ ...register('new_pass') }}
						error={errors.new_pass?.message}
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
				</div>
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}

				<SubmitButton text="update" submitting={isPending} />
			</form>
			{isDone && (
				<IconPopupWrapper
					icon={images.checkmark}
					title="All Done"
					text="Your password has been reset"
					smallIcon
				>
					<div className="mt-5 w-[80%]">
						<LinkButton link="/admin" text="ok" />
					</div>
				</IconPopupWrapper>
			)}
		</IconBoxWrapper>
	);
}

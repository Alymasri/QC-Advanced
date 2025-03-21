'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IconBoxWrapper } from '../../../../wrappers';
import { images, icons } from '../../../../constants';
import {
	InputFieldRHF,
	SubmitButton,
	FormError,
	FormSuccess,
} from '../../../../components';

// SERVER COMPONENTE
import { getForgotPasswordOTP } from '@/actions/forgotPassword';
import { ForgotPasswordSchema } from '@/schemas';
import { useForgotPasswordEmailStore } from '@/config/store';

export default function ForgotPassword() {
	const storePendingData = useForgotPasswordEmailStore(
		(state) => state.storePendingData
	);
	const router = useRouter();
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(ForgotPasswordSchema),
	});

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);
		if (values && values.email && values.email.length > 0) {
			storePendingData(values);
		}

		getForgotPasswordOTP(values).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			if (data?.response === 1) {
				router.push('/auth/admin/verification');
			} else {
				setIsPending(false);
			}
		});
	};

	return (
		<IconBoxWrapper
			icon={images.lockQuery}
			title="Forgot Password?"
			text="No worries, we will help you to reset your password."
			className=""
			back="/auth/signin"
		>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`flex flex-col items-center justify-center w-full max-w-[350px] gap-7 ${
					isPending && 'pending'
				}`}
			>
				<div className="w-full space-y-0 pt-[25px]">
					{/* Email */}
					<InputFieldRHF
						label="Email"
						icon={icons.envelope}
						type="mail"
						placeholder="user@mail.com"
						rhf={{ ...register('email') }}
						error={errors.email?.message}
					/>
				</div>

				<div className="space-y-5 w-full">
					{error && <FormError message={error} center />}
					{success && <FormSuccess message={success} center />}

					<SubmitButton text="send" submitting={isPending} />
				</div>
			</form>
		</IconBoxWrapper>
	);
}

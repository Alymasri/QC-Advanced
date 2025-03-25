'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IconBoxWrapper } from '@/wrappers';
import { images, icons } from '@/constants';
import {
	InputFieldRHF,
	FormError,
	FormSuccess,
	SubmitButton,
	Button,
} from '@/components';

// SERVER COMPONENTE
import { LoginSchema } from '@/schemas';

export default function LogIn() {
	const [showOptions, setShowOptions] = useState(true);
	const [selectedOption, setSelectedOption] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();
	const [callback, setCallback] = useState(
		searchParams ? searchParams.get('callbackUrl') || `/${selectedOption}` : '/'
	);

	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
	});

	useEffect(() => {
		setValue('user_type', selectedOption);
		setCallback(searchParams.get('callbackUrl') || `/${selectedOption}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		signIn('credentials', {
			...values,
			redirect: false,
			callbackUrl: callback,
		}).then(({ ok, error }) => {
			if (ok) {
				setIsPending(false);
				setSuccess('Logging you in...');
				setTimeout(() => {
					if (callback === '/auth-in' || callback.includes('auth-in')) {
						router.push(`/${selectedOption}`);
					} else {
						router.push(callback);
					}
				}, 500);
			} else {
				setIsPending(false);
				// console.log(error);
				setError('Invalid Login details!');
			}
		});
	};

	return (
		<>
			{' '}
			{showOptions ? (
				<IconBoxWrapper
					icon={images.logo}
					title="Choose your Business"
					text="Please choose your business to login"
					className=""
					logo
				>
					<div className="flex items-center justify-center w-full py-[12vw] md:py-[30px]">
						<div className="flex flex-col items-center justify-center w-full md:max-w-[300px] gap-3 ">
							<Button
								text="admin"
								onClick={() => {
									setSelectedOption('admin');
									setShowOptions(false);
								}}
							/>
							<Button
								text="user "
								onClick={() => {
									setSelectedOption('user');
									setShowOptions(false);
								}}
								noBg
							/>
						</div>
					</div>
				</IconBoxWrapper>
			) : (
				<IconBoxWrapper
					icon={images.arrow}
					title="Login to Your Account"
					text="Please login to continue"
					className=""
				>
					<form
						onSubmit={handleSubmit((d) => onSubmit(d))}
						className={`flex flex-col items-center justify-center w-full max-w-[350px] gap-3 ${
							isPending && 'pending'
						}`}
					>
						{/* user type */}
						<input {...register('user_type')} className="hidden" />

						<div className="w-full space-y-3 py-[5px]">
							{/* Email */}
							<InputFieldRHF
								label="Email"
								icon={icons.envelope}
								type="mail"
								placeholder="mail@mail.com"
								rhf={{ ...register('email') }}
								error={errors.email?.message}
							/>
							{/* Password */}
							<div className="input-block">
								<InputFieldRHF
									label="Password"
									icon={icons.lock}
									type="password"
									placeholder="password"
									rhf={{ ...register('password') }}
									error={errors.password?.message}
								/>
								{selectedOption === 'admin' && (
									<div className="flex justify-end w-full">
										<Link
											href="/auth/admin/forgot-password"
											className="p !font-medium !text-[--black] hover:!text-[--brand]"
										>
											Forgot Password
										</Link>
									</div>
								)}
							</div>
						</div>
						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}

						<SubmitButton text="login" submitting={isPending} />

						{selectedOption === 'admin' && (
							<p className="auth/user/about text-[--black] p-4 w-full text-center">
								{"Don't have an account?"}{' '}
								<Link href="/auth/admin/register" className="text-[--brand]">
									Register
								</Link>
							</p>
						)}
					</form>
				</IconBoxWrapper>
			)}
		</>
	);
}

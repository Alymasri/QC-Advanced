'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	useRouter,
	useSearchParams,
	usePathname,
	redirect,
} from 'next/navigation';
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
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [callback, setCallback] = useState(
		searchParams
			? searchParams.get('callbackUrl') || process.env.NEXTAUTH_URL
			: process.env.NEXTAUTH_URL
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
		if (callback.includes('admin')) {
			setValue('user_type', 'admin');
		} else {
			setValue('user_type', 'user');
		}
		// const params = searchParams.toString();
		// const callbackUrlNew = `${pathname}${params ? '?' : ''}${params}`;

		// setCallback(callbackUrlNew);

		setCallback(searchParams.get('callbackUrl') || '/');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	useEffect(() => {
		if (callback.includes('admin')) {
			setValue('user_type', 'admin');
		} else {
			setValue('user_type', 'user');
		}
		// const params = searchParams.toString();
		// const callbackUrlNew = `${pathname}${params ? '?' : ''}${params}`;

		// setCallback(callbackUrlNew);
		setCallback(searchParams.get('callbackUrl') || '/');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		signIn('credentials', {
			...values,
			redirect: false,
			// callbackUrl: searchParams.get('callbackUrl'),
			callbackUrl: callback,
		}).then(({ ok, error }) => {
			if (ok) {
				setSuccess('Logging you in...');
				console.log('Hi');
				// router.push(searchParams.get('callbackUrl'));
				router.push(callback);
			} else {
				setIsPending(false);
				setError('Invalid Login details!');
			}
		});
	};

	return (
		<IconBoxWrapper
			icon={images.arrow}
			title="Login to Your Account"
			text="Please login to continue"
			className=""
		>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`flex flex-col items-center justify-center w-full md:max-w-[350px] gap-3 ${
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
						{callback.includes('admin') && (
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

				{callback.includes('admin') ? (
					<p className="auth/user/about text-[--black] p-4 w-full text-center">
						{"Don't have an account?"}{' '}
						<Link href="/auth/admin/register" className="text-[--brand]">
							Register
						</Link>
					</p>
				) : (
					<p className="auth/user/about text-[--black] p-4 w-full text-center">
						<Link href="/admin" className="text-[--black]">
							Login as <span className="text-[--brand]">Admin</span> Instead
						</Link>
					</p>
				)}
			</form>
		</IconBoxWrapper>
	);
}

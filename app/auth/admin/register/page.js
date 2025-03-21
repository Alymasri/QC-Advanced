'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IconBoxWrapper, IconPopupWrapper } from '../../../../wrappers';
import { images, icons } from '../../../../constants';
import {
	SelectBusinessType,
	InputFieldRHF,
	Checkbox,
	FormError,
	FormSuccess,
	SubmitButton,
	Loading,
	LoadingFailed,
} from '../../../../components';

// SERVER COMPONENTE
import { getOTP } from '@/actions/getOTP';
import { getBusinessTypes } from '@/actions/misc';
import { RegisterSchema } from '@/schemas';
import { useRegisterStore } from '@/config/store';

export default function Register() {
	const [isLoading, setIsLoading] = useState(true); // The loading state of the business Types list
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [businessTypes, setBusinessTypes] = useState();

	const [acceptedTO, setAcceptedTO] = useState(false);
	const storePendingData = useRegisterStore((state) => state.storePendingData); // To store data of the
	const router = useRouter();

	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(RegisterSchema),
	});

	useEffect(() => {
		getBusinessTypes().then((data) => {
			// console.log(data?.data);

			if (data?.data?.ResponseCode === 1) {
				setBusinessTypes(data?.data?.data);
				setSuccessfullyLoaded(true);
			}
			setIsLoading(false);
		});
	}, []);

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		storePendingData(values);
		const otpVals = {
			email: values.email,
			ccode: values.ccode,
			phone: values.phone,
			business_name: values.business_name,
		};

		getOTP(otpVals).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			if (data?.response === 1) {
				router.push('/auth/admin/verify-otp');
			} else {
				setIsPending(false);
			}
		});
	};

	return isLoading ? (
		<Loading />
	) : successfullyLoaded ? (
		<>
			<IconBoxWrapper
				title="Create New Account"
				text="Enter your details below"
				className=""
				profile
				setValue={setValue}
				name="profile"
				register={register}
				rhf={{ ...register('profile') }}
				error={errors.profile?.message}
			>
				<form
					onSubmit={handleSubmit((d) => onSubmit(d))}
					className={`flex flex-col items-center justify-center w-full md:min-w-[600px] lg:min-w-[650px] gap-5 ${
						isPending && 'pending'
					}`}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 py-5">
						{/* First Name */}
						<InputFieldRHF
							label="First Name"
							icon={icons.user1}
							type="text"
							placeholder="John"
							rhf={{ ...register('fname') }}
							error={errors.fname?.message}
						/>
						{/* Last Name */}
						<InputFieldRHF
							label="Last Name"
							icon={icons.user1}
							type="text"
							placeholder="Doe"
							rhf={{ ...register('lname') }}
							error={errors.lname?.message}
						/>
						{/* Email */}
						<InputFieldRHF
							label="Email"
							icon={icons.envelope}
							type="mail"
							placeholder="user@mail.com"
							rhf={{ ...register('email') }}
							error={errors.email?.message}
						/>
						{/* Phone Number */}
						<div className="flex gap-2">
							<div className="!max-w-[80px]">
								<InputFieldRHF
									label="Code"
									icon={icons.mobile}
									type="text"
									placeholder="+1"
									rhf={{ ...register('ccode') }}
									error={errors.ccode?.message}
								/>
							</div>
							<div className="w-full">
								<InputFieldRHF
									label="Phone Number"
									// icon={icons.mobile}
									type="text"
									placeholder="00000 00000"
									rhf={{ ...register('phone') }}
									error={errors.phone?.message}
								/>
							</div>
						</div>
						{/* Business Name */}
						<InputFieldRHF
							label="Business Name"
							icon={icons.details}
							type="text"
							placeholder="Business Name"
							rhf={{ ...register('business_name') }}
							error={errors.business_name?.message}
						/>
						{/* Business Type */}
						<SelectBusinessType
							icon={icons.details}
							label="Business Type"
							options={businessTypes}
							setValue={setValue}
							name="business_type_id"
							rhf={{ ...register('business_type_id') }}
							error={errors.business_type_id?.message}
							darkBg
						/>
						{/* Address */}
						<InputFieldRHF
							label="Address"
							icon={icons.location}
							type="textarea"
							placeholder="Enter your Address"
							rhf={{ ...register('address') }}
							error={errors.address?.message}
							additionalClassName="md:col-span-2"
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
					</div>
					<div className="w-full max-w-[300px]">
						{error && <FormError message={error} center />}
						{success && <FormSuccess message={success} center />}
					</div>
					{/* T & C */}
					<div className="flex md:items-center md:justify-center gap-2 w-full">
						<Checkbox toggle={setAcceptedTO} toggled={acceptedTO} />
						<p>
							I agree to <b>Privacy Policy</b> and <b>Terms & Conditions</b>
						</p>
					</div>
					<SubmitButton
						text="register"
						submitting={isPending}
						additionalClass={`mb-5 !max-w-[300px] ${
							acceptedTO
								? 'opacity-100 pointer-events-auto'
								: 'opacity-70 pointer-events-none'
						}`}
					/>
					{/* <div className="hidden md:block h-[50px] bg-[--white] absolute top-[50px] left-0 w-full rounded-t-[--rounding]" /> */}
					{/* <div className="h-[20px] lg:h-0 bg-[--white] absolute bottom-0 left-0 w-full rounded-b-[--rounding]" /> */}
					{/* <div className="h-screen w-full fixed top-0 left-0 z-10">
					<Loading />
				</div> */}
				</form>
			</IconBoxWrapper>
		</>
	) : (
		<LoadingFailed />
	);
}

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { IconBoxWrapper, IconPopupWrapper } from '../../../../wrappers';
import {
	OTPInput,
	FormError,
	FormSuccess,
	Button,
	LinkButton,
} from '../../../../components';
import { images, icons } from '../../../../constants';

// BACKEND RELATED
import { useRegisterStore } from '@/config/store'; // Store where user's details are stored
import { getOTP } from '@/actions/getOTP'; // For Resend OTP
import { registerAdmin } from '@/config/registerAdmin';

export default function Verification() {
	const cookie_data = useRegisterStore((state) => state.pendingData); // To store data of the
	const clear_cookie = useRegisterStore((state) => state.clearPendingData);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [isDone, setIsDone] = useState(false);
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		input1: '',
		input2: '',
		input3: '',
		input4: '',
	});

	const handleInputChange = (inputId, value) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[inputId]: value,
		}));
	};

	// ! OTP
	const handleSubmit = () => {
		setError('');
		setSuccess('');

		setIsSubmitting(true);
		// console.log(formData);

		const otp = `${formData.input1}${formData.input2}${formData.input3}${formData.input4}`;

		registerAdmin(cookie_data, otp).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setIsSubmitting(false);
			if (data?.response === 1) {
				setIsDone(true);
				clear_cookie();
			}
		});
	};

	// ! RESEND OTP
	const resendOTP = () => {
		setError('');
		setSuccess('');
		setIsSubmitting(true);

		const otpVals = {
			email: cookie_data.email,
			ccode: cookie_data.ccode,
			phone: cookie_data.phone,
			business_name: cookie_data.business_name,
		};

		getOTP(otpVals).then((data) => {
			if (data?.response === 1) {
				setSuccess('OTP Resent');
				setIsSubmitting(false);
				setTimeout(() => {
					setSuccess(null);
				}, 4300);
			} else {
				setError('Failed to resend OTP');
				setIsSubmitting(false);
				setTimeout(() => {
					setError(null);
				}, 4300);
			}
		});
	};

	return (
		<IconBoxWrapper
			icon={images.query}
			title="Authentication"
			text="Enter the verification code we just sent to your email address."
			className=""
			back="/auth/admin/register"
		>
			<div
				className={`flex flex-col items-center justify-center w-full max-w-[350px] gap-5 ${
					isSubmitting && 'pending'
				}`}
			>
				<div className="w-full space-y-3 py-[25px]">
					{/* OTP */}
					<div
						id="OTPInputGroup"
						className="grid grid-cols-4 gap-3"
						data-autosubmit="true"
					>
						<OTPInput
							id="input1"
							value={formData.input1}
							onValueChange={handleInputChange}
							// previousId={null}
							handleSubmit={handleSubmit}
							nextId="input2"
						/>
						<OTPInput
							id="input2"
							value={formData.input2}
							onValueChange={handleInputChange}
							previousId="input1"
							handleSubmit={handleSubmit}
							nextId="input3"
						/>
						<OTPInput
							id="input3"
							value={formData.input3}
							onValueChange={handleInputChange}
							previousId="input2"
							handleSubmit={handleSubmit}
							nextId="input4"
						/>
						<OTPInput
							id="input4"
							value={formData.input4}
							onValueChange={handleInputChange}
							previousId="input3"
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>
				{error && <FormError message={error} center />}
				{success && <FormSuccess message={success} center />}

				<Button
					onClick={() => handleSubmit()}
					text="verify"
					submitting={isSubmitting}
				/>

				<div className="pb-[50px] md:pb-[25px]" />
				<p className="text-[--black] absolute bottom-0 left-0 p-4 w-full text-center">
					{"Didn't receive the code?"}{' '}
					<motion.button
						whileTap={{ scale: 0.9 }}
						whileHover={{ scale: 1.1, x: 4 }}
						transition={{ type: 'spring', bounce: 0.75 }}
						type="button"
						onClick={() => resendOTP()}
						className="text-[--brand]"
					>
						Resend Code
					</motion.button>
				</p>
			</div>
			{isDone && (
				<IconPopupWrapper
					icon={images.congratulations}
					title="Congratulations"
					text="You have successfully created your account!"
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

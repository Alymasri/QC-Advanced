'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { IconBoxWrapper } from '../../../../wrappers';
import {
	OTPInput,
	FormError,
	FormSuccess,
	Button,
} from '../../../../components';
import { images, icons } from '../../../../constants';

// SERVER COMPONENT
import { useForgotPasswordEmailStore } from '@/config/store';
import {
	verifyForgotPasswordOTP,
	getForgotPasswordOTP,
} from '@/actions/forgotPassword';

export default function Verification() {
	const cookie_data = useForgotPasswordEmailStore((state) => state.pendingData); // To store data of the
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormDaformData] = useState({
		input1: '',
		input2: '',
		input3: '',
		input4: '',
	});

	const handleInputChange = (inputId, value) => {
		setFormDaformData((prevFormDaformData) => ({
			...prevFormDaformData,
			[inputId]: value,
		}));
	};

	const router = useRouter();

	// ! OTP
	const handleSubmit = () => {
		setError('');
		setSuccess('');
		setIsSubmitting(true);

		const otp = `${formData.input1}${formData.input2}${formData.input3}${formData.input4}`;

		// console.log(cookie_data);

		verifyForgotPasswordOTP(cookie_data, otp).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			if (data.response === 1) {
				router.push('/auth/admin/reset-password');
			} else {
				setIsSubmitting(false);
			}
		});
	};

	// ! RESEND OTP
	const resendOTP = () => {
		setError('');
		setSuccess('');
		setIsSubmitting(true);
		getForgotPasswordOTP(cookie_data).then((data) => {
			if (data?.response === 1) {
				setSuccess('OTP Resent Successfully');
				setIsSubmitting(false);
				setTimeout(() => {
					setSuccess(null);
				}, 3000);
			} else {
				setError('Failed to resend OTP!');
				setIsSubmitting(false);
				setTimeout(() => {
					setError(null);
				}, 3000);
			}
		});
	};

	return (
		<IconBoxWrapper
			icon={images.query}
			title="Authentication"
			text="Enter the verification code we just sent to your email address."
			className=""
			back="/auth/admin/forgot-password"
		>
			<div
				className={`flex flex-col items-center justify-center w-full max-w-[300px] gap-5 ${
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
		</IconBoxWrapper>
	);
}

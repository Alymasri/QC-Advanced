'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { images, icons } from '../../constants';
import { IconPopupWrapper } from '../../wrappers';
import {
	InputFieldRHF,
	EditProfileImage,
	SelectBusinessType,
	FormError,
	FormSuccess,
	SubmitButton,
	Loading,
	LoadingFailed,
	Button,
} from '../../components';

// SERVER COMPONENTE
import { useSession } from 'next-auth/react';
import { getUserProfile } from '@/actions/userProfile';
import { updateProfile } from '@/config/updateProfile';
import { EditProfileSchema } from '@/schemas';

export default function EditProfile() {
	const { data: session } = useSession();
	const user_type = session?.user?.role;
	const user_id = session?.user?.id;

	const [isLoading, setIsLoading] = useState(true); // The loading state of the business Types list
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [businessTypes, setBusinessTypes] = useState();
	const [initialData, setInitialData] = useState();

	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [savedPopup, setSavedPopup] = useState(false);

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(EditProfileSchema),
	});

	useEffect(() => {
		getUserProfile().then((data) => {
			// console.log(data);

			if (data?.data?.ResponseCode === 1) {
				setBusinessTypes(data?.business_types?.data);
				setInitialData(data?.data?.data);
				setSuccessfullyLoaded(true);
			}
			setIsLoading(false);
		});
	}, []);

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		updateProfile(values, user_id, user_type).then((data) => {
			setError(data.error);
			// setSuccess(data.success);
			setIsPending(false);
			if (data?.response === 1) {
				setSavedPopup(true);
			}
		});
	};

	return isLoading ? (
		<Loading inner />
	) : successfullyLoaded ? (
		<>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`flex flex-col items-center justify-center w-full gap-5 ${
					isPending && 'pending'
				}`}
			>
				<div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-3 py-0">
					<div className="relative h-[100px] lg:h-[120px] xl:col-span-2 flex justify-center">
						<EditProfileImage
							rhf={{ ...register('profile') }}
							error={errors.profile?.message}
							setValue={setValue}
							name="profile"
							defaultValue={initialData.profile}
						/>
					</div>
					{/* First Name */}
					<InputFieldRHF
						label="First Name"
						icon={icons.user1}
						type="text"
						placeholder="John"
						rhf={{ ...register('fname') }}
						error={errors.fname?.message}
						defaultValue={initialData.fname}
					/>
					{/* Last Name */}
					<InputFieldRHF
						label="Last Name"
						icon={icons.user1}
						type="text"
						placeholder="Doe"
						rhf={{ ...register('lname') }}
						error={errors.lname?.message}
						defaultValue={initialData.lname}
					/>
					{/* Email */}
					<InputFieldRHF
						label="Email"
						icon={icons.envelope}
						type="mail"
						placeholder="user@mail.com"
						rhf={{ ...register('email') }}
						error={errors.email?.message}
						defaultValue={initialData.email}
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
								defaultValue={initialData.ccode}
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
								defaultValue={initialData.phone}
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
						defaultValue={initialData.business_name}
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
						defaultValue={initialData.business_type_id}
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
						defaultValue={initialData.address}
					/>
				</div>
				<div className="w-full max-w-[300px]">
					{error && <FormError message={error} center />}
					{success && <FormSuccess message={success} center />}
				</div>
				<SubmitButton text="save" submitting={isPending} />
			</form>
			{savedPopup && (
				<IconPopupWrapper
					icon={images.congratulations}
					title="Profile Updated"
					text="Your profile has been updated successfully"
					smallIcon
				>
					<div className="mt-5 w-[80%]">
						<Button text="OK" onClick={() => setSavedPopup(false)} />
					</div>
				</IconPopupWrapper>
			)}
		</>
	) : (
		<LoadingFailed />
	);
}

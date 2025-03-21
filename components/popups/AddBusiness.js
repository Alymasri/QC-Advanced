'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { images, icons } from '../../constants';
import {
	SelectInput,
	InputFieldRHF,
	MiniAddMedia,
	SubmitButton,
	FormError,
	FormSuccess,
} from '../../components';
import { SidePopupWrapper, TitlePopupWrapper } from '../../wrappers';

// SERVER COMPONENT
import { addBusiness } from '@/config/addBusinessAndChecklist';
import { BusinessSchema } from '@/schemas';

const AddBusiness = ({
	close,
	nextPopup,
	setBusinessId,
	userId,
	businessList,
	setBusinessList,
}) => {
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [imageName, setImageName] = useState('');

	// UI
	const [showAddMedia, setShowAddMedia] = useState(false);

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(BusinessSchema),
	});

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		// console.log(values);

		addBusiness(values, userId).then((data) => {
			setIsPending(false);
			setError(data.error);
			setSuccess(data.success);
			setBusinessId(data.business_id);

			const prevBusinessList = [...businessList];

			// console.log(data?.data);
			// console.log(businessList);

			if (data.success) {
				setBusinessList([data?.data?.data, ...prevBusinessList]);
				setTimeout(() => {
					close();
					nextPopup();
				}, 1000);
			}
		});
	};

	return (
		<SidePopupWrapper title="Add Business" close={close}>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`h-full w-full py-5 px-4 lg:p-7 space-y-8 ${
					isPending && 'pending'
				}`}
			>
				<div className="w-full space-y-4">
					{/* Upload Document */}
					<div className="input-block">
						<label className={errors.business_img?.message && 'text-[--brand]'}>
							Business Image
						</label>
						<button
							type="button"
							onClick={() => setShowAddMedia(true)}
							className="flex-center !gap-1 flex-col border-2 border-dashed  border-[--border] rounded-lg p-6 lg:p-8"
						>
							<Image
								src={icons.gallery}
								alt="Business image"
								className="min-w-[25px] max-w-[25px] h-[25px] object-contain"
							/>
							<p className="black-text">Upload image of your business</p>
							{imageName && (
								<p className="black-text">
									Uploaded: <span className="text-[--brand]">{imageName}</span>
								</p>
							)}
						</button>
						<p className="text-[--brand] text-xs">
							{errors.business_img?.message &&
							errors.business_img?.message.includes('instance')
								? 'Enter Business Image*'
								: errors.business_img?.message}
						</p>
					</div>
					{/* Business Name */}
					<InputFieldRHF
						label="Business Name"
						icon={icons.user1}
						type="text"
						placeholder="Business Name"
						rhf={{ ...register('business_name') }}
						error={errors.business_name?.message}
					/>
					{/* Business Email */}
					<InputFieldRHF
						label="Business Email"
						icon={icons.envelope}
						type="mail"
						placeholder="Business Email"
						rhf={{ ...register('business_email') }}
						error={errors.business_email?.message}
					/>
					{/* Business location */}
					<InputFieldRHF
						label="Business Location"
						icon={icons.location}
						type="text"
						placeholder="e.g Istabul"
						rhf={{ ...register('location') }}
						error={errors.location?.message}
					/>
				</div>
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
				<div className="w-full">
					<SubmitButton text="register" submitting={isPending} />
				</div>
				<div className="popup-pb" />
			</form>

			{showAddMedia && (
				<TitlePopupWrapper
					title="Upload Photo"
					close={() => setShowAddMedia(false)}
				>
					<MiniAddMedia
						rhf={{ ...register('business_img') }}
						setValue={setValue}
						name="business_img"
						single
						close={() => setShowAddMedia(false)}
						setImageName={setImageName}
					/>
				</TitlePopupWrapper>
			)}
		</SidePopupWrapper>
	);
};

export default AddBusiness;

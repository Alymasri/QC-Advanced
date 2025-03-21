'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { images, icons } from '../../constants';
import {
	DragDropFile,
	SelectInput,
	InputField,
	InputFieldRHF,
	SelectInputRHF,
	SubmitButton,
	FormError,
	FormSuccess,
} from '../../components';

// SERVER COMPONENT
import {
	addTrainingMaterial,
	updateTrainingMaterial,
} from '@/config/addTrainingMaterials';
import { TrainingMaterialSchema, EditTrainingMaterialSchema } from '@/schemas';

const TrainingMaterial = ({
	close,
	className,
	edit,
	editId,
	userId,
	businessList,
	trainingMaterialsList,
	setTrainingMaterialsList,
	initialValues,
	overview,
	setOverview,
}) => {
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [imageName, setImageName] = useState('');

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: edit
			? zodResolver(EditTrainingMaterialSchema)
			: zodResolver(TrainingMaterialSchema),
	});

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		// console.log(values);

		setIsPending(true);

		if (edit && editId) {
			updateTrainingMaterial(values, userId, editId).then((data) => {
				setIsPending(false);
				setError(data.error);
				setSuccess(data.success);

				// console.log(data?.data?.data);

				if (data.success) {
					let prevTrainingMaterials = [...trainingMaterialsList];
					let editedIndex = prevTrainingMaterials.findIndex(
						(obj) => obj.training_id === editId
					);
					prevTrainingMaterials[editedIndex] = data?.data?.data;
					setTrainingMaterialsList(prevTrainingMaterials);
					setTimeout(() => {
						close();
					}, 1000);
				}
			});
		} else {
			addTrainingMaterial(values, userId).then((data) => {
				setIsPending(false);
				setError(data.error);
				setSuccess(data.success);

				// console.log(data?.data?.data);

				if (data.success) {
					setTrainingMaterialsList([
						data?.data?.data,
						...trainingMaterialsList,
					]);

					let newOverview = overview;
					newOverview[0].value = overview[0].value + 1;
					setOverview(newOverview);

					setTimeout(() => {
						close();
					}, 1000);
				}
			});
		}
	};

	return (
		<div
			className={
				className ? className : 'h-full w-full py-5 px-4 lg:p-7 space-y-8'
			}
		>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`w-full space-y-4 ${isPending && 'pending'}`}
			>
				{/* Title */}
				<InputFieldRHF
					label="Title"
					type="text"
					placeholder="Enter Title"
					rhf={{ ...register('title') }}
					error={errors.title?.message}
					defaultValue={initialValues && initialValues.title}
				/>
				{/* Upload Image */}
				<div className="input-block">
					<label>Upload Image</label>
					<DragDropFile
						setValue={setValue}
						name="image"
						rhf={{ ...register('image') }}
						error={errors.image?.message}
						single
						defaultValue={initialValues && initialValues.image}
					/>
				</div>
				{/* Upload Document */}
				<div className="input-block">
					<label>Upload Document</label>
					<DragDropFile
						setValue={setValue}
						name="document"
						rhf={{ ...register('document') }}
						error={errors.document?.message}
						single
						document
						defaultValue={initialValues && initialValues.document}
					/>
				</div>
				{/* Description */}
				<InputFieldRHF
					label="Description"
					type="textarea"
					placeholder="Add Description..."
					rhf={{ ...register('description') }}
					error={errors.description?.message}
					additionalClassName="md:col-span-2"
					defaultValue={initialValues && initialValues.description}
				/>
				{/* Business */}
				<SelectInputRHF
					icon={icons.details}
					label="Business"
					options={businessList}
					businessList
					setValue={setValue}
					name="business_id"
					rhf={{ ...register('business_id') }}
					error={errors.business_id?.message}
					defaultValue={initialValues && initialValues.business_id}
				/>

				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}

				<div className="w-full">
					<SubmitButton
						text={edit ? 'save' : 'create'}
						submitting={isPending}
					/>
				</div>
			</form>
			<div className="pb" />
		</div>
	);
};

export default TrainingMaterial;

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { icons } from '../../constants';
import {
	InputFieldRHF,
	SubmitButton,
	FormError,
	FormSuccess,
} from '../../components';

// SERVER COMPONENT
import { addActionActivity } from '@/config/addAction';
import { AddActionCommentSchema } from '@/schemas';

const CommentTextBox = ({
	userId,
	actionId,
	actionActivitiesList,
	setActionActivitiesList,
}) => {
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [image, setImage] = useState('');
	const inputRef = useRef();

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(AddActionCommentSchema),
	});

	const onImageChange = async (event) => {
		if (event.target.files && event.target.files) {
			const file = event.target.files[0];
			setImage(URL.createObjectURL(file));

			if (file) {
				setValue('media', file);
			}
		}
	};

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		// console.log(values);

		setIsPending(true);

		addActionActivity(values, userId, actionId).then((data) => {
			setIsPending(false);
			setError(data.error);
			setSuccess(data.success);

			setTimeout(() => {
				setError('');
				setSuccess('');
			}, 1000);

			if (data.response === 1) {
				setActionActivitiesList([data?.data?.data, ...actionActivitiesList]);
				setImage(null);
				setValue('msg', '');
			}
		});
	};

	return (
		<div className="fixed bottom-0 right-0 w-full md:w-[--sidebar] p-4 md:px-7 bg-[--white] shadow">
			<div className="fixed w-full md:w-[--sidebar] bottom-[75px] right-0 px-4 md:px-7">
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
			</div>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`flex-v-center w-full ${isPending && 'pending'}`}
			>
				<div className="icon-input flex-1">
					<div className="pr-2 border-r">
						<Image
							src={image ? image : icons.file}
							width={image ? 65 : 20}
							height={image ? 65 : 20}
							alt="insert file"
							className={`input-img ${
								image
									? '!object-cover !min-w-[55px] !min-h-[55px]'
									: '!min-w-[20px]'
							}`}
							onClick={() => inputRef.current.click()}
						/>
						<input
							ref={inputRef}
							type="file"
							name={name}
							multiple={false}
							accept=".png,.jpg,.jpeg"
							className="absolute top-0 left-0 w-[200%] hidden"
							onChange={onImageChange}
						/>
						<input
							type="file"
							name={name}
							multiple={false}
							accept=".png,.jpg,.jpeg"
							className="absolute top-0 left-0 w-[200%] hidden"
							{...register('media')}
						/>
					</div>
					<input
						placeholder="comment"
						{...register('msg')}
						className="input placeholder:capitalize"
					/>
					<p className="text-[--brand]">{errors.msg?.message}</p>
				</div>
				<div>
					<button
						type="submit"
						className="btn-1 !max-w-[40px] !min-w-[40px] !h-[40px] !rounded-full flex-center !p-0 !pr-[1px]"
					>
						<Image
							src={icons.plane}
							w={30}
							h={30}
							alt="insert file"
							className="input-img !min-w-[22px] !h-auto"
						/>
					</button>
				</div>
			</form>
		</div>
	);
};

export default CommentTextBox;

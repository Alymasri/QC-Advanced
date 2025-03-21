'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	SelectInputRHF,
	InputFieldRHF,
	Checkbox,
	FormError,
	FormSuccess,
	SubmitButton,
} from '../../components';
import { images, icons } from '../../constants';

// SERVER COMPONENTE
import { contactUs } from '@/actions/contactUs';
import { ContactUsSchema } from '@/schemas';

const ContactUs = () => {
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		resolver: zodResolver(ContactUsSchema),
	});

	const onSubmit = (values) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		// console.log(values);

		contactUs(values).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setIsPending(false);

			if (data?.response === 1) {
				reset();
			}
		});
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit((d) => onSubmit(d))}
				className={`flex flex-col gap-3 ${isPending && 'pending'}`}
			>
				<h2 className="hidden lg:block">Contact Us</h2>
				{/* Name */}
				<InputFieldRHF
					label="Name"
					icon={icons.user1}
					type="text"
					placeholder="John"
					rhf={{ ...register('name') }}
					error={errors.name?.message}
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
				{/* Subject */}
				<SelectInputRHF
					icon={icons.details}
					label="Subject"
					options={['Subscription', 'Need To Know', 'Question', 'Others']}
					setValue={setValue}
					name="subject"
					rhf={{ ...register('subject') }}
					error={errors.subject?.message}
					darkBg
				/>
				{/* Message */}
				<InputFieldRHF
					label="Message"
					icon={icons.location}
					type="textarea"
					placeholder="Enter your Message"
					rhf={{ ...register('msg') }}
					error={errors.msg?.message}
					additionalClassName="md:col-span-2"
				/>
				<div className="pt-7 lg:pt-5 space-y-3">
					{error && <FormError message={error} center />}
					{success && <FormSuccess message={success} center />}

					<SubmitButton text="submit" submitting={isPending} />
				</div>
			</form>
		</div>
	);
};

export default ContactUs;

'use server';
import axios from 'axios';
import FormData from 'form-data';
import { ContactUsSchema } from '@/schemas';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export const contactUs = async (values) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	const validatedFields = ContactUsSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();
	formData.append('email', values.email);
	formData.append('name', values.name);
	formData.append('subject', values.subject);
	formData.append('msg', values.msg);
	formData.append('user_id', user_id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/contactUs`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
			}
		);

		if (data) {
			if (data.ResponseCode === 1) {
				// console.log(data);
				return {
					success: data.ResponseMsg,
					response: data.ResponseCode,
				};
			} else {
				return {
					error: data.ResponseMsg,
				};
			}
		}
	} catch (error) {
		// console.log(error);
		return { error: 'Network Error, Please Try Again' };
	}
};

'use server';
import axios from 'axios';
import FormData from 'form-data';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

import * as z from 'zod';
import { InviteSchema } from '@/schemas';

export const addInvitee = async (values, businessId) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	const validatedFields = InviteSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();
	formData.append('email', values.email);
	formData.append('username', values.username);
	formData.append('password', values.password);
	formData.append('original_password', values.password);
	formData.append('other_user_id', other_user_id);
	formData.append('user_id', user_id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/inviteUser`,
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
					data: data,
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

export const removeInvitee = async (other_user_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	const formData = new FormData();
	formData.append('user_id', user_id);
	formData.append('other_user_id', other_user_id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/removeUser`,
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

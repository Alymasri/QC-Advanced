'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export const getUserProfile = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserProfile`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({ user_id: session?.user?.id }),
			}
		);

		const businessType = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBusinessType`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
			}
		);

		const data = await res.json();
		const businessTypeData = await businessType.json();

		if (res.ok && data && businessType.ok && businessTypeData) {
			return { data: data, business_types: businessTypeData };
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Training Materials" };
	}
};

export const deleteAccount = async ({ reason }) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteAccount`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: session?.user?.id,
					delete_reason: reason,
				}),
			}
		);

		const data = await res.json();

		if (res.ok && data) {
			return {
				success: 'Account Deleted Successfully',
				response: data.ResponseCode,
			};
		} else {
			return { error: 'Could not delete account' };
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Training Materials" };
	}
};

'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export const getBusinessTypes = async () => {
	try {
		const res = await fetch(
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

		const businessTypes = await res.json();

		if (res.ok && businessTypes) {
			return {
				data: businessTypes,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

export const getBusinessAssignees = async (business_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBusinessWithAssignee`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({ user_id: user_id, business_id: business_id }),
			}
		);

		const assignees = await res.json();

		if (res.ok && assignees) {
			return { data: assignees };
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

export const completeInspection = async (business_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/completeInspection`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({ user_id: user_id, business_id: business_id }),
			}
		);

		const inspection_dtl = await res.json();

		if (res.ok && inspection_dtl) {
			return { data: inspection_dtl, response: inspection_dtl.ResponseCode };
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getBusinessList } from './getBusiness';

export const getTrainingMaterials = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTrainingMaterialList`,
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

		const b_res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getBusinessList`,
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

		const overview_res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserExtraDtl`,
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

		const materials = await res.json();
		const businessList = await b_res.json();
		const overview = await overview_res.json();

		if (
			res.ok &&
			b_res.ok &&
			overview_res.ok &&
			materials &&
			businessList &&
			overview
		) {
			return {
				data: materials,
				businessList: businessList,
				overview: overview,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

// !USER
export const getUserTrainingMaterials = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTrainingMaterialList`,
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

		const overview_res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserExtraDtl`,
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

		const materials = await res.json();
		const overview = await overview_res.json();

		if (res.ok && overview_res.ok && materials && overview) {
			return {
				data: materials,
				overview: overview,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

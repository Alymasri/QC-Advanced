'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
// import { getTrainingMaterials } from '@/actions/getTrainingMaterials';
import { BusinessSchema } from '@/schemas';

export const getBusinessList = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
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

		const businesses = await res.json();
		const overview = await overview_res.json();

		if (res.ok && businesses && overview_res.ok && overview) {
			return { data: businesses, overview: overview };
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

// export const getBusinessAssignees = async (business_id) => {
// 	const session = await getServerSession(options);
// 	const user_id = session?.user?.id;

// 	try {
// 		const res = await fetch(
// 			`${process.env.NEXT_PUBLIC_BASE_URL}/api/businessWiseAssignee`,
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: 'application/json',
// 					key: process.env.NEXT_PUBLIC_KEY,
// 					token: process.env.NEXT_PUBLIC_TOKEN,
// 				},
// 				body: JSON.stringify({ user_id: user_id, business_id: business_id }),
// 			}
// 		);

// 		const assignees = await res.json();

// 		if (res.ok && assignees) {
// 			return { data: assignees };
// 		}
// 	} catch (error) {
// 		return { errorMsg: "Couldn't Find Businesses" };
// 	}
// };

export const deleteBusiness = async (business_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/deleteBusiness`,
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

		const deleted = await res.json();

		if (res.ok && deleted.ResponseCode === 1) {
			return { success: deleted.ResponseMsg, response: deleted.ResponseCode };
		} else {
			return {
				error: deleted.ResponseMsg,
			};
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

		const report = await res.json();

		if (res.ok && report.ResponseCode === 1) {
			return {
				success: report.ResponseMsg,
				response: report.ResponseCode,
				report: report.data.inspection_pdf,
			};
		} else {
			return {
				error: report.ResponseMsg,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

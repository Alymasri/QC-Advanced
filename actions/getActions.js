'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getBusinessList } from './getBusiness';

export const getActions = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getActionList`,
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

		const ba_res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getBusinessWithAssignee`,
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

		const actions = await res.json();
		const businessList = await ba_res.json();
		const overview = await overview_res.json();

		if (
			res.ok &&
			ba_res.ok &&
			overview_res.ok &&
			actions &&
			businessList &&
			overview
		) {
			return { data: actions, businessList: businessList, overview: overview };
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

export const getActionActivities = async (action_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/actionActivity`,
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
					action_id: action_id,
				}),
			}
		);

		const activities = await res.json();
		// console.log(activities);

		if (res.ok && activities.ResponseCode === 1) {
			return {
				response: activities.ResponseCode,
				data: activities,
			};
		} else {
			return {
				error: activities.ResponseMsg,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

export const deleteAction = async (action_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteAction`,
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
					action_id: action_id,
				}),
			}
		);

		const deleted = await res.json();
		// console.log(deleted);

		if (res.ok && deleted.ResponseCode === 1) {
			return {
				success: deleted.ResponseMsg,
				response: deleted.ResponseCode,
			};
		} else {
			return {
				error: deleted.ResponseMsg,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

// !USER
// !USER
// !USER
// !USER
// !USER
export const getActionsUser = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getActionList`,
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

		const ba_res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/businessWiseAssignee`,
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

		const actions = await res.json();
		const businessAssignees = await ba_res.json();
		const overview = await overview_res.json();

		// console.log(overview);

		if (
			res.ok &&
			ba_res.ok &&
			overview_res.ok &&
			actions &&
			businessAssignees &&
			overview
		) {
			return {
				data: actions,
				overview: overview,
				assignees: businessAssignees,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

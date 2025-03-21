'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
// import { getTrainingMaterials } from '@/actions/getTrainingMaterials';
// import { BusinessSchema } from '@/schemas';

export const getListOfChecklist = async (business_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getCheckListBusinessWise`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_id: business_id,
					type: 'unarchive',
				}),
			}
		);
		const res_2 = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getCheckListBusinessWise`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_id: business_id,
					type: 'archive',
				}),
			}
		);
		const checklist = await res.json();
		const archive = await res_2.json();

		if (
			res.ok &&
			checklist.ResponseCode === 1 &&
			res_2.ok &&
			archive.ResponseCode === 1
		) {
			return {
				checklist: checklist,
				archive: archive,
				success: checklist.ResponseMsg,
				response: checklist.ResponseCode,
			};
		} else {
			return {
				error: "Couldn't get data",
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

// ! GET TEMPLATE CHECKLIST
export const getTemplateChecklist = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const user_data = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserExtraDtl`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
				}),
			}
		);
		const user_dtl = await user_data.json();
		const business_type_id = user_dtl.data.business_type_id;

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getTemplateChecklist`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_type_id: business_type_id,
				}),
			}
		);

		const checklist = await res.json();

		if (res.ok && checklist.ResponseCode === 1) {
			return {
				checklist: checklist,
				success: checklist.ResponseMsg,
				response: checklist.ResponseCode,
			};
		} else {
			return {
				error: checklist.ResponseMsg,
			};
		}
	} catch (error) {
		// console.log(error);
		return { errorMsg: "Couldn't Connect" };
	}
};

// ! IMPORT TEMPLATE CHECKLIST
export const importTemplateChecklist = async (businessId, acmIds) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/importTemplateChecklist`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_id: businessId,
					acm_id: acmIds.toString(),
				}),
			}
		);

		const data = await res.json();

		// console.log(data);

		if (res.ok && data.ResponseCode === 1) {
			return {
				data: data,
				success: data.ResponseMsg,
				response: data.ResponseCode,
			};
		} else {
			return {
				error: data.ResponseMsg,
			};
		}
	} catch (error) {
		// console.log(error);
		return { errorMsg: "Couldn't Connect" };
	}
};

// ! GET SINGLE CHECKLIST
export const getSingleChecklistData = async (
	business_checklist_id,
	business_id
) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSingleCheckListData`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_checklist_id: business_checklist_id,
				}),
			}
		);
		const res_2 = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/businessWiseAssignee`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_id: business_id,
				}),
			}
		);

		const checklist = await res.json();
		const assignees = await res_2.json();

		if (
			res.ok &&
			checklist.ResponseCode === 1 &&
			res_2.ok &&
			assignees.ResponseCode === 1
		) {
			return {
				checklist: checklist,
				assignees: assignees,
				success: checklist.ResponseMsg,
				response: checklist.ResponseCode,
			};
		} else {
			return {
				error: checklist.ResponseMsg,
			};
		}
	} catch (error) {
		// console.log(error);
		return { errorMsg: "Couldn't Connect" };
	}
};

// ! GET BUSINESS ASSIGNEE
export const getAssigneeData = async (business_id) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/businessWiseAssignee`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_id: business_id,
				}),
			}
		);

		const assignees = await res.json();

		if (res.ok && assignees.ResponseCode === 1) {
			return {
				assignees: assignees,
				success: assignees.ResponseMsg,
				response: assignees.ResponseCode,
			};
		} else {
			return {
				error: assignees.ResponseMsg,
			};
		}
	} catch (error) {
		// console.log(error);
		return { errorMsg: "Couldn't Connect" };
	}
};

// ! DELETE CHECKLIST
export const deleteChecklist = async (checklistId) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/deleteCheckList`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					business_checklist_id: checklistId,
				}),
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

// ! USER
// ! USER
// ! USER
// ! USER
// ! USER
// ! USER
export const getListOfChecklistUser = async () => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getCheckListBusinessWise`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					type: 'unarchive',
				}),
			}
		);
		const res_2 = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getCheckListBusinessWise`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					key: process.env.NEXT_PUBLIC_KEY,
					token: process.env.NEXT_PUBLIC_TOKEN,
				},
				body: JSON.stringify({
					user_id: user_id,
					type: 'archive',
				}),
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

		const checklist = await res.json();
		const archive = await res_2.json();
		const overview = await overview_res.json();

		if (
			res.ok &&
			checklist.ResponseCode === 1 &&
			res_2.ok &&
			archive.ResponseCode === 1 &&
			overview_res.ok &&
			overview
		) {
			return {
				checklist: checklist,
				archive: archive,
				success: checklist.ResponseMsg,
				response: checklist.ResponseCode,
				overview: overview,
			};
		} else {
			return {
				error: "Couldn't get data",
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Find Businesses" };
	}
};

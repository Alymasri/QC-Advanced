import axios from 'axios';
import {
	AdminActionSchema,
	UserActionSchema,
	AddActionCommentSchema,
} from '@/schemas';
import FormData from 'form-data';

export const addAction = async (values, id) => {
	const validatedFields = AdminActionSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();

	formData.append('title', values.title);
	formData.append('desc', values.desc);
	formData.append('priority', values.priority);
	formData.append('due_date', values.due_date);
	formData.append('assignee_id', values.assignee_id);
	formData.append('to_do_list', values.to_do_list);

	formData.append('business_id', values.business_id);
	formData.append('user_id', id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/addAction`,
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
				return {
					success: data.ResponseMsg,
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

export const updateAction = async (values, id, action_id) => {
	const validatedFields = AdminActionSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();

	formData.append('title', values.title);
	formData.append('desc', values.desc);
	formData.append('priority', values.priority);
	formData.append('due_date', values.due_date);
	formData.append('assignee_id', values.assignee_id);
	formData.append('to_do_list', values.to_do_list);

	formData.append('business_id', values.business_id);
	formData.append('action_id', action_id);
	formData.append('user_id', id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateAction`,
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
				return {
					success: 'Action Updated Successfully',
					data: data,
				};
			} else {
				return {
					error: 'Action Update Failed',
				};
			}
		}
	} catch (error) {
		// console.log(error);
		return { error: 'Network Error, Please Try Again' };
	}
};

export const addActionActivity = async (values, user_id, action_id) => {
	const validatedFields = AddActionCommentSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();

	formData.append('msg', values.msg);
	if (values.media) {
		formData.append('media', values.media);
	}

	formData.append('action_id', action_id);
	formData.append('user_id', user_id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/leaveComment`,
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
				return {
					success: data.ResponseMsg,
					data: data,
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

// ! USER
// ! USER
// ! USER
// ! USER
// ! USER
export const addActionUser = async (values, id) => {
	const validatedFields = UserActionSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();

	formData.append('title', values.title);
	formData.append('desc', values.desc);
	formData.append('priority', values.priority);
	formData.append('due_date', values.due_date);
	formData.append('assignee_id', values.assignee_id);
	formData.append('to_do_list', values.to_do_list);

	formData.append('user_id', id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/addAction`,
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
				return {
					success: data.ResponseMsg,
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

export const updateActionUser = async (values, id, action_id) => {
	const validatedFields = UserActionSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

	const formData = new FormData();

	formData.append('title', values.title);
	formData.append('desc', values.desc);
	formData.append('priority', values.priority);
	formData.append('due_date', values.due_date);
	formData.append('assignee_id', values.assignee_id);
	formData.append('to_do_list', values.to_do_list);

	formData.append('business_id', values.business_id);
	formData.append('action_id', action_id);
	formData.append('user_id', id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateAction`,
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
				return {
					success: 'Action Updated Successfully',
					data: data,
				};
			} else {
				return {
					error: 'Action Update Failed',
				};
			}
		}
	} catch (error) {
		// console.log(error);
		return { error: 'Network Error, Please Try Again' };
	}
};

// export const addActionActivity = async (values, user_id, action_id) => {
// 	const validatedFields = AddActionCommentSchema.parse(values);

// 	if (!validatedFields) {
// 		return { error: 'Invalid Fields!' };
// 	}

// 	const formData = new FormData();

// 	formData.append('msg', values.msg);
// 	if (values.media) {
// 		formData.append('media', values.media);
// 	}

// 	formData.append('action_id', action_id);
// 	formData.append('user_id', user_id);

// 	try {
// 		const { data } = await axios.post(
// 			`${process.env.NEXT_PUBLIC_BASE_URL}/api/leaveComment`,
// 			formData,
// 			{
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 					Accept: 'application/json',
// 					key: process.env.NEXT_PUBLIC_KEY,
// 					token: process.env.NEXT_PUBLIC_TOKEN,
// 				},
// 			}
// 		);

// 		if (data) {
// 			if (data.ResponseCode === 1) {
// 				return {
// 					success: data.ResponseMsg,
// 					data: data,
// 					response: data.ResponseCode,
// 				};
// 			} else {
// 				return {
// 					error: data.ResponseMsg,
// 				};
// 			}
// 		}
// 	} catch (error) {
// 		// console.log(error);
// 		return { error: 'Network Error, Please Try Again' };
// 	}
// };

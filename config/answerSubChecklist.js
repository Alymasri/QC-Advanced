import axios from 'axios';
import FormData from 'form-data';

export const answerSubChecklistQuestion = async (user_id, bsc_id, answer) => {
	const formData = new FormData();

	formData.append('user_id', user_id);
	formData.append('bsc_id', bsc_id);
	formData.append('answer', answer);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/subChecklistAnswerSubmit`,
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

export const addSubChecklistNote = async (user_id, bsc_id, note) => {
	const formData = new FormData();

	formData.append('user_id', user_id);
	formData.append('bsc_id', bsc_id);
	formData.append('notes', note.notes);
	formData.append('follow_up', note.follow_up);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/addOrUpdateNotes`,
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

export const addSubChecklistAction = async (user_id, bsc_id, values) => {
	const formData = new FormData();

	formData.append('user_id', user_id);
	formData.append('bsc_id', bsc_id);
	formData.append('title', values.title);
	formData.append('desc', values.desc);
	formData.append('priority', values.priority);
	formData.append('due_date', values.due_date);
	formData.append('assignee_id', values.assignee_id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/addSubchecklistAction`,
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

export const addSubChecklistMedia = async (user_id, bsc_id, media) => {
	const formData = new FormData();

	formData.append('user_id', user_id);
	formData.append('bsc_id', bsc_id);

	media.map((val) => formData.append('media[]', val));

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/addSubchecklistPhoto`,
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
					data: data,
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

export const deleteSubChecklistMedia = async (user_id, scmm_id) => {
	const formData = new FormData();

	formData.append('user_id', user_id);
	formData.append('scmm_id', scmm_id);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/deletePhoto`,
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
					data: data,
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

'use server';
import axios from 'axios';
import FormData from 'form-data';

export const getOTP = async (values) => {
	const formData = new FormData();
	formData.append('email', values.email);
	formData.append('ccode', values.ccode);
	formData.append('phone', values.phone);
	formData.append('business_name', values.business_name);
	formData.append('user_type', 'admin');

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendOTP`,
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

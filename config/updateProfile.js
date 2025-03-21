import axios from 'axios';
import { RegisterSchema } from '@/schemas';
import FormData from 'form-data';
import md5 from 'md5';

export const updateProfile = async (values, user_id, user_type) => {
	const formData = new FormData();

	formData.append('profile', values.profile);
	formData.append('fname', values.fname);
	formData.append('lname', values.lname);
	formData.append('email', values.email);
	formData.append('address', values.address);
	formData.append('ccode', values.ccode);
	formData.append('phone', values.phone);
	formData.append('business_name', values.business_name);
	formData.append('business_type_id', values.business_type_id);
	formData.append('user_id', user_id);
	formData.append('user_type', user_type);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateProfile`,
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

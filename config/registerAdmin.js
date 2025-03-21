import axios from 'axios';
import { RegisterSchema } from '@/schemas';
import FormData from 'form-data';
import md5 from 'md5';

export const registerAdmin = async (values, otp) => {
	const validatedFields = RegisterSchema.parse(values);

	if (!validatedFields) {
		return { error: 'Invalid Fields!' };
	}

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
	formData.append('password', md5(values.password));
	formData.append('otp', otp);
	formData.append('user_type', 'admin');

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/signUp`,
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
					business_id: data.data.business_id,
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

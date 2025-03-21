'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import md5 from 'md5';

export const changePassword = async (values) => {
	const session = await getServerSession(options);
	const user_id = session?.user?.id;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/changePassword`,
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
					old_pass: md5(values.old_pass),
					new_pass: md5(values.new_pass),
				}),
			}
		);

		const changedPass = await res.json();
		// console.log(changedPass);

		if (res.ok && changedPass.ResponseCode === 1) {
			return {
				success: 'Password successfully changed',
				response: changedPass.ResponseCode,
			};
		} else {
			return {
				error: changedPass.ResponseMsg,
			};
		}
	} catch (error) {
		return { errorMsg: "Couldn't Access Database" };
	}
};

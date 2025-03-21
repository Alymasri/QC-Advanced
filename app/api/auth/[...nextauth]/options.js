import CredentialsProvider from 'next-auth/providers/credentials';
import md5 from 'md5';

export const options = {
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'email',
				},
				password: {
					label: 'password',
					type: 'password',
					placeholder: 'password',
				},
				user_type: {
					label: 'type',
					type: 'text',
					placeholder: 'admin/user',
				},
			},
			async authorize(credentials, req) {
				try {
					// const { email, password, user_type } = credentials;

					if (credentials.user_type === 'admin') {
						credentials.password = md5(credentials.password);
					}

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Accept: 'application/json',
								key: process.env.NEXT_PUBLIC_KEY,
							},
							body: JSON.stringify(credentials),
						}
					);

					const user = await res.json();
					// console.log(credentials);

					if (res.ok && user) {
						if (user?.ResponseCode === 1) {
							let userRole = '';
							let name = '';
							let subscribedUser = false;

							// console.log(user);
							if (user?.data?.user_type === 'admin') {
								userRole = 'admin';
								name = user?.data?.fname + ' ' + user?.data?.lname;
							} else if (user?.data?.user_type === 'user') {
								userRole = 'user';
								name = user?.data?.username;
							} else {
								userRole = 'user';
								name = user?.data?.username;
							}

							// if (user?.data?.is_subscription === '1') {
							// 	subscribedUser = true;
							// } else {
							// 	subscribedUser = false;
							// }

							return {
								...user,
								id: user?.data?.user_id,
								email: user?.data?.email,
								name: name,
								image: user?.data?.profile,
								role: userRole,
								// subscribed: subscribedUser,
							};
						} else {
							// console.log(user.ResponseMsg);
						}
					}
					return null;
				} catch (error) {
					// console.log('error:', error);
				}
			},
		}),
	],
	session: { strategy: 'jwt' },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.image = user.image;
				// // token.subscribed = user.subscribed;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.role = token.role;
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.image;
				// // session.user.subscribed = token.subscribed;
			}
			return session;
		},
	},
};

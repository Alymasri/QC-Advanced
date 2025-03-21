'use client';

import { Suspense } from 'react';
import { Loading } from '@/components';
import SignIn from '@/containers/SignIn';

export default function SigningIn() {
	return (
		<Suspense fallback={<Loading notFull />}>
			<SignIn />
		</Suspense>
	);
}

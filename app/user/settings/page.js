'use client';

import { Suspense } from 'react';
import UserSettings from '@/containers/UserSettings';

export default function Settings() {
	return (
		<Suspense>
			<UserSettings />
		</Suspense>
	);
}

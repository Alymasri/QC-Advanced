'use client';

import { Suspense } from 'react';
import AdminSettings from '@/containers/AdminSettings';

export default function Settings() {
	return (
		<Suspense>
			<AdminSettings />
		</Suspense>
	);
}

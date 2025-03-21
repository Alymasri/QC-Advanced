import localFont from 'next/font/local';

import { AuthProvider } from '@/components';

import 'react-day-picker/style.css';
import './globals.css';

const helix = localFont({ src: '../assets/fonts/Hellix-Regular.woff' });

export const metadata = {
	title: 'Choose Login Type | QC Authentication',
	description: 'Choose what role you want to login as',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={helix.className}>
				<AuthProvider>
					<div className="h-full">{children}</div>
				</AuthProvider>
			</body>
		</html>
	);
}

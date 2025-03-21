import Image from 'next/image';
import Link from 'next/link';

import { images } from '@/constants';
import { Navbar, Footer } from '@/components';

export const metadata = {
	title: 'QC Advanced | Quality Growth Solution in Single Platform.',
	description: 'Elevating Quality in Every Bite',
};

export default function LandingLayout({ children }) {
	return (
		<div className="relative w-full">
			<div className="relative">{children}</div>
			<Navbar />
			<Footer />
		</div>
	);
}

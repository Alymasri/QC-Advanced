'use client';
import Image from 'next/image';
import Link from 'next/link';

import { AuthAbout } from '../../../../components';

export default function AboutAdminApp() {
	return (
		<AuthAbout
			title="About Us"
			subheading="Introducing QC Advanced"
			text={[
				'Your Premier Quality Control Solution for Hospitality Management, Tailored for Any Type of Restaurant.',
				'QC Advanced sets a new standard in quality control, designed specifically for the diverse needs of restaurants, ranging from fine dining establishments to fast-casual eateries.',
				'With our cutting-edge app, you gain access to advanced features meticulously crafted to elevate your restaurant’s standards and guest satisfaction. Whether you operate a high-end dining experience or a quick-service establishment, QC Advanced empowers managers to maintain excellence across every aspect of their operations.',
				'From comprehensive cleanliness inspections to seamless service quality assessments, QC Advanced provides customizable checklists, real-time reporting, and intuitive analytics. Identify areas for improvement and take proactive measures to enhance the guest experience, regardless of your restaurant’s style or concept.',
				'Experience the future of quality control in restaurant management with QC Advanced. Elevate your standards, exceed expectations, and ensure your establishment stands out as a beacon of excellence in the culinary landscape, no matter the type of restaurant you operate.',
			]}
			link="/auth/admin/admin-access"
			linkText="OK"
		/>
	);
}

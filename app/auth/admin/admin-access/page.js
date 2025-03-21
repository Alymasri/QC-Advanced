'use client';
import Image from 'next/image';
import Link from 'next/link';

import { AuthAbout } from '../../../../components';

export default function AboutAdminAccess() {
	return (
		<AuthAbout
			title="Admin Access"
			subheading="How to use the app as an Admin:"
			text={[
				'As an admin using QC Advanced, follow these steps to effectively utilize the app:',
				'1.	Setup and Configuration: Begin by setting up your account and configuring the app to align with your restaurant’s specific needs and standards. This may include customizing inspection checklists, defining user roles and permissions, and configuring notification preferences.',
				'2.	Schedule Inspections: Plan and schedule regular inspections for various areas of your restaurant, such as kitchen cleanliness, dining area maintenance, and staff performance. Use the app to assign inspectors and set inspection dates and times.',
				'3.	Conduct Inspections: Inspectors can use the app to conduct inspections according to the predefined checklists. They can document findings, take photos if necessary, and rate the condition or performance of each area or aspect being inspected.',
				'4.	Review Inspection Reports: As an admin, you can review inspection reports in real-time. Analyze the data to identify trends, areas of improvement, and potential issues that need to be addressed. Use the app’s analytics features to gain insights into overall performance and compliance with quality standards.',
				'	5.	Take Action: Based on the findings from inspection reports, take appropriate actions to address any deficiencies or areas needing improvement. Assign tasks to relevant staff members, schedule follow-up inspections, or implement corrective measures as needed.',
				'	6.	Track Progress: Continuously monitor progress and track improvements over time using the app’s reporting and analytics tools. Keep stakeholders informed of progress and ensure that quality standards are consistently met.',
				'	7.	Training and Communication: Utilize the app to provide training materials and resources to staff members, communicate important updates or changes in procedures, and foster a culture of accountability and continuous improvement.',
				'By following these steps, you can effectively use QC Advanced as an admin to maintain high standards of quality and ensure the success of your restaurant.',
			]}
			link="/auth/admin/register"
			// link="/api/auth/signin?callbackUrl=/admin"
			linkText="OK"
		/>
	);
}

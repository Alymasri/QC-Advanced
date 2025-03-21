import React from 'react';

const data = [
	{
		title: 'Privacy Policy',
		text: 'Lorem ipsum dolor sit amet consectetur. Aliquet ipsum molestie tellus lacus pellentesque fermentum nisl suscipit. Pulvinar feugiat hac a fringilla. Tellus.',
	},
	{
		title: 'Personal Information We Collect',
		text: 'Lorem ipsum dolor sit amet consectetur. Aliquet ipsum molestie tellus lacus pellentesque fermentum nisl suscipit. Pulvinar feugiat hac a fringilla. Tellus. Lorem ipsum dolor sit amet consectetur. Aliquet ipsum molestie tellus lacus pellentesque fermentum nisl suscipit. Pulvinar feugiat hac a fringilla. Tellus. Lorem ipsum dolor sit amet consectetur. Aliquet ipsum molestie tellus lacus pellentesque fermentum nisl suscipit. Pulvinar feugiat hac a fringilla. Tellus. Aliquet ipsum molestie tellus lacus pellentesque fermentum nisl suscipit. Pulvinar feugiat hac a fringilla. Tellus.',
	},
];

const PrivacyPolicy = () => {
	return (
		<div className="space-y-5">
			{data.map(({ title, text }, i) => (
				<div key={i} className="space-y-1">
					<h2>{title}</h2>
					<p>{text}</p>
				</div>
			))}
		</div>
	);
};

export default PrivacyPolicy;

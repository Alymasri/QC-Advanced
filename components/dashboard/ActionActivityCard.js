'use client';

import { useState } from 'react';
import Image from 'next/image';

const ActionActivityCard = ({ title, createdBy, msg, date, img }) => {
	const [dateVal, setDateVal] = useState(new Date(date).toLocaleString());
	return (
		<div className="slide-animated-children bg-[--card] rounded-lg p-5 w-full text-start hover:scale-105 transition duration-500">
			<div className="flex gap-5">
				{img && (
					<Image
						width={120}
						height={120}
						src={img}
						alt={title}
						className="object-cover min-w-[100px] max-w-[100px] w-full h-full max-h-[90px] rounded-lg"
					/>
				)}
				<div className="space-y-2 w-full">
					<h3 className="capitalize">{title}</h3>
					<div
						className={`flex flex-col gap-1 ${
							img ? 'items-start' : 'items-end'
						}`}
					>
						<p>
							{createdBy ? createdBy : 'You'} {msg}{' '}
						</p>
						<p>{dateVal}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActionActivityCard;

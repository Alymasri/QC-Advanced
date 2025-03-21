'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdArrowOutward } from 'react-icons/md';

import { icons } from '../../constants';

const ActionCard = ({
	title,
	time,
	assignee,
	tag,
	onClick,
	admin,
	businessName,
	businessId,
	due_date,
}) => {
	const [remainder, setRemainder] = useState('');
	useEffect(() => {
		let due = new Date(due_date);
		let now = new Date();

		let diff = due.valueOf() - now.valueOf();
		// of two dates
		let diff_time = due.getTime() - now.getTime();
		let diff_mins = Math.round(diff_time / (1000 * 60));
		let diff_hours = Math.round(diff_time / (1000 * 3600));
		let diff_days = Math.round(diff_time / (1000 * 3600 * 24));
		let diff_months = Math.round(diff_time / (1000 * 3600 * 24 * 30));

		if (diff_months > 0) {
			setRemainder(diff_months + ' month(s) left');
		} else if (diff_days > 0) {
			setRemainder(diff_days + ' day(s) left');
		} else if (diff_hours > 0) {
			setRemainder(diff_hours + ' hour(s) left');
		} else if (diff_mins > 0) {
			setRemainder(diff_mins + ' minute(s) left');
		} else {
			setRemainder('exceeded due date');
		}

		// console.log(diff_days);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [due_date]);

	return (
		<button
			onClick={onClick}
			className="w-full p-4 lg:p-5 bg-[--card] border-[--card-border] rounded-lg text-left space-y-[0.3rem] lg:space-y-2 hover:shadow-md "
		>
			<h3 className="flex gap-2 w-full truncate">
				<span className="truncate">{title}</span>{' '}
				{admin && businessName && (
					<span className="truncate">| {businessName}</span>
				)}
			</h3>
			<p
				className={
					remainder === 'exceeded due date' ? 'text-[--brand]' : 'text-[--text]'
				}
			>
				{remainder}
			</p>
			<div className="flex justify-between w-full">
				<p className="w-full truncate flex-1">Assigned to {assignee}</p>
				<span className="bg-[--tag] text-[--text] px-3 py-[6px] rounded-md mt-[-5px] text-xs lg:text-sm">
					{tag}
				</span>
			</div>
		</button>
	);
};

export default ActionCard;

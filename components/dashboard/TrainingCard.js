import React from 'react';
import Image from 'next/image';

import { icons } from '../../constants';

const TrainingCard = ({ title, text, onClick, admin, edit, remove }) => {
	return admin ? (
		<button className="bg-[--card] rounded-lg p-5 w-full text-start cursor-default flex flex-col gap-2">
			<div className="flex-v-center justify-between w-full">
				<div
					onClick={onClick}
					className="flex-center !justify-start cursor-pointer group"
				>
					<Image
						src={icons.docs}
						w={20}
						h={20}
						alt="mail"
						className="input-img scale-125"
					/>
					<h3
						className={'group-hover:text-[--brand] transition duration-700'}
						// onClick={onClick}
					>
						{title}
					</h3>
				</div>
				{admin && (
					<div className="flex-v-center !gap-[6px]">
						<Image
							src={icons.edit}
							w={20}
							h={20}
							alt="mail"
							className="input-img scale-110 cursor-pointer hover:scale-150 transition duration-700"
							onClick={edit}
						/>
						<Image
							src={icons.deleteRed}
							w={20}
							h={20}
							alt="mail"
							className="input-img scale-110 cursor-pointer hover:scale-150 transition duration-700"
							onClick={remove}
						/>
					</div>
				)}
			</div>
			<p>{text}</p>
		</button>
	) : (
		<button
			onClick={onClick}
			className="bg-[--card] rounded-lg p-5 space-y-2 w-full text-start"
		>
			<div className="flex-center !justify-start">
				<Image
					src={icons.docs}
					w={20}
					h={20}
					alt="mail"
					className="input-img scale-125"
				/>
				<h3 className="">{title}</h3>
			</div>
			<p>{text}</p>
		</button>
	);
};

export default TrainingCard;

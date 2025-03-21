import React from 'react';
import { LinkButton } from '@/components';

const TextButtonCard = ({ title, text, button }) => {
	return (
		<div className="bg-[--card] rounded-xl p-5 md:p-8 flex-center flex-col !gap-7 h-full">
			<div className="flex-center flex-col !gap-5 max-w-[350px]">
				<h2 className="text-center">{title}</h2>
				<p className="text-center">{text}</p>
				<div className="min-w-[150px] pt-3">
					<LinkButton
						text={button[0]}
						link={button[1]}
						className="btn-1-v2 !py-[0.55rem]"
					/>
				</div>
			</div>
		</div>
	);
};

export default TextButtonCard;

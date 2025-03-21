import React from 'react';
import Image from 'next/image';

const IconBox = ({ text, icon, makeSmaller }) => {
	return (
		<div className="flex-v-center !gap-2 md:!gap-3">
			<div
				className={`w-[25px] min-w-[25px] h-[25px] md:w-[40px] md:min-w-[40px] rounded-md md:h-[40px] flex-center bg-[--card]`}
			>
				<Image
					src={icon}
					alt={text}
					width={40}
					height={40}
					className={`input-img scale-[0.65] md:scale-100 ${
						makeSmaller && 'p-[2px]'
					}`}
				/>
			</div>
			<h3 className="text-[4vw] md:text-base">{text}</h3>
		</div>
	);
};

export default IconBox;

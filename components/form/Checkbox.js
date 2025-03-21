import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Checkbox = ({ toggle, toggled }) => {
	return (
		<button
			type="button"
			onClick={() => toggle((prev) => !prev)}
			className={`min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px] w-[25px] h-[25px] border-2  ${
				toggled
					? 'bg-[--highlight-bg-4] border-[--highlight-bg-4]'
					: 'border-[--gray]'
			} flex-center rounded-md`}
		>
			<FaCheck
				className={`!text-[10px] text-[--brand] ${
					toggled ? 'block' : 'hidden'
				}`}
			/>
		</button>
	);
};

export default Checkbox;

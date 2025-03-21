'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { icons } from '../../constants';
import { TitlePopupWrapper } from '../../wrappers';

const SelectInput = ({
	icon,
	label,
	placeholder,
	options,
	values,
	valueName,
	setFormData,
	formData,
	colors,
	darkBg,
	edit,
}) => {
	const [showOptions, setShowOptions] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [selectedOption, setSelectedOption] = useState(
		placeholder ? placeholder : options[0]
	);

	const errorRef = useRef();

	// set value of select option to initial value
	useEffect(() => {
		if (!placeholder) {
			setFormData({
				...formData,
				[valueName]: values ? values[0] : options[0],
			});
		}
	}, []);

	const selectOption = (i) => {
		setSelectedId(i);
		setSelectedOption(options[i]);
		setFormData({
			...formData,
			[valueName]: values ? values[i] : options[i],
		});
		setShowOptions(false);
	};

	return (
		<div className="slide-animated-children input-block !space-y-0 flex flex-col gap-2">
			<label className="">{label}</label>
			<button
				className="icon-input flex-v-center w-full !text-left "
				onClick={() => setShowOptions(true)}
			>
				<div className="flex-v-center w-full flex-1">
					{icon && (
						<Image src={icon} w={20} h={20} alt="mail" className="input-img" />
					)}
					<p
						type="text"
						placeholder="Business Type"
						style={
							colors
								? {
										color: colors[selectedId],
								  }
								: {
										color: 'inherit',
								  }
						}
						className={'input truncate w-full max-w-[200px]'}
					>
						{selectedOption}
					</p>
				</div>
				<Image
					src={icons.caret}
					w={20}
					h={20}
					alt="mail"
					className="input-img p-1"
				/>
			</button>
			{options.length === 0 && (
				<motion.p
					animate={{ scale: [1.1, 1] }}
					transition={{ type: 'spring' }}
					ref={errorRef}
					className="text-xs text-[--text] -mt-1"
				>
					You have no {label} assigned to this business*
				</motion.p>
			)}
			{options.length > 0 && showOptions && (
				<TitlePopupWrapper
					darkBg={darkBg}
					options
					close={() => setShowOptions(false)}
				>
					<div className="bg-[--card] border border-[--border] rounded-2xl flex flex-col w-full overflow-hidden">
						{options.map((option, i) => (
							<button
								key={i}
								className="options-btn group"
								onClick={() => selectOption(i)}
							>
								<span
									style={colors ? { color: colors[i] } : { color: '' }}
									className="group-hover:scale-110 group-hover:text-[--brand] inline-block transition duration-700"
								>
									{option}
								</span>
							</button>
						))}
					</div>
				</TitlePopupWrapper>
			)}
		</div>
	);
};

export default SelectInput;

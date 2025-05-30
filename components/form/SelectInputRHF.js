'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { icons } from '../../constants';
import { TitlePopupWrapper } from '../../wrappers';

const SelectInputRHF = ({
	icon,
	label,
	placeholder,
	options,
	rhf,
	setValue,
	name,
	error,
	colors,
	darkBg,
	businessList,
	defaultValue,
}) => {
	const [showOptions, setShowOptions] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [selectedOption, setSelectedOption] = useState(
		placeholder
			? placeholder
			: defaultValue
			? options.filter((option) => {
					return option.business_id === defaultValue;
			  })[0]
			: options[0]
	);

	const selectRef = useRef(null);

	const selectOption = (e, i, value) => {
		// e.preventDefault();
		setSelectedId(i);
		setSelectedOption(options[i]);
		setShowOptions(false);
		if (value) {
			setValue(name, value);
		} else {
			// console.log(options[i]);
			setValue(name, options[i]);
		}
	};

	return (
		<div className="slide-animated-children input-block !space-y-0 flex flex-col gap-2">
			<input
				id={label}
				{...rhf}
				defaultValue={businessList ? selectedOption.business_id : options[0]}
				className="hidden"
			/>

			<label className="">{label}</label>
			<button
				type="button"
				className="icon-input flex-v-center w-full !text-left relative"
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
						{businessList ? selectedOption.business_name : selectedOption}
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
			{showOptions && (
				<TitlePopupWrapper
					darkBg={darkBg}
					options
					close={() => setShowOptions(false)}
				>
					<div className="bg-[--card] border border-[--border] rounded-2xl flex flex-col w-full overflow-hidden">
						{options.map((option, i) => (
							<button
								type="button"
								key={i}
								className="options-btn group"
								onClick={(e) =>
									selectOption(e, i, businessList && option.business_id)
								}
							>
								<span
									style={colors ? { color: colors[i] } : { color: '' }}
									className="group-hover:scale-110 group-hover:text-[--brand] inline-block transition duration-700"
								>
									{businessList ? option.business_name : option}
								</span>
							</button>
						))}
					</div>
				</TitlePopupWrapper>
			)}
			{error && <p className="text-[--brand] text-xs">{error}*</p>}
		</div>
	);
};

export default SelectInputRHF;

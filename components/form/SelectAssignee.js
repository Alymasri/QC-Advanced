'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { icons } from '../../constants';
import { TitlePopupWrapper } from '../../wrappers';

const SelectAssignee = ({
	icon,
	label,
	options,
	rhf,
	setValue,
	name,
	error,
	colors,
	darkBg,
	defaultValue,
}) => {
	const [showOptions, setShowOptions] = useState(false);
	`Since getInvitees include also the admin's id, set a condition to check if the first item of the list has a username (which basically means its and admin), if it does, skip it and move to the next ite on the list`;

	const [selectedOption, setSelectedOption] = useState(
		defaultValue
			? options.filter((option) => {
					return option.user_id === defaultValue;
			  }).length > 0
				? options.filter((option) => {
						return option.user_id === defaultValue;
				  })[0].username
				: options[0].username
			: options[0].username
	);
	const [selectedId, setSelectedId] = useState(
		defaultValue
			? options.filter((option) => {
					return option.user_id === defaultValue;
			  }).length > 0
				? options.indexOf(
						options.filter((option) => {
							return option.user_id === defaultValue;
						})[0]
				  )
				: 0
			: 0
	);

	const selectRef = useRef(null);
	// console.log(
	// 	options.indexOf(
	// 		options.filter((option) => {
	// 			return option.user_id === defaultValue;
	// 		})[0]
	// 	)
	// );

	const setVals = () => {
		if (defaultValue) {
			if (
				options.filter((option) => {
					return option.user_id === defaultValue;
				}).length > 0
			) {
				// console.log('Ok');
				setSelectedOption(
					options.filter((option) => {
						return option.user_id === defaultValue;
					})[0].username
				);
				setSelectedId(
					options.indexOf(
						options.filter((option) => {
							return option.user_id === defaultValue;
						})[0]
					)
				);
			} else {
				setSelectedOption(options[0].username);
				setSelectedId(0);
			}
		} else {
			setSelectedOption(options[0].username);
			setSelectedId(0);
		}
		setValue(name, options[selectedId].user_id);
		setSelectedOption(options[selectedId].username);
	};
	useEffect(() => {
		setVals();
	}, [options]);

	useEffect(() => {
		setVals();
		setValue(name, options[selectedId].user_id);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const selectOption = (e, i, value) => {
		// e.preventDefault();
		setSelectedId(i);
		setSelectedOption(options[i].username);
		setShowOptions(false);
		setValue(name, value);
	};

	return (
		<div className="slide-animated-children input-block !space-y-0 flex flex-col gap-2">
			<input
				id={label}
				{...rhf}
				defaultValue={defaultValue ? defaultValue : options[selectedId].user_id}
				className="hidden"
			/>

			<label className="">{label}</label>
			<button
				type="button"
				className="icon-input flex-v-center w-full !text-left relative"
				onClick={() => {
					if (selectedOption) {
						setShowOptions(true);
					}
				}}
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
						className={'input truncate w-full max-w-[200px] capitalize'}
					>
						{selectedOption ? selectedOption : 'No Assignee for this Business'}
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
					{options.length > 0 ? (
						<div className="bg-[--card] border border-[--border] rounded-2xl flex flex-col w-full overflow-hidden">
							{options.map((option, i) => (
								<button
									type="button"
									key={i}
									className="options-btn group"
									onClick={(e) => selectOption(e, i, option.user_id)}
								>
									<span
										style={colors ? { color: colors[i] } : { color: '' }}
										className="group-hover:scale-110 group-hover:text-[--brand] inline-block transition duration-700"
									>
										{option.username}
									</span>
								</button>
							))}
						</div>
					) : (
						<div className="bg-[--card] border border-[--border] rounded-2xl w-full overflow-hidden p-5 md:p7-6 flex flex-col gap-2">
							<span>There are no Assignees Assigned to this business.</span>
							<Link href="/admin" className="!inline text-[--brand]">
								Add Assignees to the business in the Dashboard.
							</Link>
						</div>
					)}
				</TitlePopupWrapper>
			)}
			{error && <p className="text-[--brand] text-xs">{error}*</p>}
		</div>
	);
};

export default SelectAssignee;

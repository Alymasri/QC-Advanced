'use client';

import { useState } from 'react';
import Image from 'next/image';

const InputFieldRHF = ({
	icon,
	label,
	type,
	defaultTextarea,
	placeholder,
	additionalClassName,
	rhf,
	error,
	defaultValue,
	landing,
}) => {
	return (
		<div
			className={`slide-animated-children space-y-[5px] ${
				additionalClassName ? additionalClassName : ''
			}`}
		>
			<div className={`input-block `}>
				<div className="flex">
					<label
						className={
							!landing && error
								? 'text-[--brand]'
								: landing
								? 'text-[--white]'
								: ''
						}
					>
						{label}
					</label>
					{/* {error && (
						<p className="text-[--brand] inline pl-2 text-xs">{error}*</p>
					)} */}
				</div>
				{type === 'textarea' ? (
					<div
						className={
							defaultTextarea
								? ''
								: ` ${landing ? 'icon-input-2' : 'icon-input'} !items-start`
						}
					>
						{icon && (
							<Image
								src={icon}
								w={20}
								h={20}
								alt={label}
								className="input-img"
							/>
						)}
						<textarea
							defaultValue={defaultValue ? defaultValue : ''}
							placeholder={placeholder}
							{...rhf}
							className={
								defaultTextarea
									? ''
									: `textarea ${
											landing
												? '!text-[--white] placeholder:!text-white/50'
												: ''
									  }`
							}
						/>
					</div>
				) : (
					<div
						className={`${landing ? 'icon-input-2' : 'icon-input'}  ${
							!landing && error
								? 'rin ring-[--outline] !borde !border-[--white] !bg-[--border]'
								: ''
						} `}
					>
						{icon && (
							<Image
								src={icon}
								w={20}
								h={20}
								alt={label}
								className="input-img"
							/>
						)}
						<input
							type={type ? type : 'text'}
							placeholder={placeholder}
							defaultValue={defaultValue ? defaultValue : ''}
							{...rhf}
							className={`input ${
								landing ? '!text-[--white] placeholder:!text-white/50' : ''
							}`}
						/>
					</div>
				)}
			</div>
			{error && <p className="text-[--brand] text-xs">{error}*</p>}
		</div>
	);
};

export default InputFieldRHF;

'use client';

import { useState } from 'react';
import Image from 'next/image';

const InputField = ({
	icon,
	label,
	type,
	placeholder,
	formData,
	setFormData,
	nameValue,
	defaultValue,
	additionalClassName,
}) => {
	const [value] = useState('');
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<div
			className={`slide-animated-children input-block ${
				additionalClassName ? additionalClassName : ''
			}`}
		>
			<label>{label}</label>
			{type === 'textarea' ? (
				<div className="icon-input !items-start">
					{icon && (
						<Image
							src={icon}
							w={20}
							h={20}
							alt={nameValue}
							className="input-img"
						/>
					)}
					<textarea
						name={nameValue}
						placeholder={placeholder}
						onChange={handleChangeInput}
						className="textarea"
					/>
				</div>
			) : (
				<div className="icon-input">
					{icon && (
						<Image
							src={icon}
							w={20}
							h={20}
							alt={nameValue}
							className="input-img"
						/>
					)}
					<input
						type={type ? type : 'text'}
						name={nameValue}
						defaultValue={defaultValue}
						placeholder={placeholder}
						onChange={handleChangeInput}
						className="input"
					/>
				</div>
			)}
		</div>
	);
};

export default InputField;

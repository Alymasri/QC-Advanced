'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

import { images, icons } from '../../constants';

const EditProfileImage = ({ rhf, error, setValue, name, defaultValue }) => {
	const [image, setImage] = useState(defaultValue ? defaultValue : null);
	const inputRef = useRef();

	const onImageChange = async (event) => {
		if (event.target.files && event.target.files) {
			const file = event.target.files[0];
			setImage(URL.createObjectURL(file));

			if (file) {
				setValue(name, file);
			}
		}
	};

	return (
		<div
			className={`popup-animated-children bg-white w-[100px] md:w-[110px] h-[100px] md:h-[110px] rounded-full flex items-center justify-center border-[5px] border-[--gray] mb-[-50px] md:mb-[-55px] z-1 relative`}
		>
			<div
				className={`w-full h-full object-cover rounded-full overflow-hidden`}
			>
				<Image
					src={image ? image : images.bg}
					alt="logo"
					width={110}
					height={110}
					className={`w-full h-full object-cover`}
				/>
			</div>

			<input
				ref={inputRef}
				type="file"
				name={name}
				multiple={false}
				accept=".png,.jpg,.jpeg"
				className="absolute top-0 left-0 w-[200%] hidden"
				onChange={onImageChange}
			/>
			<input
				type="file"
				name={name}
				multiple={false}
				accept=".png,.jpg,.jpeg"
				className="absolute top-0 left-0 w-[200%] hidden"
				{...rhf}
			/>
			<button
				onClick={() => inputRef.current.click()}
				className="absolute bottom-0 right-0 rounded-full !w-[35px] h-[35px] bg-[--card] flex-center translate-x-[5px]"
			>
				<Image
					src={images.noting}
					w={20}
					h={20}
					alt="mail"
					className="input-img"
				/>
			</button>
		</div>
	);
};

export default EditProfileImage;

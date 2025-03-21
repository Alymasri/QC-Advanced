'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';
import { FaPlay } from 'react-icons/fa';

import { icons } from '../../constants';

const MiniAddMedia = ({ close, single, formData, setFormData, valueName }) => {
	const [uploadedImages, setUploadedImages] = useState(formData[valueName]);
	const [takingScreenShot, setTakingScreenShot] = useState(false);
	const inputRef = useRef();

	const removeImage = (i) => {
		let res = [...uploadedImages];
		let removed = res.splice(i, 1);
		setUploadedImages(res);
		setFormData({ ...formData, [valueName]: res });
		// console.log('Upload Images', uploadedImages);
	};

	// Webcam Functions
	const videoConstraints = {
		facingMode: 'both',
	};
	const containerRef = useRef();
	const webcamRef = useRef(null);
	const takeScreenshot = useCallback(
		() => {
			const imageSrc = webcamRef.current.getScreenshot();
			let uploads = [...uploadedImages];
			if (single) {
				uploads = imageSrc;
			} else {
				uploads.push(imageSrc);
			}
			setUploadedImages(uploads);
			setTakingScreenShot(false);
			setFormData({ ...formData, [valueName]: uploads });
			close();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[webcamRef]
	);

	// On click on Gallery
	const onImageChange = (event) => {
		let uploads = [...uploadedImages];
		if (event.target.files) {
			if (single) {
				uploads = URL.createObjectURL(event.target.files[0]);
			} else {
				for (let i = 0; i < event.target.files.length; i++) {
					uploads.push(URL.createObjectURL(event.target.files[i]));
				}
			}
			setUploadedImages(uploads);
			setFormData({ ...formData, [valueName]: uploads });
			close();
		}
	};

	// Minimize when click on mothing
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setTakingScreenShot(false);
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return (
		<div className="grid grid-cols-2 gap-3 lg:gap-4">
			<button
				className="w-full bg-[--card] rounded-xl flex-center flex-col p-3 !gap-1 min-h-[100px]"
				onClick={() => setTakingScreenShot(true)}
			>
				<Image src={icons.camera} alt="camera" />
				<p className="text-[--black] !font-medium">Camera</p>
			</button>
			<button
				onClick={() => inputRef.current.click()}
				className="w-full bg-[--card] rounded-xl flex-center flex-col p-3 !gap-1 min-h-[100px]"
			>
				<input
					ref={inputRef}
					type="file"
					multiple={!single}
					accept=".png,.jpg,.jpeg"
					className="absolute top-0 left-0 w-[200%] hidden"
					onChange={onImageChange}
				/>
				<Image src={icons.gallery} alt="gallery" />
				<p className="text-[--black] !font-medium">Gallery</p>
			</button>

			{/* {uploadedImages && (
				<div className="grid grid-cols-3 w-[300px] bg-white absolute top-0 left-0 gap-2">
					{uploadedImages.map((img, i) => (
						<Image
							key={i}
							src={img}
							width={100}
							height={100}
							alt="gallery"
							className="w-full h-[90px] bg-[--card]"
						/>
					))}
				</div>
			)} */}

			{takingScreenShot && (
				<div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-[--black] backdrop-blur-sm p-4 md:p-7 flex-center">
					<div ref={containerRef} className="lg:relative">
						<Webcam
							audio={false}
							screenshotFormat="image/jpeg"
							ref={webcamRef}
							// width={720}
							// height={1024}
							videoConstraints={videoConstraints}
						>
							{({ getScreenshot }) => (
								<div className="absolute bottom-0 left-0 flex-center w-full p-5">
									<button
										className="!bg-[--brand] rounded-full !w-[50px] lg:!w-[60px] h-[50px] lg:h-[60px] flex-center shadow-xl shadow-[--highlight-bg-2] hover:scale-125 transition duration-700"
										onClick={() => takeScreenshot()}
									>
										<FaPlay className="text-[--white] ml-1 lg:text-xl" />
									</button>
								</div>
							)}
						</Webcam>
					</div>
				</div>
			)}
		</div>
	);
};

export default MiniAddMedia;

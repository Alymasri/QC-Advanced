'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';

import { FaPlay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdFlipCameraAndroid } from 'react-icons/md';

import { icons } from '../../constants';

const AddSingle = ({ rhf, setValue, name, close, setImageName }) => {
	const [takingScreenShot, setTakingScreenShot] = useState(false);
	const [facingMode, setFacingMode] = useState('user');
	const inputRef = useRef();

	// Webcam Functions
	const videoConstraints = {
		facingMode: facingMode,
	};
	const containerRef = useRef();
	const toggleRef = useRef();
	const webcamRef = useRef(null);

	const toggleFacingMode = () => {
		if (facingMode === 'user') {
			setFacingMode('environment');
		} else {
			setFacingMode('user');
		}
	};

	const converterDataURItoBlob = (dataURI) => {
		let byteString;
		let mimeString;
		let ia;

		if (dataURI.split(',')[0].indexOf('base64') >= 0) {
			byteString = atob(dataURI.split(',')[1]);
		} else {
			byteString = encodeURI(dataURI.split(',')[1]);
		}
		// separate out the mime component
		mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ia], { type: mimeString });
	};

	const takeScreenshot = useCallback(
		() => {
			const imageSrc = webcamRef.current.getScreenshot();
			const blob = converterDataURItoBlob(imageSrc);
			const file = new File([blob], 'temp.jpg', {
				type: 'image/jpeg',
				lastModified: Date.now(),
			});

			// console.log(file);

			if (blob && file) {
				setValue(name, file);
				setTakingScreenShot(false);
			}

			if (setImageName) {
				setImageName('New Snapshot');
			}

			close();
			// setTakingScreenShot(false);
			// setValue(name, imageSrc);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[webcamRef]
	);

	// On click on Gallery
	const onImageChange = async (event) => {
		// event.preventDefault();
		if (event.target.files && event.target.files) {
			const file = event.target.files[0];

			if (file) {
				setValue(name, file);
			}
			if (setImageName) {
				setImageName(file.name);
			}
			close();

			// console.log(imageData.file);
		}
	};

	// Minimize when click on mothing
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target) &&
				toggleRef.current &&
				!toggleRef.current.contains(event.target)
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
				type="button"
				onClick={(e) => {
					// e.preventDefault();
					inputRef.current.click();
				}}
				className="w-full bg-[--card] rounded-xl flex-center flex-col p-3 !gap-1 min-h-[100px]"
			>
				<input
					ref={inputRef}
					type="file"
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
				<Image src={icons.gallery} alt="gallery" />
				<p className="text-[--black] !font-medium">Gallery</p>
			</button>

			{takingScreenShot && (
				<div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-[--black] backdrop-blur-sm flex-center">
					<div ref={containerRef} className="lg:relative">
						<Webcam
							audio={false}
							screenshotFormat="image/jpeg"
							ref={webcamRef}
							width={720}
							height={1024}
							videoConstraints={videoConstraints}
						>
							{({ getScreenshot }) => (
								<div className="absolute bottom-5 left-0 flex-center w-full p-5">
									<button
										className="!bg-[--brand-50] rounded-full !w-[65px] lg:!w-[70px] h-[65px] lg:h-[70px] flex-center shadow-xl shadow-[--highlight-bg-2] hover:scale-125 transition duration-700 p-4"
										onClick={() => takeScreenshot()}
									>
										<div className="!bg-[--brand] rounded-full !w-full !h-full flex-center shadow-xl shadow-[--highlight-bg-2] hover:scale-125 transition duration-700" />
									</button>
								</div>
							)}
						</Webcam>
					</div>
					<button
						type="button"
						className="absolute top-4 md:top-5 right-4 md:right-5 p-3 bg-black/50 back backdrop-blur rounded-full"
						onClick={() => setTakingScreenShot()}
					>
						<IoMdClose className="text-[--white] lg:text-xl" />
					</button>
					<button
						ref={toggleRef}
						type="button"
						className="absolute top-4 md:top-5 left-4 md:left-5 p-3 bg-black/50 back backdrop-blur rounded-full"
						onClick={() => toggleFacingMode()}
					>
						<MdFlipCameraAndroid className="text-[--white] lg:text-xl" />
					</button>
				</div>
			)}
		</div>
	);
};

const MiniAddMedia = ({ rhf, setValue, name, close, single, setImageName }) => {
	const [uploadedImages, setUploadedImages] = useState([]);
	const [takingScreenShot, setTakingScreenShot] = useState(false);
	const inputRef = useRef();

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
			setUploadedImages(uploads[0]);
			setTakingScreenShot(false);
			setValue(name, uploads[0]);

			close();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[webcamRef]
	);

	// On click on Gallery
	const onImageChange = (event) => {
		let uploads = [...uploadedImages];
		if (event.target.files && event.target.files[0]) {
			// console.log(event.target.files[0]);
			// setImage(URL.createObjectURL(event.target.files[0]));
			setValue(name, event.target.files[0]);
			// console.log(image);
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

	return single ? (
		<AddSingle
			rhf={rhf}
			setValue={setValue}
			name={name}
			close={close}
			setImageName={setImageName}
		/>
	) : (
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
				<Image src={icons.gallery} alt="gallery" />
				<p className="text-[--black] !font-medium">Gallery</p>
			</button>

			{takingScreenShot && (
				<div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-[--black] backdrop-blur-sm p-4 md:p-7 flex-center">
					{/* <div ref={containerRef} className="lg:relative">
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
					</div> */}
				</div>
			)}
		</div>
	);
};

export default MiniAddMedia;

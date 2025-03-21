'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';

import { FaPlay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdFlipCameraAndroid } from 'react-icons/md';

import { icons } from '../../constants';
import { FormError, FormSuccess } from '../../components';

import { addSubChecklistMedia } from '@/config/answerSubChecklist';

const MiniAddMediaSubchecklist = ({
	close,
	userId,
	bsc_id,
	index,
	inspectionData,
	setInspectionData,
}) => {
	const [facingMode, setFacingMode] = useState('user');
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [uploadedImages, setUploadedImages] = useState([]);
	const [takingScreenShot, setTakingScreenShot] = useState(false);
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
			setFacingMode({ exact: 'environment' });
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

	const uploadMedia = (uploads, display) => {
		setError('');
		setIsPending(true);

		// console.log(display);

		addSubChecklistMedia(userId, bsc_id, uploads).then((data) => {
			setIsPending(false);
			setError(data.error);
			setSuccess(data.success);

			if (data.response) {
				let newInspectionData = [...inspectionData];
				newInspectionData[index].media_list = data?.data?.data;
				setInspectionData(newInspectionData);

				setTimeout(() => {
					close();
				}, 1000);
			} else {
				setError(index, data.error);
			}
		});
	};

	const takeScreenshot = useCallback(
		() => {
			let uploads = [];
			let displayImages = [];

			const imageSrc = webcamRef.current.getScreenshot();
			const blob = converterDataURItoBlob(imageSrc);
			const file = new File([blob], 'temp.jpg', {
				type: 'image/jpeg',
				lastModified: Date.now(),
			});

			uploads.push(file);
			displayImages.push(URL.createObjectURL(file));

			uploadMedia(uploads, displayImages);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[webcamRef]
	);

	// On click on Gallery
	const onImageChange = (event) => {
		let uploads = [];
		let displayImages = [];
		if (event.target.files) {
			for (let i = 0; i < event.target.files.length; i++) {
				uploads.push(event.target.files[i]);
				displayImages.push(URL.createObjectURL(event.target.files[i]));
			}

			uploadMedia(uploads, displayImages);
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
		<div
			className={`grid grid-cols-2 gap-3 lg:gap-4 ${
				isPending && 'pointer-events-none'
			}`}
		>
			{inspectionData[index].media_upload_type !== 'gallery' && (
				<button
					className="w-full bg-[--card] rounded-xl flex-center flex-col p-3 !gap-1 min-h-[100px]"
					onClick={() => setTakingScreenShot(true)}
				>
					<Image src={icons.camera} alt="camera" />
					<p className="text-[--black] !font-medium">Camera</p>
				</button>
			)}
			{inspectionData[index].media_upload_type !== 'camera' && (
				<button
					onClick={() => inputRef.current.click()}
					className="w-full bg-[--card] rounded-xl flex-center flex-col p-3 !gap-1 min-h-[100px]"
				>
					<input
						ref={inputRef}
						type="file"
						multiple
						accept=".png,.jpg,.jpeg"
						className="absolute top-0 left-0 w-[200%] hidden"
						onChange={onImageChange}
					/>
					{/* <input
					type="file"
					multiple={false}
					accept=".png,.jpg,.jpeg"
					className="absolute top-0 left-0 w-[200%] hidden"
					
				/> */}
					<Image src={icons.gallery} alt="gallery" />
					<p className="text-[--black] !font-medium">Gallery</p>
				</button>
			)}

			<div className="col-span-2">
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
			</div>

			{takingScreenShot && (
				<div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-[--black] backdrop-blur-sm p-4 md:p-7 flex-center">
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

export default MiniAddMediaSubchecklist;

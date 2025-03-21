// 'use client';

import Image from 'next/image';
import { images } from '@/constants';

const TrainingDetails = ({ img, text }) => {
	return (
		<div className="h-full w-full py-5 px-4 lg:p-7 space-y-5">
			<div className="bg-[--card] rounded-xl">
				<Image
					src={img}
					width={400}
					height={300}
					alt="mail"
					className="w-full h-[200px] object-cover rounded-xl bg-[--card]"
				/>
			</div>
			<div className="space-y-4">
				{text?.split('\r\n').map((p, i) => (
					<p key={i}>{p}</p>
				))}
				{/* <p>{text}</p> */}
			</div>
			<div className="popup-pb" />
		</div>
	);
};

export default TrainingDetails;

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import TimePicker from 'react-time-picker';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Mousewheel } from 'swiper/modules';

import 'react-time-picker/dist/TimePicker.css';

import { icons } from '../../constants';
import { TitlePopupWrapper } from '../../wrappers';
import { Tabs, SelectInput } from '../../components';

const DatePicker = ({ setDate }) => {
	const defaultClassNames = getDefaultClassNames();
	const [selected, setSelected] = useState();

	useEffect(() => {
		if (selected) {
			setDate(
				selected.toLocaleDateString(undefined, {
					// weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})
			);
			// console.log(selected.toLocaleDateString());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);
	// console.log(defaultClassNames);

	return (
		<>
			{/* <style>{css}</style> */}
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={setSelected}
				showOutsideDays
				classNames={{
					today: `text-[--brand]`, // Add a border to today's date
					selected: `bg-[--brand-50] rounded-lg border-[--brand] text-[--brand]`, // Highlight the selected day
					root: `${defaultClassNames.root} !w-full p-0 !text-sm sm:!text-sm !h-[300px]`, // Add a shadow to the root element
					chevron: `${defaultClassNames.chevron} !fill-[--brand] !h-[20px] hover:scale-125 transition duration-700`, // Change the color of the chevron
					day_button: `!w-[20px] transition duration-700 hover:text-[--brand] hover:drop-shadow-md`,
					month_caption: `${defaultClassNames.month_caption} !text-lg sm:!text-md md:!text-lg !font-semibold`,
					weekday: `${defaultClassNames.weekday} !text-[--grey] !text-xs !font-regular`,
					outside: `text-[--grey]`,
				}}
				//   footer={
				//     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
				//   }
			/>
		</>
	);
};

const TimePickerTab = ({ time, setTime }) => {
	const [selected, setSelected] = useState('00:00');

	useEffect(() => {
		// console.log(time);
		if (selected) {
			// console.log(selected);
		}
	}, [selected]);

	return (
		<div className="w-full">
			<div className="flex-center w-full">
				<TimePicker
					onChange={setSelected}
					value={selected}
					format="hh:mm a"
					minDetail="hour"
					maxDetail="hour"
					clearIcon={null}
					clockIcon={null}
				/>
			</div>
		</div>
	);
};

const DateTimePicker = ({ label, valueName, setFormData, formData }) => {
	const [showSelector, setShowSelector] = useState(true);
	const [activeTab, setActiveTab] = useState(0);
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTime, setSelectedTime] = useState('00:00:00');

	const selectOption = (i) => {
		setFormData((prev) => ({
			...prev,
			[valueName]: selectedDate,
		}));
		setShowSelector(false);
	};

	return (
		<div>
			<div className="input-block">
				<label>{label}</label>
				<button
					className="icon-input block w-full"
					onClick={() => setShowSelector(true)}
				>
					{/* <input
						type="text"
						name="dueDate"
						placeholder="dueDate"
						value={dueDate}
						onChange={handleChangeInput}
						className="input placeholder:capitalize"
					/> */}

					<p className="w-full text-left">{selectedDate}</p>
					<Image
						src={icons.calendar}
						w={20}
						h={20}
						alt="mail"
						className="input-img !p-0"
					/>
				</button>
			</div>

			{showSelector && (
				<TitlePopupWrapper options close={() => setShowSelector(false)}>
					<div className="flex-center">
						<div className="bg-[--white] rounded-[--rounding] p-4 md:p-5 flex flex-col gap-1 max-w-[310px]">
							<div className=" border-b border-[--border] pb-3">
								<Tabs
									tabs={['Date', 'Time']}
									active={activeTab}
									onClick={setActiveTab}
								/>
							</div>
							<div className="w-full overflow-hidden">
								{activeTab === 0 ? (
									<DatePicker setDate={setSelectedDate} />
								) : (
									<TimePickerTab
										time={selectedTime}
										setTime={setSelectedTime}
									/>
								)}
							</div>
							<div className=" border-t border-[--border] pt-3">
								<div className="w-full grid grid-cols-2 gap-4 lg:gap-5">
									<button className="btn-2">cancel</button>
									<button className="btn-1">create</button>
								</div>
							</div>
						</div>
					</div>
				</TitlePopupWrapper>
			)}
		</div>
	);
};

export default DateTimePicker;

const OTPInput = ({
	id,
	previousId,
	nextId,
	value,
	onValueChange,
	handleSubmit,
}) => {
	//This callback function only runs when a key is released
	const handleKeyUp = (e) => {
		if (e.keyCode === 8 || e.keyCode === 37) {
			//find the previous element
			const prev = document.getElementById(previousId);
			if (prev) {
				prev.select();
			}
		} else if (
			(e.keyCode >= 48 && e.keyCode <= 57) || //check if key is numeric keys 0 to 9
			// (e.keyCode >= 65 && e.keyCode <= 90) || //check if key is alphabetical keys A to Z
			(e.keyCode >= 96 && e.keyCode <= 105) || //check if key is numeric keypad keys 0 to 9
			e.keyCode === 39 //check if key is right arrow key
		) {
			//find the next element
			const next = document.getElementById(nextId);
			if (next) {
				next.select();
			} else {
				const inputGroup = document.getElementById('OTPInputGroup');
				if (inputGroup && inputGroup.dataset['autosubmit']) {
					handleSubmit();
				}
			}
		} else if (e.keyCode >= 65 && e.keyCode <= 90) {
			return null;
		}
	};
	return (
		<input
			id={id}
			name={id}
			type="number"
			className="bg-[--card] w-full h-[50px] md:h-[60px] rounded-xl text-center text-lg md:text-xl font-semibold"
			value={value}
			pattern="[0-9]"
			maxLength="1"
			onChange={(e) => onValueChange(id, e.target.value)}
			onKeyUp={handleKeyUp}
		/>
	);
};

export default OTPInput;

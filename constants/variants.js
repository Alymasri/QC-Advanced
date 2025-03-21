// UESED BY MOBILE NAV LINKS
export const slideInBottom = {
	initial: { opacity: 0, x: 50, y: 50 },
	animate: {
		opacity: 1,
		x: [50, 0],
		y: [50, 0],
		transition: {
			type: 'spring',
			stiffness: 500,
			damping: 85,
		},
	},
	exit: {
		opacity: 0,
		x: [0, 10],
		y: [0, 10],
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 25,
		},
	},
};

// UESED BY SECTION BLOCKS
export const slideInBottom2 = {
	initial: { opacity: 0, y: 50 },
	animate: {
		opacity: 1,
		// x: [50, 0],
		y: [50, 0],
		transition: {
			type: 'spring',
			stiffness: 500,
			damping: 85,
		},
	},
	exit: {
		opacity: 0,
		// x: [0, 10],
		y: [0, 50],
		transition: {
			type: 'spring',
			duration: 0.5,
		},
	},
};

//
export const slideInRight = {
	initial: {
		opacity: 0,
		x: 50,
	},
	animate: {
		opacity: [0, 1],
		x: [50, 0],
		transition: { type: 'spring', duration: 1, bounce: 0.5 },
	},
	exit: {
		opacity: 0,
		x: 50,
		transition: { type: 'spring', duration: 1, bounce: 0.5 },
	},
};

// USED BY HERO IMAGES
export const popIn = {
	initial: { scale: 0 },
	animate: {
		scale: [0, 1.5, 1],
		transition: {
			type: 'spring',
			stiffness: 500,
			damping: 85,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 25,
		},
	},
};

// USED BY BUTTONS
export const buttonClick = {
	tap: { scale: 0.9 },
	hover: {
		scale: 1.05,
		transition: {
			type: 'spring',
			duration: 1,
			bounce: 0.8,
		},
	},
};

export default { buttonClick, popIn, slideInBottom, slideInBottom2 };

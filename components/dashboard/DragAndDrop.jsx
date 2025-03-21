'use client';

/* eslint-disable */
import React from 'react';
import { createRoot } from 'react-dom/client';
import Uppy, { UIPlugin } from '@uppy/core';
// import Tus from '@uppy/tus';
import Webcam from '@uppy/webcam';
import { Dashboard, useUppyState } from '@uppy/react';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';

// Custom plugin example inside React
// class MyPlugin {
// //   container!: HTMLElement

//   constructor (uppy, opts) {
//     super(uppy, opts)
//     this.type = 'acquirer'
//     this.id = this.opts.id || 'TEST'
//     this.title = 'Test'
//   }

//   override install() {
//     const { target } = this.opts
//     if (target) {
//       this.mount(target, this)
//     }
//   }

//   override uninstall() {
//     this.unmount()
//   }

//   override render(state: State<M, B>, container: HTMLElement) {
//     // Important: during the initial render is not defined. Safely return.
//     if (!container) return
//     createRoot(container).render(
//       <h2>React component inside Uppy's Preact UI</h2>,
//     )
//   }
// }

const metaFields = [
	{ id: 'license', name: 'License', placeholder: 'specify license' },
];

function createUppy() {
	return (
		new Uppy({ restrictions: { requiredMetaFields: ['license'] } })
			// .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
			.use(Webcam)
	);
	// .use(MyPlugin)
}

export default function App() {
	const [uppy] = React.useState(createUppy);

	const fileCount = useUppyState(
		uppy,
		(state) => Object.keys(state.files).length
	);
	const totalProgress = useUppyState(uppy, (state) => state.totalProgress);

	const plugins = useUppyState(uppy, (state) => state.plugins);

	return (
		<>
			<p>File count: {fileCount}</p>
			<p>Total progress: {totalProgress}</p>
			<Dashboard uppy={uppy} metaFields={metaFields} />
		</>
	);
}

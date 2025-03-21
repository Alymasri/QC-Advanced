'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';

const LoadingFailed = () => {
	const router = useRouter();
	return (
		<div className="containe bg-[--card]">
			<div className="grid min-h-screen py-[50px] px-4 place-content-center">
				<div className="flex-center flex-col gap-5 container">
					<h1 className="font-black text-[--gray] text-8xl md:text-9xl">404</h1>

					<h2 className="">Data fetch Failed</h2>

					<p className="">We were unable to fetch your data from the server.</p>

					<div className="mt-3">
						<Button
							onClick={() => router.refresh()}
							text="Refresh"
							className="btn-1-v2"
						/>
					</div>
				</div>
			</div>
		</div>
		// <div className="w-full h-screen flex-center bg-[--white] flex-col">
		// 	<h3>Page Load Failed</h3>
		// 	<button onClick={() => router.refresh()} className="btn-2">
		// 		Reload Page
		// 	</button>
		// </div>
	);
};

export default LoadingFailed;

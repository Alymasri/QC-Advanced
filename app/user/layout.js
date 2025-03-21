import Image from 'next/image';
import { images } from '../../constants';
import { DashboardSideNav, MobileBottomNav } from '../../components';

export const metadata = {
	title: 'User Dashboard',
	description: 'QC Advanced User Dashboard',
};

export default function UserLayout({ children }) {
	return (
		<div className="relative w-full flex items-center justify-center bg-pattern bg-cover bg-fixed">
			<div className="w-full min-h-screen !z-10">
				<div className="md:ml-[250px] relative h-screen overflow-x-clip overflow-y-auto">
					{children}
				</div>
				<div className="hidden md:block fixed top-0 left-0 h-full w-[250px] bg-[--white]">
					<DashboardSideNav type="user" />
				</div>
				<div className="md:hidden fixed bottom-0 left-0 h-[70px] w-full bg-[--white] border-t border-[--gray]">
					<MobileBottomNav type="user" />
				</div>
			</div>
		</div>
	);
}

import Image from 'next/image';
import { images } from '../../constants';
import { DashboardSideNav, MobileBottomNav } from '../../components';

export const metadata = {
	title: 'Admin Dashboard',
	description: 'QC Advanced Admin Dashboard',
};

export default function AdminLayout({ children }) {
	return (
		<div className="relative w-full flex items-center justify-center bg-pattern bg-cover bg-fixed">
			<div className="relative w-full min-h-screen !z-10">
				<div className="md:ml-[250px] relative h-screen overflow-x-clip overflow-y-auto">
					{children}
				</div>
				<div className="hidden md:block fixed top-0 left-0 h-screen w-[250px] bg-[--white]">
					<DashboardSideNav type="admin" />
				</div>
				<div className="md:hidden fixed bottom-0 left-0 h-[70px] w-full bg-[--white] border-t border-[--gray]">
					<MobileBottomNav type="admin" />
				</div>
			</div>
		</div>
	);
}

import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';

interface DashboardIndexProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardIndex() {
	return <h1>Dashboard</h1>;
}

const getServerSideProps: GetServerSideProps<DashboardIndexProps> =
	async () => {
		return {
			props: {
				hasSidebar: true,
				sidebarLinks: [
					{
						icon: 'profile',
						color: 'blue',
						label: 'Profilo',
						href: '/dashboard',
					},
				],
			},
		};
	};

export { getServerSideProps };

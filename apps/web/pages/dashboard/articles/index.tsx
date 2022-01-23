import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';

interface DashboardArticlesIndexProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardArticlesIndex() {
	return <h1>Articoli pubblicati</h1>;
}

const getServerSideProps: GetServerSideProps<DashboardArticlesIndexProps> =
	async () => {
		return {
			props: {
				hasSidebar: true,
				sidebarLinks: [
					{
						icon: 'back',
						color: 'transparent',
						label: 'Torna indietro',
						href: '/dashboard',
					},
					{
						icon: 'list',
						color: 'teal',
						label: 'Articoli pubblicati',
						href: '/dashboard/articles',
					},
					{
						icon: 'write',
						color: 'teal',
						label: 'Nuovo articolo',
						href: '/dashboard/articles/new',
					},
				],
			},
		};
	};

export { getServerSideProps };

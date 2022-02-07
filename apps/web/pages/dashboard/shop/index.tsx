import { WrapperLinkProps } from 'components/wrapper/types';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import PageTitle from 'components/head/PageTitle';
import { getSession } from 'next-auth/react';

interface DashboardShopIndexProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardShopIndex() {
	return (
		<>
			<PageTitle>Sessioni di vendita | Dashboard</PageTitle>

			<h1>Sessioni di vendita</h1>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<DashboardShopIndexProps> =
	async (ctx) => {
		const session = await getSession(ctx);

		return {
			props: {
				session,
				sidebarLinks: SHOP_LINKS,
				hasSidebar: true,
			},
		};
	};

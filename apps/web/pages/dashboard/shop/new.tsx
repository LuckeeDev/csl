import { WrapperLinkProps } from 'components/wrapper/types';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import PageTitle from 'components/head/PageTitle';
import { getSession } from 'next-auth/react';

interface DashboardShopNewProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardShopNew() {
	return (
		<>
			<PageTitle>Nuova session | Dashboard</PageTitle>

			<h1>Nuova sessione</h1>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<DashboardShopNewProps> =
	async (ctx) => {
		const session = await getSession(ctx);

		return {
			props: {
				// return the session to allow instant display in client
				session,
				sidebarLinks: SHOP_LINKS,
				hasSidebar: true,
			},
		};
	};

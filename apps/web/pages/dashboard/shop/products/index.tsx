import PageTitle from 'components/head/PageTitle';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { BasePageProps } from 'types/pages';

export default function DashboardShopProducts() {
	return (
		<>
			<PageTitle>Prodotti | Dashboard</PageTitle>

			<h1>Prodotti</h1>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<BasePageProps> = async (
	ctx
) => {
	const session = await getSession(ctx);

	return {
		props: {
			session,
			hasSidebar: true,
			sidebarLinks: SHOP_LINKS,
		},
	};
};

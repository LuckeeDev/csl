import { ProductCategory, ShopSession } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ProductForm from 'components/forms/ProductForm';
import PageTitle from 'components/head/PageTitle';
import useProductForm, { ProductFormValues } from 'hooks/useProductForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { BasePageProps } from 'types/pages';

interface DashboardShopProductsNewProps extends BasePageProps {
	shopSessions: ShopSession[];
	productCategories: ProductCategory[];
}

export default function DashboardShopProductsNew({
	shopSessions,
	productCategories,
}: DashboardShopProductsNewProps) {
	const form = useProductForm();

	async function onSubmit(val: ProductFormValues) {
		console.log(val);
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Nuovo prodotto | Dashboard</PageTitle>

			<h1>Nuovo prodotto</h1>

			<ProductForm
				shopSessions={shopSessions}
				productCategories={productCategories}
				form={form}
				onSubmit={onSubmit}
			/>
		</DashboardPageContainer>
	);
}

export const getServerSideProps: GetServerSideProps<BasePageProps> = async (
	ctx
) => {
	const session = await getSession(ctx);

	const shopSessions = await prisma.shopSession.findMany({
		select: { id: true, name: true },
	});

	const productCategories = await prisma.productCategory.findMany({
		select: { id: true, name: true },
	});

	return {
		props: {
			shopSessions,
			productCategories,
			session,
			hasSidebar: true,
			sidebarLinks: SHOP_LINKS,
		},
	};
};

import { LoadingOverlay } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Product, ProductCategory, ShopSession } from '@prisma/client';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ProductForm from 'components/forms/ProductForm';
import PageTitle from 'components/head/PageTitle';
import { environment } from 'environments/environment';
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
	const [overlay, toggleOverlay] = useBooleanToggle(false);

	async function onSubmit(val: ProductFormValues) {
		toggleOverlay();

		console.log(val);

		const { data } = await axios.post<Product>(
			`${environment.url}/api/shop/products`,
			{ product: val },
			{ withCredentials: true }
		);

		console.log(data);

		toggleOverlay();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Nuovo prodotto | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

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

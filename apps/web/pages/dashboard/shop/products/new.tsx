import { LoadingOverlay } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Product, ProductCategory, ShopSession } from '@prisma/client';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ProductForm from 'components/forms/ProductForm';
import PageTitle from 'components/head/PageTitle';
import { environment } from 'environments/environment';
import useProductForm, { ProductFormValues } from 'hooks/forms/useProductForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { CheckIcon } from '@modulz/radix-icons';
import { useNotifications } from '@mantine/notifications';

interface DashboardShopProductsNewProps {
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
}

function DashboardShopProductsNew({
	shopSessions,
	productCategories,
}: DashboardShopProductsNewProps) {
	const form = useProductForm();
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const router = useRouter();
	const notifications = useNotifications();

	async function onSubmit(val: ProductFormValues) {
		toggleOverlay();

		const { data } = await axios.post<Product>(
			`${environment.url}/api/shop/products`,
			{ product: val },
			{ withCredentials: true }
		);

		toggleOverlay();

		notifications.showNotification({
			title: 'Prodotto salvato',
			message: 'Sarà disponibile da subito nella pagina del negozio!',
			icon: <CheckIcon />,
			color: 'teal',
		});

		router.push(`/dashboard/shop/products/${data.id}`);
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

DashboardShopProductsNew.hasSidebar = true;
DashboardShopProductsNew.sidebarLinks = SHOP_LINKS;

export default DashboardShopProductsNew;

export const getServerSideProps: GetServerSideProps<
	DashboardShopProductsNewProps
> = async () => {
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
		},
	};
};

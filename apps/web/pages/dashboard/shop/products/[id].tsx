import { LoadingOverlay } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { Product, ProductCategory, ShopSession } from '@prisma/client';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ProductForm from 'components/forms/ProductForm';
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { environment } from 'environments/environment';
import useProductForm, { ProductFormValues } from 'hooks/useProductForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { useMemo } from 'react';
import { BasePageProps } from 'types/pages';
import { CheckIcon } from '@modulz/radix-icons';

interface DashboardShopProductsEditProps extends BasePageProps {
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
	product: Omit<Product, 'id' | 'updated_at' | 'created_at'>;
}

export default function DashboardShopProductsEdit({
	shopSessions,
	productCategories,
	product,
}: DashboardShopProductsEditProps) {
	const form = useProductForm(product);
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const router = useRouter();
	const productId = useMemo(() => router.query.id as string, [router.query]);
	const notifications = useNotifications();

	async function onSubmit(val: ProductFormValues) {
		toggleOverlay();

		await axios.patch<Product>(
			`${environment.url}/api/shop/products/${productId}`,
			{ product: val },
			{ withCredentials: true }
		);

		notifications.showNotification({
			title: 'Prodotto salvato',
			message: 'Sarà disponibile da subito nella pagina del negozio!',
			icon: <CheckIcon />,
			color: 'teal',
		});

		toggleOverlay();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Modifica prodotto | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

			<BackHeading>Modifica prodotto</BackHeading>

			<ProductForm
				shopSessions={shopSessions}
				productCategories={productCategories}
				form={form}
				onSubmit={onSubmit}
			/>
		</DashboardPageContainer>
	);
}

export const getServerSideProps: GetServerSideProps<DashboardShopProductsEditProps> =
	async (ctx) => {
		const session = await getSession(ctx);

		const id = ctx.params?.id as string;

		const product = await prisma.product.findUnique({
			where: { id },
			select: {
				name: true,
				categoryId: true,
				colors: true,
				description: true,
				price: true,
				shopSessionId: true,
				sizes: true,
			},
		});

		if (!product) {
			return {
				notFound: true,
			};
		}

		product.price = product.price / 100;

		const shopSessions = await prisma.shopSession.findMany({
			select: { id: true, name: true },
		});

		const productCategories = await prisma.productCategory.findMany({
			select: { id: true, name: true },
		});

		return {
			props: {
				product,
				shopSessions,
				productCategories,
				session,
				hasSidebar: true,
				sidebarLinks: SHOP_LINKS,
			},
		};
	};

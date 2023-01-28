import { LoadingOverlay } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
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
import { useMemo } from 'react';
import { IconCheck } from '@tabler/icons';
import { ImageData } from 'types/image';
import PageHeading from 'components/heading/PageHeading';
import { showNotification } from '@mantine/notifications';

interface DashboardShopProductsEditProps {
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
	product: Omit<Product, 'id' | 'updated_at' | 'created_at'> & {
		images: ImageData[];
	};
}

function DashboardShopProductsEdit({
	shopSessions,
	productCategories,
	product,
}: DashboardShopProductsEditProps) {
	const existingImages = product.images;

	const form = useProductForm({
		...product,
		images: product.images.map((image) => image.id),
	});
	const [overlay, toggleOverlay] = useToggle();
	const router = useRouter();
	const productId = useMemo(() => router.query.id as string, [router.query]);

	async function onSubmit(val: ProductFormValues) {
		toggleOverlay();

		await axios.patch<Product>(
			`${environment.url}/api/shop/products/${productId}`,
			{ product: val },
			{ withCredentials: true }
		);

		showNotification({
			title: 'Prodotto salvato',
			message: 'Sarà disponibile da subito nella pagina del negozio!',
			icon: <IconCheck />,
			color: 'teal',
		});

		toggleOverlay();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Modifica prodotto | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

			<PageHeading back>Modifica prodotto</PageHeading>

			<ProductForm
				existingImages={existingImages}
				shopSessions={shopSessions}
				productCategories={productCategories}
				form={form}
				onSubmit={onSubmit}
			/>
		</DashboardPageContainer>
	);
}

DashboardShopProductsEdit.hasSidebar = true;
DashboardShopProductsEdit.sidebarLinks = SHOP_LINKS;

export default DashboardShopProductsEdit;

export const getServerSideProps: GetServerSideProps<
	DashboardShopProductsEditProps
> = async (ctx) => {
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
			images: {
				select: {
					id: true,
					name: true,
					type: true,
					url: true,
					nativeHeight: true,
					nativeWidth: true,
				},
			},
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
		},
	};
};

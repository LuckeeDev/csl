import { MediaQuery, Text } from '@mantine/core';
import { Image, Order, Product } from '@prisma/client';
import axios from 'axios';
import Carousel from 'components/carousel/Carousel';
import FallbackPage from 'components/fallback/FallbackPage';
import OrderForm from 'components/forms/OrderForm';
import { environment } from 'environments/environment';
import useOrderForm, { OrderFormValues } from 'hooks/useOrderForm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { OmitDates } from 'types/omit';

interface ShopProductPageProps {
	product: OmitDates<Product> & { images: OmitDates<Image>[] };
}

export default function ShopProductPage({ product }: ShopProductPageProps) {
	const router = useRouter();
	const form = useOrderForm();

	if (router.isFallback) {
		return <FallbackPage />;
	}

	async function onSubmit(val: OrderFormValues) {
		const { data } = await axios.post<Order>(`${environment.url}/api/orders`, {
			productId: product.id,
			...val,
		});

		console.log(data);
	}

	return (
		<>
			<h1>
				{product.name} - {product.price / 100}€
			</h1>

			{product.description && <Text>{product.description}</Text>}

			<MediaQuery smallerThan="md" styles={{ display: 'none' }}>
				<div style={{ maxWidth: '500px' }}>
					<Carousel images={product.images} />
				</div>
			</MediaQuery>

			<MediaQuery largerThan="md" styles={{ display: 'none' }}>
				<div style={{ maxWidth: '400px' }}>
					<Carousel images={product.images} />
				</div>
			</MediaQuery>

			<OrderForm form={form} onSubmit={onSubmit} product={product} />
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	// Only fetch products for which there's an active shop session
	const products = await prisma.product.findMany({
		where: {
			shopSession: { start: { lte: new Date() }, end: { gte: new Date() } },
		},
	});

	return {
		paths: products.map((p) => `/shop/products/${p.id}`),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ShopProductPageProps> = async (
	ctx
) => {
	const id = ctx.params?.id as string;

	const product = await prisma.product.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			colors: true,
			sizes: true,
			description: true,
			price: true,
			categoryId: true,
			shopSessionId: true,
			images: {
				select: {
					id: true,
					name: true,
					type: true,
					url: true,
				},
			},
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			shopSession: {
				select: {
					id: true,
					end: true,
					start: true,
				},
			},
		},
	});

	// Return not found if the product does not exist or if the session has ended
	if (
		!product ||
		product.shopSession.end.getTime() < new Date().getTime() ||
		product.shopSession.start.getTime() > new Date().getTime()
	) {
		return {
			notFound: true,
		};
	}

	const { shopSession, ...savedProduct } = product;

	return {
		props: {
			product: savedProduct,
		},
	};
};

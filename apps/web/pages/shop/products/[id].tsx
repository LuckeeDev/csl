import { Image, Product } from '@prisma/client';
import Carousel from 'components/carousel/Carousel';
import FallbackPage from 'components/fallback/FallbackPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { OmitDates } from 'types/omit';

interface ShopProductPageProps {
	product: OmitDates<Product> & { images: OmitDates<Image>[] };
}

export default function ShopProductPage({ product }: ShopProductPageProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <FallbackPage />;
	}

	return (
		<>
			<h1>{product.name}</h1>

			<Carousel images={product.images} />
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

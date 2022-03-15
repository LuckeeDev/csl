import { InputWrapper, MediaQuery, NativeSelect, Text } from '@mantine/core';
import { Image, Product } from '@prisma/client';
import Carousel from 'components/carousel/Carousel';
import FallbackPage from 'components/fallback/FallbackPage';
import ColorChooser from 'components/forms/ColorChooser';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { useState } from 'react';
import { OmitDates } from 'types/omit';

interface ShopProductPageProps {
	product: OmitDates<Product> & { images: OmitDates<Image>[] };
}

export default function ShopProductPage({ product }: ShopProductPageProps) {
	const router = useRouter();
	const [color, setColor] = useState('');
	const [size, setSize] = useState('');

	if (router.isFallback) {
		return <FallbackPage />;
	}

	return (
		<>
			<h1>{product.name}</h1>

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

			{product.colors?.length > 0 && (
				<ColorChooser
					colors={product.colors}
					onChange={setColor}
					value={color}
				/>
			)}

			{product.sizes?.length > 0 && (
				<InputWrapper required label="Seleziona la taglia per questo capo">
					<NativeSelect
						data={product.sizes}
						value={size}
						onChange={(e) => setSize(e.currentTarget.value)}
					/>
				</InputWrapper>
			)}
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

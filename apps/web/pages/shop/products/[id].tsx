import { createStyles, LoadingOverlay, MediaQuery, Text } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { Image, Order, Product } from '@prisma/client';
import axios from 'axios';
import Carousel from 'components/carousel/Carousel';
import FallbackPage from 'components/fallback/FallbackPage';
import OrderForm from 'components/forms/OrderForm';
import PageTitle from 'components/head/PageTitle';
import BackLink from 'components/links/BackLink';
import { environment } from 'environments/environment';
import useOrderForm, { OrderFormValues } from 'hooks/forms/useOrderForm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { OmitDates } from 'types/omit';

interface ShopProductPageProps {
	product: OmitDates<Product> & { images: OmitDates<Image>[] };
}

const useStyles = createStyles((theme) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			flexDirection: 'column',
			justifyContent: 'flex-start',
		},
	},
	child: {
		width: '50%',

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			width: '100%',
		},
	},
}));

export default function ShopProductPage({ product }: ShopProductPageProps) {
	const router = useRouter();
	const form = useOrderForm({
		size: product?.sizes?.length > 0,
		color: product?.colors?.length > 0,
	});
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const { classes } = useStyles();

	if (router.isFallback) {
		return <FallbackPage />;
	}

	async function onSubmit(val: OrderFormValues) {
		try {
			toggleOverlay(true);

			await axios.post<Order>(`${environment.url}/api/orders`, {
				productId: product.id,
				...val,
			});

			showNotification({
				title: 'Prodotto ordinato',
				message: 'Ora lo puoi gestire dal riepilogo degli ordini',
				icon: <CheckIcon />,
				color: 'teal',
			});

			toggleOverlay(false);
		} catch (err) {
			showNotification({
				title: 'Errore',
				message: 'Non è stato possibile creare questo ordine',
				icon: <Cross1Icon />,
				color: 'red',
			});

			toggleOverlay(false);
		}
	}

	return (
		<div style={{ position: 'relative' }}>
			<PageTitle>Negozio | {product.name}</PageTitle>

			<LoadingOverlay visible={overlay} />

			<BackLink>Torna indietro</BackLink>

			<h1 style={{ marginTop: 0 }}>
				{product.name} - {product.price / 100}€
			</h1>

			{product.description && <Text my="xs">{product.description}</Text>}

			<div className={classes.wrapper}>
				{product.images?.length > 0 && (
					<>
						<MediaQuery smallerThan="md" styles={{ display: 'none' }}>
							<div className={classes.child} style={{ maxWidth: '500px' }}>
								<Carousel images={product.images} />
							</div>
						</MediaQuery>
						<MediaQuery largerThan="md" styles={{ display: 'none' }}>
							<div className={classes.child} style={{ maxWidth: '400px' }}>
								<Carousel images={product.images} />
							</div>
						</MediaQuery>{' '}
					</>
				)}

				<OrderForm
					className={classes.child}
					form={form}
					onSubmit={onSubmit}
					product={product}
				/>
			</div>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const now = new Date();

	// Only fetch products for which there's an active shop session
	const products = await prisma.product.findMany({
		where: {
			shopSession: { start: { lte: now }, end: { gte: now } },
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
	const now = new Date();

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
					nativeHeight: true,
					nativeWidth: true,
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

	// Return not found if the product does not exist or if the session is not running
	if (
		!product ||
		product.shopSession.end.getTime() < now.getTime() ||
		product.shopSession.start.getTime() > now.getTime()
	) {
		return {
			notFound: true,
			revalidate: 60,
		};
	}

	const { shopSession, ...savedProduct } = product;

	return {
		props: {
			product: savedProduct,
		},
		revalidate: 60,
	};
};

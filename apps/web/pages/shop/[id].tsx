import {
	Alert,
	Badge,
	Card,
	Image as MantineImage,
	SimpleGrid,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons';
import {
	Image,
	Product,
	ProductCategory,
	ProductDiscount,
} from '@prisma/client';
import FallbackPage from 'components/fallback/FallbackPage';
import BackLink from 'components/links/BackLink';
import ButtonLink from 'components/links/ButtonLink';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { useMemo } from 'react';
import { OmitDates } from 'types/omit';
import { ShopSessionAPIData } from 'types/shopSession';
import generateDiscountsDescription from 'utils/shop/generateDiscountDescription';

interface ShopSessionPageProps {
	shopSession: ShopSessionAPIData & {
		products: (Omit<Product, 'updated_at' | 'created_at'> & {
			images: Omit<Image, 'updated_at' | 'created_at'>[];
			category: OmitDates<ProductCategory>;
		})[];
		discounts: (OmitDates<ProductDiscount> & {
			requiredCategory: { name: string };
			discountedCategory: { name: string };
		})[];
	};
}

export default function ShopSessionPage({ shopSession }: ShopSessionPageProps) {
	const router = useRouter();
	const discountsDescription = useMemo(
		() =>
			shopSession?.discounts
				? generateDiscountsDescription(shopSession.discounts)
				: null,
		[shopSession]
	);

	if (router.isFallback) {
		return <FallbackPage />;
	}

	return (
		<>
			<BackLink>Torna indietro</BackLink>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h1 style={{ margin: 0 }}>{shopSession.name}</h1>

				<ButtonLink
					size="xs"
					variant="light"
					href={`/dashboard/orders/${shopSession.id}`}
				>
					Riepilogo ordini
				</ButtonLink>
			</div>

			{shopSession.discounts?.length > 0 && (
				<Alert
					my="md"
					title="Sconti!"
					variant="outline"
					icon={<IconInfoCircle />}
				>
					{discountsDescription}
				</Alert>
			)}

			<SimpleGrid
				cols={5}
				breakpoints={[
					{ maxWidth: 'lg', cols: 4 },
					{ maxWidth: 'md', cols: 3 },
					{ maxWidth: 'sm', cols: 2 },
					{ maxWidth: 'xs', cols: 1 },
				]}
			>
				{shopSession.products.map((p) => (
					<Link
						href={`/shop/products/${p.id}`}
						passHref
						key={p.id}
						legacyBehavior
					>
						<Card component="a">
							<Card.Section>
								<MantineImage
									width="100%"
									src={p.images[0]?.url ?? null}
									height={300}
									alt={p.name}
									withPlaceholder={p.images.length === 0}
								/>
							</Card.Section>

							<Badge style={{ marginTop: '10px' }}>{p.category.name}</Badge>

							<h2 style={{ margin: '5px 0' }}>{p.name}</h2>
							{p.description && <p>{p.description}</p>}
							<p>{p.price / 100}€</p>
						</Card>
					</Link>
				))}
			</SimpleGrid>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const shopSessions = await prisma.shopSession.findMany();

	return {
		paths: shopSessions.map((s) => `/shop/${s.id}`),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ShopSessionPageProps> = async (
	ctx
) => {
	const id = ctx.params?.id as string;
	const now = new Date();

	const savedShopSession = await prisma.shopSession.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			start: true,
			end: true,
			products: {
				include: {
					images: true,
					category: true,
				},
			},
			discounts: {
				include: {
					requiredCategory: {
						select: {
							name: true,
						},
					},
					discountedCategory: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	});

	if (
		!savedShopSession ||
		savedShopSession.end.getTime() < now.getTime() ||
		savedShopSession.start.getTime() > now.getTime()
	) {
		return {
			notFound: true,
			// revalidate every 60 seconds
			revalidate: 60,
		};
	}

	const shopSession: ShopSessionPageProps['shopSession'] = {
		...savedShopSession,
		start: savedShopSession.start.toISOString(),
		end: savedShopSession.end.toISOString(),
		products: savedShopSession.products.map(
			({
				updated_at,
				created_at,
				images,
				category: {
					updated_at: category_updated_at,
					created_at: category_created_at,
					...category
				},
				...p
			}) => ({
				...p,
				images: images.map(({ updated_at, created_at, ...i }) => i),
				category: category,
			})
		),
		discounts: savedShopSession.discounts.map(
			({ updated_at, created_at, ...p }) => p
		),
	};

	return {
		props: { shopSession },
		// revalidate every 60 seconds
		revalidate: 60,
	};
};

import { Badge, Card, Image as MantineImage, SimpleGrid } from '@mantine/core';
import {
	Image,
	Product,
	ProductCategory,
	ProductDiscount,
} from '@prisma/client';
import FallbackPage from 'components/fallback/FallbackPage';
import BackLink from 'components/links/BackLink';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { OmitDates } from 'types/omit';
import { ShopSessionAPIData } from 'types/shopSession';

interface ShopSessionPageProps {
	shopSession: ShopSessionAPIData & {
		products: (Omit<Product, 'updated_at' | 'created_at'> & {
			images: Omit<Image, 'updated_at' | 'created_at'>[];
			category: OmitDates<ProductCategory>;
		})[];
		discounts: Omit<ProductDiscount, 'updated_at' | 'created_at'>[];
	};
}

export default function ShopSessionPage({ shopSession }: ShopSessionPageProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <FallbackPage />;
	}

	return (
		<>
			<BackLink>Torna indietro</BackLink>

			<h1 style={{ marginTop: 0 }}>{shopSession.name}</h1>

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
					<Link href={`/shop/products/${p.id}`} passHref key={p.id}>
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
			discounts: true,
		},
	});

	if (
		!savedShopSession ||
		savedShopSession.end.getTime() < now.getTime() ||
		savedShopSession.start.getTime() > now.getTime()
	) {
		return {
			notFound: true,
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

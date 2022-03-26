import { Card, SimpleGrid } from '@mantine/core';
import { GetStaticProps } from 'next';
import prisma from 'prisma/client';
import { useMemo } from 'react';
import { SessionStatus, ShopSessionAPIData } from 'types/shopSession';
import Link from 'next/link';
import ShopSessionCardContent from 'components/shopSessions/ShopSessionCardContent';
import getSessionStatus from 'utils/shop/getSessionStatus';

interface ShopIndexProps {
	shopSessions: ShopSessionAPIData[];
}

export default function ShopIndex({
	shopSessions: serverSideShopSessions,
}: ShopIndexProps) {
	const shopSessions = useMemo(
		() =>
			serverSideShopSessions.map(({ start, end, ...s }) => {
				const startDate = new Date(start);
				const endDate = new Date(end);
				const session = { start: startDate, end: endDate, ...s };

				const status = getSessionStatus(session);

				return { status, ...session };
			}),
		[serverSideShopSessions]
	);

	return (
		<div style={{ padding: '0 15px 0 0' }}>
			<h1>Negozio</h1>

			<SimpleGrid
				cols={4}
				breakpoints={[
					{ maxWidth: 980, cols: 3 },
					{ maxWidth: 755, cols: 2 },
					{ maxWidth: 600, cols: 1 },
				]}
			>
				{shopSessions.map((s) =>
					s.status === SessionStatus.ONGOING ? (
						<Link href={`/shop/${s.id}`} passHref key={s.id}>
							<Card p="sm" component={'a'}>
								<ShopSessionCardContent shopSession={s} />
							</Card>
						</Link>
					) : (
						<Card p="sm" key={s.id}>
							<ShopSessionCardContent shopSession={s} />
						</Card>
					)
				)}
			</SimpleGrid>
		</div>
	);
}

export const getStaticProps: GetStaticProps<ShopIndexProps> = async (ctx) => {
	const shopSessions = await prisma.shopSession.findMany({
		orderBy: { start: 'desc' },
	});

	return {
		props: {
			shopSessions: shopSessions.map(
				({ start, end, updated_at, created_at, ...s }) => ({
					start: start.toISOString(),
					end: end.toISOString(),
					...s,
				})
			),
		},
		revalidate: 60,
	};
};

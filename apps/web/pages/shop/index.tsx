import { Badge, Card, SimpleGrid } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useMemo, useRef } from 'react';
import { BasePageProps } from 'types/pages';
import { ShopSessionAPIData } from 'types/shopSession';
import { ClockIcon } from '@modulz/radix-icons';
import Link from 'next/link';

interface ShopIndexProps extends BasePageProps {
	shopSessions: ShopSessionAPIData[];
}

export default function ShopIndex({
	shopSessions: serverSideShopSessions,
}: ShopIndexProps) {
	const now = useRef(new Date());
	const shopSessions = useMemo(
		() =>
			serverSideShopSessions.map(({ start, end, ...s }) => ({
				start: new Date(start),
				end: new Date(end),
				...s,
			})),
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
				{shopSessions.map((s) => (
					<Link href={`/shop/${s.id}`} passHref key={s.id}>
						<Card padding="sm" component="a">
							<div style={{ boxSizing: 'border-box', marginBottom: '10px' }}>
								{now.current.getTime() > s.end.getTime() ? (
									<Badge
										variant="gradient"
										gradient={{ from: 'red', to: 'orange' }}
									>
										Terminata
									</Badge>
								) : now.current.getTime() < s.start.getTime() ? (
									<Badge
										variant="gradient"
										gradient={{ from: 'teal', to: 'blue', deg: 60 }}
									>
										In arrivo
									</Badge>
								) : (
									<Badge
										variant="gradient"
										gradient={{ from: 'teal', to: 'lime', deg: 105 }}
									>
										In corso
									</Badge>
								)}
							</div>

							<h1 style={{ margin: '10px 0' }}>{s.name}</h1>

							<div style={{ display: 'flex', alignItems: 'center' }}>
								<ClockIcon style={{ marginRight: '10px' }} />
								{s.start.toLocaleDateString()} - {s.end.toLocaleDateString()}
							</div>
						</Card>
					</Link>
				))}
			</SimpleGrid>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<ShopIndexProps> = async (
	ctx
) => {
	const session = await getSession(ctx);

	const shopSessions = await prisma.shopSession.findMany({
		orderBy: { start: 'desc' },
	});

	return {
		props: {
			session,
			shopSessions: shopSessions.map(
				({ start, end, updated_at, created_at, ...s }) => ({
					start: start.toISOString(),
					end: end.toISOString(),
					...s,
				})
			),
		},
	};
};

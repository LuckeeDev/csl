import { Card, SimpleGrid } from '@mantine/core';
import { Event } from '@prisma/client';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import PageTitle from 'components/head/PageTitle';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import prisma from 'prisma/client';
import { useMemo } from 'react';
import { OmitDates } from 'types/omit';

interface EventsIndexProps {
	events: (OmitDates<Event> & {
		timeSlots: {
			start: string;
			end: string;
			_count: {
				seminars: number;
			};
		}[];
	})[];
}

export default function EventsIndex({
	events: serverSideEvents,
}: EventsIndexProps) {
	const events = useMemo(
		() =>
			[...serverSideEvents].map((e) => {
				const timeSlots = [...e.timeSlots].map(({ start, end, ...s }) => ({
					...s,
					start: new Date(start),
					end: new Date(end),
				}));

				const firstStart = timeSlots.reduce<Date>((previous, current) => {
					if (previous.getTime() === 0) {
						return current.start;
					}

					const currentTime = current.start.getTime();
					const previousTime = previous.getTime();

					if (currentTime < previousTime) {
						return current.start;
					} else {
						return previous;
					}
				}, new Date(0));

				const lastEnd = timeSlots.reduce<Date>((previous, current) => {
					const currentTime = current.end.getTime();
					const previousTime = previous.getTime();

					if (currentTime > previousTime) {
						return current.end;
					} else {
						return previous;
					}
				}, new Date());

				const seminarsCount = timeSlots.reduce<number>(
					(previous, current) => previous + current._count.seminars,
					0
				);

				return {
					name: e.name,
					id: e.id,
					firstStart,
					lastEnd,
					seminarsCount,
				};
			}),
		[serverSideEvents]
	);

	return (
		<>
			<PageTitle>Eventi</PageTitle>

			<h1>Eventi</h1>

			<SimpleGrid
				cols={{
					sm: 1,
					md: 2,
					lg: 3,
					xl: 4,
				}}
			>
				{events.map((e) => (
					<Link href={`/events/${e.id}`} passHref key={e.id} legacyBehavior>
						<Card p="sm" component={'a'}>
							<h1 style={{ margin: '10px 0' }}>{e.name}</h1>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<IconClock style={{ marginRight: '10px' }} />
								{e.firstStart.toLocaleDateString('it')} -{' '}
								{e.lastEnd.toLocaleDateString('it')}
							</div>

							<div style={{ display: 'flex', alignItems: 'center' }}>
								<IconCalendar style={{ marginRight: '10px' }} />
								{e.seminarsCount} seminari
							</div>
						</Card>
					</Link>
				))}
			</SimpleGrid>
		</>
	);
}

export const getStaticProps: GetStaticProps<EventsIndexProps> = async (ctx) => {
	const events = (
		await prisma.event.findMany({
			include: {
				timeSlots: {
					select: {
						start: true,
						end: true,
						_count: {
							select: {
								seminars: true,
							},
						},
					},
				},
			},
		})
	).map(({ updated_at, created_at, timeSlots, ...e }) => ({
		...e,
		timeSlots: timeSlots.map(({ start, end, ...s }) => ({
			...s,
			start: start.toISOString(),
			end: end.toISOString(),
		})),
	}));

	return {
		props: {
			events,
		},
		revalidate: 60,
	};
};

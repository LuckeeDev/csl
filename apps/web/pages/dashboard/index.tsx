import { Avatar, Group, Text } from '@mantine/core';
import LoaderDiv from 'components/loader/LoaderDiv';
import { WrapperLinkProps } from 'components/wrapper/types';
import { DASHBOARD_LINKS } from 'navigation/dashboard';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

interface DashboardIndexProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardIndex() {
	const { data: session, status } = useSession();

	return (
		<div>
			<h1>Profilo</h1>

			{status === 'loading' ? (
				<LoaderDiv />
			) : (
				<Group>
					<Avatar size="lg" src={session?.user.image ?? undefined} />

					<div style={{ flex: 1 }}>
						<Text size="sm" weight={500}>
							{session?.user.name}
						</Text>
						<Text color="dimmed" size="xs">
							{session?.user.email}
						</Text>
					</div>
				</Group>
			)}
		</div>
	);
}

const getServerSideProps: GetServerSideProps<DashboardIndexProps> =
	async (ctx) => {
		const session = await getSession(ctx);

		return {
			props: {
				// return the session to allow instant display in client
				session,
				hasSidebar: true,
				sidebarLinks: DASHBOARD_LINKS,
			},
		};
	};

export { getServerSideProps };

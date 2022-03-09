import { Avatar, Group, Text } from '@mantine/core';
import LoaderDiv from 'components/loader/LoaderDiv';
import { DASHBOARD_LINKS } from 'navigation/dashboard';
import { useSession } from 'next-auth/react';

function DashboardIndex() {
	const { data: session, status } = useSession();

	return (
		<div>
			<h1>Profilo</h1>

			{status === 'loading' ? (
				<LoaderDiv />
			) : (
				<Group>
					<Avatar
						size="lg"
						src={session?.user.image ?? undefined}
						imageProps={{ referrerPolicy: 'no-referrer' }}
					/>

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

DashboardIndex.hasSidebar = true;
DashboardIndex.sidebarLinks = DASHBOARD_LINKS;

export default DashboardIndex;

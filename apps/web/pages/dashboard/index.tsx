import { Avatar, Group, LoadingOverlay, Text } from '@mantine/core';
import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

interface DashboardIndexProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardIndex() {
	const { data: session, status } = useSession();

	if (!session && status === 'loading') {
		return <LoadingOverlay visible />;
	}

	return (
		<div>
			<h1>Profilo</h1>

			<Group>
				<Avatar size="lg" src={session.user.image} />

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{session.user.name}
					</Text>
					<Text color="dimmed" size="xs">
						{session.user.email}
					</Text>
				</div>
			</Group>
		</div>
	);
}

const getServerSideProps: GetServerSideProps<DashboardIndexProps> =
	async () => {
		return {
			props: {
				hasSidebar: true,
				sidebarLinks: [
					{
						icon: 'profile',
						color: 'blue',
						label: 'Profilo',
						href: '/dashboard',
					},
				],
			},
		};
	};

export { getServerSideProps };

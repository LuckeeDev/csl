import { Avatar, Group, LoadingOverlay, Text } from '@mantine/core';
import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

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

const getServerSideProps: GetServerSideProps<DashboardIndexProps> = async (
	ctx
) => {
	const {
		user: { roles },
	} = await getServerSession(ctx, nextAuthOptions);

	const roleIDs = roles.map((x) => x.id);

	const isEditor = roleIDs.includes('IS_EDITOR');

	const newsLink: WrapperLinkProps = {
		icon: 'write',
		color: 'teal',
		label: 'Articoli',
		href: '/dashboard/articles',
		hasSublinks: true,
	};

	const sidebarLinks: WrapperLinkProps[] = [
		{ icon: 'profile', color: 'blue', label: 'Profilo', href: '/dashboard' },
		...(isEditor ? [newsLink] : []),
	];

	return {
		props: {
			hasSidebar: true,
			sidebarLinks,
		},
	};
};

export { getServerSideProps };

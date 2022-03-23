import { Group } from '@prisma/client';
import BackHeading from 'components/heading/BackHeading';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';

interface DashboardGroupProps {
	group: Group;
}

function DashboardGroup({ group }: DashboardGroupProps) {
	return (
		<>
			<BackHeading>{group.name}</BackHeading>
		</>
	);
}

DashboardGroup.hasSidebar = true;
DashboardGroup.sidebarLinks = USERS_LINKS;

export default DashboardGroup;

export const getServerSideProps: GetServerSideProps<
	DashboardGroupProps
> = async (ctx) => {
	const groupId = ctx.params?.groupId as string;

	if (groupId === 'none') {
		const noGroup: Group = {
			id: 'none',
			name: 'Utenti senza gruppo',
		};

		return {
			props: {
				group: noGroup,
			},
		};
	}

	const group = await prisma.group.findUnique({ where: { id: groupId } });

	if (!group) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			group,
		},
	};
};

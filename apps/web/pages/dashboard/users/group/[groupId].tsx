import { ActionIcon, InputWrapper, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlusIcon } from '@modulz/radix-icons';
import { Group } from '@prisma/client';
import BackHeading from 'components/heading/BackHeading';
import { searchUser } from 'data/api/users';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { useState } from 'react';
import useSWR from 'swr';

interface DashboardGroupProps {
	group: Group;
}

function DashboardGroup({ group }: DashboardGroupProps) {
	const [search, setSearch] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(search, 500);
	const { data: searchResult } = useSWR(
		`/api/users?q=${debouncedSearchQuery}`,
		searchUser
	);

	return (
		<>
			<BackHeading>{group.name}</BackHeading>

			<InputWrapper label="Aggiungi gestori">
				<TextInput
					onChange={(e) => setSearch(e.currentTarget.value)}
					value={search}
					placeholder="Cerca un utente da aggiungere come gestore..."
				/>
			</InputWrapper>

			{searchResult?.map((user, index) => (
				<div style={{ display: 'flex', alignItems: 'center' }} key={index}>
					{user.email ?? user.name ?? user.id}
					<ActionIcon color="blue">
						<PlusIcon />
					</ActionIcon>
				</div>
			))}
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

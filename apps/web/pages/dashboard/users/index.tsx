import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import { searchUser } from 'data/api/users';
import useDataError from 'hooks/errors/useDataError';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { useState } from 'react';
import useSWR from 'swr';

export default function DashboardUsers() {
	const [search, setSearch] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(search, 500);
	const { data: searchResult, error } = useSWR(
		debouncedSearchQuery
			? `/api/users?q=${debouncedSearchQuery}&include=roles`
			: false,
		searchUser
	);
	useDataError(error);

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Utenti</PageTitle>

			<PageHeading>Utenti</PageHeading>

			<TextInput
				onChange={(e) => setSearch(e.currentTarget.value)}
				value={search}
				placeholder="utente@example.com"
				label="Ricerca utenti"
			/>
		</DashboardPageContainer>
	);
}

DashboardUsers.hasLocalCache = true;
DashboardUsers.hasSidebar = true;
DashboardUsers.sidebarLinks = USERS_LINKS;

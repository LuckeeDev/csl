import { Pagination, Table } from '@mantine/core';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import SeminarRow from 'components/tableRows/SeminarRow';
import getEndpoint from 'data/api/getEndpoint';
import useQueryState from 'hooks/router/useQueryState';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import { useMemo } from 'react';
import useSWR from 'swr';
import { ExtendedSeminar } from 'types/seminars';

function DashboardSeminars() {
	const [pageIndex, setPageIndex] = useQueryState<number>('page', 1);
	const { data } = useSWR<{
		seminars: ExtendedSeminar[];
		seminarsCount: number;
	}>(`/api/seminars?page=${pageIndex}`, getEndpoint);

	const paginationTotal = useMemo(
		() => Math.ceil((data?.seminarsCount ?? 20) / 20),
		[data?.seminarsCount]
	);

	const rows = useMemo(
		() =>
			data?.seminars.map((s) => <SeminarRow key={s.id} seminar={s} />) ?? [],
		[data]
	);

	return (
		<DashboardPageContainer>
			<PageHeading loading={!data}>Seminari</PageHeading>

			<Table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Evento</th>
						<th>Fascia oraria</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>

			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Pagination
					page={pageIndex}
					onChange={setPageIndex}
					total={paginationTotal}
				/>
			</div>
		</DashboardPageContainer>
	);
}

DashboardSeminars.hasSidebar = true;
DashboardSeminars.sidebarLinks = EVENT_LINKS;
DashboardSeminars.hasLocalCache = true;

export default DashboardSeminars;

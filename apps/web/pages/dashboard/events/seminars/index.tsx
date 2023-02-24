import { Pagination, Table, Text } from '@mantine/core';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import SeminarRow from 'components/tableRows/SeminarRow';
import getEndpoint from 'data/api/getEndpoint';
import useQueryState from 'hooks/router/useQueryState';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import { useMemo } from 'react';
import useSWR from 'swr';
import { ExtendedSeminar } from 'types/seminars';
import { useModals } from '@mantine/modals';
import { deleteSeminar } from 'data/api/seminars';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

function DashboardSeminars() {
	const [pageIndex, setPageIndex] = useQueryState<number>('page', 1);
	const { data, mutate } = useSWR<{
		seminars: ExtendedSeminar[];
		seminarsCount: number;
	}>(`/api/seminars?page=${pageIndex}`, getEndpoint);

	const paginationTotal = useMemo(
		() => Math.ceil((data?.seminarsCount ?? 20) / 20),
		[data?.seminarsCount]
	);
	const modals = useModals();

	function onDelete(seminarId: string) {
		async function confirmDelete(seminarId: string) {
			try {
				showNotification({
					id: `delete-seminar-${seminarId}`,
					message: 'Operazione in corso...',
					loading: true,
				});

				const newSeminars = [...(data?.seminars ?? [])];

				const index = newSeminars.findIndex((s) => s.id === seminarId);

				if (index !== -1) {
					newSeminars.splice(index, 1);
				}

				await mutate(deleteSeminar(seminarId), {
					optimisticData: {
						seminarsCount: data?.seminarsCount ?? 0,
						seminars: newSeminars,
					},
					revalidate: false,
				});

				updateNotification({
					id: `delete-seminar-${seminarId}`,
					loading: false,
					color: 'teal',
					title: 'Seminario rimosso',
					message:
						'Il seminario, con tutte le prenotazioni collegate, è stato eliminato',
					icon: <IconCheck />,
				});
			} catch (err) {
				updateNotification({
					id: `delete-seminar-${seminarId}`,
					loading: false,
					color: 'red',
					title: 'Errore',
					message: "C'è stato un errore nella rimozione del seminario",
					icon: <IconX />,
				});
			}
		}

		modals.openConfirmModal({
			title: 'Eliminazione seminario',
			children: (
				<Text size="sm">
					Eliminando questo seminario eliminerai anche tutte le prenotazioni
					associate.
				</Text>
			),
			labels: { confirm: 'Conferma', cancel: 'Annulla' },
			confirmProps: { color: 'red' },
			centered: true,
			onConfirm: () => confirmDelete(seminarId),
		});
	}

	const rows = useMemo(
		() =>
			data?.seminars.map((s) => (
				<SeminarRow onDelete={onDelete} key={s.id} seminar={s} />
			)) ?? [],
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

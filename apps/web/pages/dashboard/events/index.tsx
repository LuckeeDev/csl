import {
	ActionIcon,
	Input,
	ScrollArea,
	Table,
	Text,
	TextInput,
} from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import EventRow from 'components/tableRows/EventRow';
import { createEvent, deleteEvent, getEvents } from 'data/api/events';
import Joi from 'joi';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import { useMemo } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

export interface NewEventFormValues {
	name: string;
}

const newEventSchema = Joi.object({
	name: Joi.string().required(),
});

function DashboardEventsIndex() {
	const { data, mutate } = useSWR('/api/events', getEvents);
	const form = useForm<NewEventFormValues>({
		validate: joiResolver(newEventSchema),
		initialValues: {
			name: '',
		},
	});
	const modals = useModals();

	function onDelete(eventId: string) {
		async function confirmDelete(eventId: string) {
			try {
				showNotification({
					id: `delete-event-${eventId}`,
					message: 'Operazione in corso...',
					loading: true,
				});

				const newEvents = [...(data ?? [])];

				const index = newEvents.findIndex((s) => s.id === eventId);

				if (index !== -1) {
					newEvents.splice(index, 1);
				}

				await mutate(deleteEvent(eventId), {
					optimisticData: newEvents,
					revalidate: false,
				});

				updateNotification({
					id: `delete-event-${eventId}`,
					loading: false,
					color: 'teal',
					title: 'Evento rimosso',
					message: "L'evento, con tutti i dati collegati, è stato eliminato",
					icon: <IconCheck />,
				});
			} catch (err) {
				updateNotification({
					id: `delete-event-${eventId}`,
					loading: false,
					color: 'red',
					title: 'Errore',
					message: "C'è stato un errore nella rimozione del corso",
					icon: <IconX />,
				});
			}
		}

		modals.openConfirmModal({
			title: 'Eliminazione evento',
			children: (
				<Text size="sm">
					Eliminando questo evento eliminerai anche tutti i dati associati,
					comprese le fasce orarie, i seminari e le prenotazioni.
				</Text>
			),
			labels: { confirm: 'Conferma', cancel: 'Annulla' },
			confirmProps: { color: 'red' },
			centered: true,
			onConfirm: () => confirmDelete(eventId),
		});
	}

	const rows = useMemo(
		() =>
			data?.map((event, index) => (
				<EventRow onDelete={onDelete} event={event} key={index} />
			)) ?? [],
		[data]
	);

	async function onSubmit(val: NewEventFormValues) {
		const id = v4();

		const optimisticData = {
			...val,
			id: 'new',
			created_at: new Date(),
			updated_at: new Date(),
		};

		showNotification({
			id: `create-event-${id}`,
			loading: true,
			message: 'Operazione in corso...',
		});

		await mutate(createEvent(val), {
			optimisticData: data ? [...data, optimisticData] : [optimisticData],
			revalidate: false,
		});

		updateNotification({
			id: `create-event-${id}`,
			color: 'teal',
			icon: <IconCheck />,
			loading: false,
			message:
				'Operazione completata con successo, ora puoi aggiungere orari e seminari',
			title: 'Evento creato',
		});

		form.reset();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Eventi</PageTitle>

			<PageHeading loading={!data}>Eventi</PageHeading>

			<ScrollArea>
				<Table style={{ minWidth: '600px' }}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome</Table.Th>
							<Table.Th>Azioni</Table.Th>
						</Table.Tr>
					</Table.Thead>

					<Table.Tbody>
						{rows}

						<Table.Tr>
							<Table.Td>
								<Input.Wrapper
									label="Nuovo evento"
									style={{ maxWidth: '400px' }}
								>
									<TextInput
										placeholder="Inserisci un nome per il nuovo evento..."
										form="create-event-form"
										{...form.getInputProps('name')}
										rightSection={
											<ActionIcon
												form="create-event-form"
												color="blue"
												type="submit"
												variant="filled"
											>
												<IconCheck />
											</ActionIcon>
										}
									/>
								</Input.Wrapper>
							</Table.Td>
						</Table.Tr>
					</Table.Tbody>
				</Table>
			</ScrollArea>

			<form id="create-event-form" onSubmit={form.onSubmit(onSubmit)}></form>
		</DashboardPageContainer>
	);
}

DashboardEventsIndex.hasSidebar = true;
DashboardEventsIndex.sidebarLinks = EVENT_LINKS;
DashboardEventsIndex.hasLocalCache = true;

export default DashboardEventsIndex;

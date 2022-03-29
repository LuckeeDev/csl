import { EVENT_LINKS } from 'navigation/dashboard/events';
import PageTitle from 'components/head/PageTitle';
import {
	ActionIcon,
	InputWrapper,
	ScrollArea,
	Table,
	TextInput,
} from '@mantine/core';
import useSWR from 'swr';
import { createEvent, getEvents } from 'data/api/events';
import { useMemo } from 'react';
import EventRow from 'components/tableRows/EventRow';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';
import { CheckIcon } from '@modulz/radix-icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import { showNotification, updateNotification } from '@mantine/notifications';

export interface NewEventFormValues {
	name: string;
}

const newEventSchema = Joi.object({
	name: Joi.string().required(),
});

function DashboardEventsIndex() {
	const { data, mutate } = useSWR('/api/events', getEvents);
	const form = useForm<NewEventFormValues>({
		schema: joiResolver(newEventSchema),
		initialValues: {
			name: '',
		},
	});
	const rows = useMemo(
		() =>
			data?.map((event, index) => <EventRow event={event} key={index} />) ?? [],
		[data]
	);

	async function onSubmit(val: NewEventFormValues) {
		const optimisticData = {
			...val,
			id: 'new',
			created_at: new Date(),
			updated_at: new Date(),
		};

		showNotification({
			id: 'create-event',
			loading: true,
			message: 'Operazione in corso...',
		});

		await mutate(createEvent(val), {
			optimisticData: data ? [...data, optimisticData] : [optimisticData],
			revalidate: false,
		});

		updateNotification({
			id: 'create-event',
			color: 'teal',
			icon: <CheckIcon />,
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

			<h1>Eventi</h1>

			<ScrollArea>
				<Table style={{ minWidth: '600px' }}>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>
						{rows}

						<tr>
							<td>
								<InputWrapper
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
												<CheckIcon />
											</ActionIcon>
										}
									/>
								</InputWrapper>
							</td>
						</tr>
					</tbody>
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

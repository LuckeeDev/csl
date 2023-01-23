import {
	Button,
	Input,
	NativeSelect,
	SimpleGrid,
	TextInput,
} from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { Event } from '@prisma/client';
import { TimeSlotFormValues } from 'hooks/forms/useTimeSlotForm';

interface TimeSlotFormProps {
	form: UseFormReturnType<TimeSlotFormValues>;
	events: Event[];
	onSubmit: (val: TimeSlotFormValues) => void;
}

export default function TimeSlotForm({
	form,
	events,
	onSubmit,
}: TimeSlotFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Input.Wrapper required label="Nome">
				<TextInput
					placeholder="Inserisci un nome per la nuova fascia"
					{...form.getInputProps('name')}
				/>
			</Input.Wrapper>

			<SimpleGrid cols={2}>
				<Input.Wrapper required label="Orario di inizio">
					<TimeInput
						placeholder="Seleziona un orario di inizio"
						{...form.getInputProps('startTime')}
					/>
				</Input.Wrapper>

				<Input.Wrapper required label="Data di inizio">
					<DatePicker
						placeholder="Seleziona una data di inizio"
						{...form.getInputProps('startDate')}
					/>
				</Input.Wrapper>
			</SimpleGrid>

			<SimpleGrid cols={2}>
				<Input.Wrapper required label="Orario di fine">
					<TimeInput
						placeholder="Seleziona un orario di fine"
						{...form.getInputProps('endTime')}
					/>
				</Input.Wrapper>

				<Input.Wrapper required label="Data di fine">
					<DatePicker
						placeholder="Seleziona una data di fine"
						{...form.getInputProps('endDate')}
					/>
				</Input.Wrapper>
			</SimpleGrid>

			<Input.Wrapper required label="Evento">
				<NativeSelect
					placeholder="Seleziona l'evento a cui collegare questa fascia oraria"
					data={events.map((e) => ({ value: e.id, label: e.name }))}
					{...form.getInputProps('eventId')}
				/>
			</Input.Wrapper>

			<Button mt="md" type="submit">
				Crea
			</Button>
		</form>
	);
}

import {
	Button,
	NativeSelect,
	NumberInput,
	Textarea,
	TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { TimeSlot } from '@prisma/client';
import { SeminarFormValues } from 'hooks/forms/useSeminarForm';

interface SeminarFormProps {
	timeSlots: TimeSlot[];
	form: UseFormReturnType<SeminarFormValues>;
	onSubmit: (val: SeminarFormValues) => void;
}

export default function SeminarForm({
	timeSlots,
	form,
	onSubmit,
}: SeminarFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				label="Nome del seminario"
				required
				placeholder="Inserisci il nome del nuovo corso..."
				{...form.getInputProps('name')}
				mb="sm"
			/>

			<Textarea
				label="Descrizione del seminario"
				required
				placeholder="Inserisci la descrizione del seminario..."
				{...form.getInputProps('description')}
				mb="sm"
			/>

			<NumberInput
				label="Numero massimo di iscritti"
				required
				placeholder="Quante persone possono iscriversi a questo evento?"
				{...form.getInputProps('maxBookings')}
				mb="sm"
			/>

			<TextInput
				label="Luogo"
				placeholder="Dove si troveranno le persone per questo evento?"
				description="Puoi lasciare questo campo vuoto se vuoi che venga automaticamente creata una riunione Meet"
				{...form.getInputProps('location')}
				mb="sm"
			/>

			<NativeSelect
				label="Fascia oraria"
				required
				description="Selezionare la fascia oraria selezionerà anche automaticamente l'evento collegato"
				placeholder="Seleziona l'orario di questo evento"
				data={timeSlots.map((s) => ({ value: s.id, label: s.name }))}
				{...form.getInputProps('timeSlotId')}
				mb="sm"
			/>

			<Button type="submit">Crea seminario</Button>
		</form>
	);
}

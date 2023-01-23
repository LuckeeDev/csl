import { Button, Input, Space, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { ShopSessionFormValues } from 'hooks/forms/useShopSessionForm';
import { DateRangePicker } from '@mantine/dates';

interface ShopSessionFormProps {
	form: UseForm<ShopSessionFormValues>;
	onSubmit: (val: ShopSessionFormValues) => void;
}

export default function ShopSessionForm({
	form,
	onSubmit,
}: ShopSessionFormProps) {
	function handleDateChange([start, end]: [Date | null, Date | null]) {
		form.setFieldValue('start', start);
		form.setFieldValue('end', end);
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Input.Wrapper id="name" required label="Nome">
				<TextInput
					id="name"
					placeholder="Il nome della sessione"
					{...form.getInputProps('name')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper id="dates" required label="Date">
				<DateRangePicker
					id="dates"
					amountOfMonths={2}
					value={[form.values.start, form.values.end]}
					onChange={handleDateChange}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Button type="submit">Salva sessione</Button>
		</form>
	);
}

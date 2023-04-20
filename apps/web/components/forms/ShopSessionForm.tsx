import { Button, Input, Space, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { ShopSessionFormValues } from 'hooks/forms/useShopSessionForm';

interface ShopSessionFormProps {
	form: UseFormReturnType<ShopSessionFormValues>;
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
				<DatePicker
					id="dates"
					numberOfColumns={2}
					type="range"
					value={[form.values.start, form.values.end]}
					onChange={handleDateChange}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Button type="submit">Salva sessione</Button>
		</form>
	);
}

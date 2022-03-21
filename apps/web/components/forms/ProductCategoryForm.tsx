import { Button, InputWrapper, Space, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { ProductCategoryFormValues } from 'hooks/forms/useProductCategoryForm';

interface ProductCategoryFormProps {
	form: UseForm<ProductCategoryFormValues>;
	onSubmit: (val: ProductCategoryFormValues) => void;
}

export default function ProductCategoryForm({
	form,
	onSubmit,
}: ProductCategoryFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<InputWrapper id="name" required label="Nome">
				<TextInput
					id="name"
					placeholder="Il nome di questa categoria di gadget"
					{...form.getInputProps('name')}
				/>
			</InputWrapper>

			<Space h={20} />

			<Button type="submit">Conferma</Button>
		</form>
	);
}

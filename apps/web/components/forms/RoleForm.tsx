import { Button, MultiSelect, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { RoleFormValues } from 'hooks/forms/useRoleForm';
import { PERMISSION_ARRAY } from 'utils/auth/PERMISSION_ARRAY';

interface RoleFormProps {
	onSubmit: (data: RoleFormValues) => void;
	form: UseFormReturnType<RoleFormValues>;
}

export default function RoleForm({ onSubmit, form }: RoleFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
			<TextInput label="Nome" required {...form.getInputProps('name')} />

			<MultiSelect
				label="Permessi"
				required
				data={PERMISSION_ARRAY}
				searchable
				{...form.getInputProps('permissions')}
			/>

			<Button mt="sm" type="submit">
				Crea ruolo
			</Button>
		</form>
	);
}

import { InputWrapper, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { GroupFormValues } from 'hooks/useGroupForm';

interface GroupFormProps {
	form: UseFormReturnType<GroupFormValues>;
	onSubmit: (val: GroupFormValues) => void;
}

export default function GroupForm({ form, onSubmit }: GroupFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<InputWrapper label="Nome" required>
				<TextInput
					placeholder="Inserisci il nome del nuovo gruppo"
					{...form.getInputProps('name')}
				/>
			</InputWrapper>
		</form>
	);
}

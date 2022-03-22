import { ActionIcon, InputWrapper, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { CheckIcon } from '@modulz/radix-icons';
import { GroupFormValues } from 'hooks/forms/useGroupForm';

interface GroupFormProps {
	form: UseFormReturnType<GroupFormValues>;
	onSubmit: (val: GroupFormValues) => void;
	className?: string;
}

export default function GroupForm({
	form,
	onSubmit,
	className,
}: GroupFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)} className={className}>
			<InputWrapper label="Nuovo gruppo">
				<TextInput
					placeholder="Inserisci il nome del nuovo gruppo"
					{...form.getInputProps('name')}
					rightSection={
						<ActionIcon type="submit" color="blue" variant="filled">
							<CheckIcon />
						</ActionIcon>
					}
				/>
			</InputWrapper>
		</form>
	);
}

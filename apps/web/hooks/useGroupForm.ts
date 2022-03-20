import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';

export interface GroupFormValues {
	name: string;
}

const groupFormSchema = Joi.object<GroupFormValues>({
	name: Joi.string().required(),
}).required();

export default function useGroupForm() {
	const form = useForm<GroupFormValues>({
		schema: joiResolver(groupFormSchema),
		initialValues: {
			name: '',
		},
	});

	return form;
}

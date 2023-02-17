import { joiResolver, useForm } from '@mantine/form';
import { Permission } from '@prisma/client';
import Joi from 'joi';
import { PERMISSION_ARRAY } from 'utils/auth/PERMISSION_ARRAY';

export interface RoleFormValues {
	name: string;
	permissions: Permission[];
}

const roleFormSchema = Joi.object<RoleFormValues>({
	name: Joi.string().required(),
	permissions: Joi.array()
		.min(1)
		.items(Joi.string().valid(...PERMISSION_ARRAY))
		.required(),
}).required();

export default function useRoleForm() {
	const form = useForm<RoleFormValues>({
		validate: joiResolver(roleFormSchema),
		initialValues: {
			name: '',
			permissions: [],
		},
	});

	return form;
}

import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';

export interface SeminarFormValues {
	name: string;
	description: string;
	timeSlotId: string;
	maxBookings: number;
	location: string;
}

const seminarFormSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	location: Joi.string().allow(''),
	maxBookings: Joi.number().integer().required(),
	timeSlotId: Joi.string().required(),
});

export default function useSeminarForm() {
	const form = useForm<SeminarFormValues>({
		initialValues: {
			name: '',
			description: '',
			location: '',
			maxBookings: 100,
			timeSlotId: '',
		},
		schema: joiResolver(seminarFormSchema),
	});

	return form;
}

import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';

export interface TimeSlotFormValues {
	name: string;
	startTime: Date;
	startDate: Date;
	endTime: Date;
	endDate: Date;
	eventId: string;
}

const timeSlotFormSchema = Joi.object({
	name: Joi.string().required(),
	startTime: Joi.date().required(),
	startDate: Joi.date().required(),
	endTime: Joi.date().required(),
	endDate: Joi.date().required(),
	eventId: Joi.string().required(),
});

export default function useTimeSlotForm() {
	const now = new Date();

	return useForm<TimeSlotFormValues>({
		validate: joiResolver(timeSlotFormSchema),
		initialValues: {
			name: '',
			startTime: now,
			startDate: now,
			endTime: now,
			endDate: now,
			eventId: '',
		},
	});
}

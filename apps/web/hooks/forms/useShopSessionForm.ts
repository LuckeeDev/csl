import { useForm } from '@mantine/hooks';
import { ShopSession } from '@prisma/client';

const START_DEFAULT_VALUE = new Date();
const END_DEFAULT_VALUE = new Date();

END_DEFAULT_VALUE.setMonth(START_DEFAULT_VALUE.getMonth() + 1);

const DEFAULT_VALUES = {
	name: '',
	start: START_DEFAULT_VALUE,
	end: END_DEFAULT_VALUE,
};

export type ShopSessionData = Omit<
	ShopSession,
	'id' | 'created_at' | 'updated_at'
>;

export interface ShopSessionFormValues {
	name: string;
	start: Date | null;
	end: Date | null;
}

export default function useShopSessionForm(shopSession?: ShopSessionData) {
	const form = useForm<ShopSessionFormValues>({
		initialValues: shopSession ? shopSession : DEFAULT_VALUES,

		errorMessages: {
			name: 'Questo campo è necessario',
			start: 'Questo campo è necessario',
			end: 'Questo campo è necessario',
		},
		validationRules: {
			name: (val) => (val ? true : false),
			start: (val) => (val ? true : false),
			end: (val) => (val ? true : false),
		},
	});

	return form;
}

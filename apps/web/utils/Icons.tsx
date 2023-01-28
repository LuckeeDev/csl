import {
	IconUser,
	IconPencil,
	IconChevronLeft,
	IconList,
	IconRocket,
	IconCalendar,
} from '@tabler/icons';
import { AvailableIcons } from 'components/wrapper/types';
import { ReactNode } from 'react';

const Icons: Record<AvailableIcons, ReactNode> = {
	profile: <IconUser />,
	write: <IconPencil />,
	back: <IconChevronLeft />,
	list: <IconList />,
	rocket: <IconRocket />,
	calendar: <IconCalendar />,
};

export default Icons;

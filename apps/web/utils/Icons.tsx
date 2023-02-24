import {
	IconUser,
	IconPencil,
	IconChevronLeft,
	IconList,
	IconRocket,
	IconCalendar,
	IconUsers,
	IconApps,
	IconShoppingCart,
	IconKey,
	IconLockAccess,
} from '@tabler/icons-react';
import { AvailableIcons } from 'components/wrapper/types';
import { ReactNode } from 'react';

const Icons: Record<AvailableIcons, ReactNode> = {
	profile: <IconUser />,
	users: <IconUsers />,
	write: <IconPencil />,
	back: <IconChevronLeft />,
	list: <IconList />,
	rocket: <IconRocket />,
	calendar: <IconCalendar />,
	apps: <IconApps />,
	shop: <IconShoppingCart />,
	'lock-access': <IconLockAccess />,
};

export default Icons;

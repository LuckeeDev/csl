import {
	IconApps,
	IconCalendar,
	IconChevronLeft,
	IconList,
	IconLockAccess,
	IconPencil,
	IconRocket,
	IconShoppingCart,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

const Icons: Record<string, ReactNode> = {
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

import {
	PersonIcon,
	Pencil1Icon,
	ChevronLeftIcon,
	ListBulletIcon,
	RocketIcon,
} from '@modulz/radix-icons';
import { AvailableIcons } from 'components/wrapper/types';
import { ReactNode } from 'react';

const Icons: Record<AvailableIcons, ReactNode> = {
	profile: <PersonIcon />,
	write: <Pencil1Icon />,
	back: <ChevronLeftIcon />,
	list: <ListBulletIcon />,
	rocket: <RocketIcon />,
};

export default Icons;

import { PersonIcon, Pencil1Icon } from '@modulz/radix-icons';
import { AvailableIcons } from 'components/wrapper/types';
import { ReactNode } from 'react';

const Icons: Record<AvailableIcons, ReactNode> = {
	profile: <PersonIcon />,
	write: <Pencil1Icon />,
};

export default Icons;

import { MantineColor } from '@mantine/core';

export type AvailableIcons =
	| 'profile'
	| 'write'
	| 'back'
	| 'list'
	| 'rocket'
	| 'calendar';

export interface WrapperLinkProps {
	icon: AvailableIcons;
	color: MantineColor;
	label: string;
	href: string;
	hasSublinks?: boolean;
}

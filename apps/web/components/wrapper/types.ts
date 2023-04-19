import { MantineColor } from '@mantine/core';

export type AvailableIcons =
	| 'users'
	| 'profile'
	| 'write'
	| 'back'
	| 'list'
	| 'rocket'
	| 'calendar'
	| 'apps'
	| 'shop'
	| 'lock-access';

export interface WrapperLinkProps {
	icon: AvailableIcons;
	/**
	 * @deprecated you cannot specify a color for the links anymore.
	 */
	color?: MantineColor;
	label: string;
	href: string;
	hasSublinks?: boolean;
}

export type AvailableIcons = 'profile' | 'write' | 'back' | 'list';

export interface WrapperLinkProps {
	icon: AvailableIcons;
	color: string;
	label: string;
	href: string;
	hasSublinks?: boolean;
}

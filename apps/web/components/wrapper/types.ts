export type AvailableIcons = 'profile' | 'write' | 'back' | 'list' | 'rocket';

export interface WrapperLinkProps {
	icon: AvailableIcons;
	color: string;
	label: string;
	href: string;
	hasSublinks?: boolean;
}

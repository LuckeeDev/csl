export type AvailableIcons = 'profile' | 'write';

export interface WrapperLinkProps {
	icon: AvailableIcons;
	color: string;
	label: string;
	href: string;
	hasSublinks?: boolean;
}

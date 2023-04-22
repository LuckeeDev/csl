import { Permission } from '@prisma/client';

interface BaseLinkProps {
	icon: React.FC<{ size?: number }>;
	label: string;
	/**
	 * `href: null` indicates that the link should have sublinks
	 * `href: string` cannot have sublinks
	 */
	href: string | null;
	requiredPermissions: Permission[];
}

interface WithSublinks extends BaseLinkProps {
	sublinks: WrapperSublink[];
	/**
	 * `href: null` indicates that the link should have sublinks
	 */
	href: null;
}

interface WithoutSublinks extends BaseLinkProps {
	href: string;
}

export type WrapperLinkProps = WithSublinks | WithoutSublinks;

export interface WrapperSublink
	extends Omit<BaseLinkProps, 'icon' | 'requiredPermissions'> {
	href: string;
}

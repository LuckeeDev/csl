import { Permission } from '@prisma/client';

export interface WrapperLinkProps {
	icon: React.FC<{ size: string | number }>;
	label: string;
	href: string;
	sublinks?: Omit<
		WrapperLinkProps,
		'sublinks' | 'icon' | 'requiredPermissions'
	>[];
	requiredPermissions: Permission[];
}

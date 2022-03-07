import { Permission } from '@prisma/client';
import { WrapperLinkProps } from 'components/wrapper/types';

export interface LinkData extends WrapperLinkProps {
	requiredPermissions: Permission[];
}

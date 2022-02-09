import { WrapperLinkProps } from 'components/wrapper/types';
import { Session } from 'next-auth';

export interface BasePageProps {
	session: Session | null;
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

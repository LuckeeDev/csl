import { Session } from 'next-auth';

export interface BasePageProps {
	session: Session | null;
}

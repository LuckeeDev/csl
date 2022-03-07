// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Next from 'next';
import { SessionUser } from './next-auth';

declare module 'next' {
	interface NextApiRequest {
		user: SessionUser | null;
	}
}

import { StrapiAuthResponse } from '@csl/types';
import { ReactNode } from 'react';
import SessionContext from './SessionContext';

export default function SessionProvider({
	session,
	children,
}: {
	session: StrapiAuthResponse;
	children: ReactNode;
}) {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
}

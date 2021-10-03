import { ReactNode } from 'react';
import SessionContext, { SessionContextModel } from './SessionContext';


export default function SessionProvider({
	session,
	children,
}: {
	session: SessionContextModel;
	children: ReactNode;
}) {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
}

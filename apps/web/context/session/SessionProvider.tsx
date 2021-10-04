import { ReactNode } from 'react';
import SessionContext, { SessionContextModel } from './SessionContext';

interface SessionProviderProps {
	session: SessionContextModel;
	children: ReactNode;
}


export default function SessionProvider(props: SessionProviderProps) {
	return (
		<SessionContext.Provider value={props.session}>
			{props.children}
		</SessionContext.Provider>
	);
}

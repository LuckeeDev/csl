import { StrapiUser } from '@csl/types';
import { createContext } from 'react';

export interface SessionContextModel {
	user: StrapiUser;
	initializing: boolean;
	revalidate: () => void;
}

const SessionContext = createContext<SessionContextModel>(null);

export default SessionContext;

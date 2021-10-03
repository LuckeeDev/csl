import { StrapiAuthResponse } from '@csl/types';
import { createContext } from 'react';

export interface SessionContextModel {
	session: StrapiAuthResponse;
	revalidate: () => void;
}

const SessionContext = createContext<SessionContextModel>({
	session: null,
	revalidate: null,
});

export default SessionContext;

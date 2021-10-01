import { StrapiAuthResponse } from '@csl/types';
import { createContext } from 'react';

const SessionContext = createContext<StrapiAuthResponse>({
	user: null,
	jwt: null,
});

export default SessionContext;

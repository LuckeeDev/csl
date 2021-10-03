import { useContext } from 'react';
import SessionContext from '@/context/session/SessionContext';

export default function useSession() {
	const context = useContext(SessionContext);

	return context;
}

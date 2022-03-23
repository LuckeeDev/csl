import { ReactNode, useEffect } from 'react';
import { SWRConfig } from 'swr';

function useLocalStorageProvider() {
	// When initializing, we restore the data from `localStorage` into a map.
	const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

	function saveToCache() {
		const appCache = JSON.stringify(Array.from(map.entries()));
		localStorage.setItem('app-cache', appCache);
	}

	// We still use the map for write & read for performance.
	return { provider: () => map, saveToCache };
}

export default function SWRLocalCache({ children }: { children: ReactNode }) {
	const { provider, saveToCache } = useLocalStorageProvider();

	// Save to cache when the SWR cache component is destroyed
	useEffect(() => {
		return () => saveToCache();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <SWRConfig value={{ provider }}>{children}</SWRConfig>;
}

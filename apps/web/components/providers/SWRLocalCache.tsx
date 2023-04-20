import { ReactNode, useEffect } from 'react';
import { SWRConfig } from 'swr';

function useLocalStorageProvider() {
	// When initializing, we restore the data from `localStorage` into a map.
	// `any` is needed to make typings work with SWR.
	const map = new Map<string, any>(
		JSON.parse(localStorage.getItem('app-cache') || '[]')
	);

	function saveToCache() {
		const appCache = JSON.stringify(Array.from(map.entries()));
		localStorage.setItem('app-cache', appCache);
	}

	// We still use the map for write & read for performance.
	return { provider: () => map, saveToCache };
}

export default function SWRLocalCache({ children }: { children: ReactNode }) {
	const { provider, saveToCache } = useLocalStorageProvider();

	// Manually save to cache when the SWR cache component is destroyed
	useEffect(() => {
		// Automatically save to cache on unload
		window.addEventListener('beforeunload', saveToCache);

		return () => {
			saveToCache();
			window.removeEventListener('beforeunload', saveToCache);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <SWRConfig value={{ provider }}>{children}</SWRConfig>;
}

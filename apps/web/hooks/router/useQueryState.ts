import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

export default function useQueryState<T extends string | number>(
	key: string,
	defaultValue: T
): [value: T, setValue: (newValue: T) => void] {
	const router = useRouter();

	useEffect(() => {
		if (!router.query[key]) {
			router.push({ query: { [key]: defaultValue } }, undefined, {
				shallow: true,
			});
		}
		// Only run on first render
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value: T = useMemo(() => {
		if (typeof defaultValue === 'number') {
			return (Number(router.query[key]) || defaultValue) as T;
		} else {
			return router.query[key] as T;
		}
	}, [key, router.query, defaultValue]);

	const setValue = useCallback(
		(newValue: T) =>
			router.push({ query: { [key]: newValue } }, undefined, { shallow: true }),
		[router, key]
	);

	return [value, setValue];
}

import { Loader } from '@mantine/core';
import { ReactNode } from 'react';

interface LoaderHeadingProps {
	loading: boolean;
	children: ReactNode;
}

export default function LoaderHeading({
	loading,
	children,
}: LoaderHeadingProps) {
	return (
		<h1 style={{ display: 'flex', alignItems: 'center' }}>
			{children}
			{loading && <Loader size="sm" ml="xs" />}
		</h1>
	);
}

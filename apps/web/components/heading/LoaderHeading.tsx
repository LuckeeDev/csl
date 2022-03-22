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
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<h1>{children}</h1>
			{loading && <Loader size="sm" ml="xs" />}
		</div>
	);
}

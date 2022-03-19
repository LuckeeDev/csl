import { ReactNode } from 'react';

export default function DefaultPageWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div style={{ padding: '0 16px 16px 16px', height: '100%' }}>
			{children}
		</div>
	);
}

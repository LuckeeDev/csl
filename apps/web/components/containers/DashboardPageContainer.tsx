import { ReactNode } from 'react';

interface DashboardPageContainer {
	children: ReactNode;
}

export default function DashboardPageContainer({
	children,
}: DashboardPageContainer) {
	return (
		<div
			style={{
				margin: 0,
				width: '100%',
				padding: '0 10px 0 0',
			}}
		>
			{children}
		</div>
	);
}

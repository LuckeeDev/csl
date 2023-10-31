import { AppShell, AppShellFooter } from '@mantine/core';
import Footer from 'components/wrapper/Footer';
import { ReactNode } from 'react';

export default function AppWrapper({ children }: { children: ReactNode }) {
	return (
		<AppShell footer={{ height: 98 }}>
			{children}

			<AppShellFooter>
				<Footer></Footer>
			</AppShellFooter>
		</AppShell>
	);
}

import { AppShellMain, AppShellNavbar } from '@mantine/core';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<AppShellNavbar>This is a navbar</AppShellNavbar>

			<AppShellMain>{children}</AppShellMain>
		</>
	);
}

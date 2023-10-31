import { AppShellMain } from '@mantine/core';
import { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
	return <AppShellMain>{children}</AppShellMain>;
}

import {
	AppShell,
	Navbar,
	Header,
	MediaQuery,
	Burger,
	useMantineTheme,
} from '@mantine/core';
import { ReactNode, useMemo, useState } from 'react';
import SideLinks from './SideLinks';
import UserButton from './UserButton';
import ButtonLink from 'components/links/ButtonLink';
import TextLink from 'components/links/TextLink';
import { WrapperLinkProps } from './types';
import { useSession } from 'next-auth/react';
import LoaderDiv from 'components/loader/LoaderDiv';
import { LinkData } from 'navigation/types';

interface WrapperProps {
	children: ReactNode;
	hasSidebar: boolean;
	sidebarLinks: LinkData[];
}

export default function Wrapper({
	children,
	hasSidebar,
	sidebarLinks,
}: WrapperProps) {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const { data: session, status } = useSession();

	const links: LinkData[] = useMemo(() => {
		if (status === 'loading') {
			return [];
		}

		// Check if links need any special permission
		return sidebarLinks.filter((link) => {
			// Create an array of booleans indicating if the user matches required permissions
			const matchesPermissions = link.requiredPermissions.map(
				(p) => session?.user.permissions?.includes(p) ?? false
			);

			// If any permission is not met, return false...
			if (matchesPermissions.includes(false)) {
				return false;
			}

			// ...otherwise, return true
			return true;
		});
	}, [session, status, sidebarLinks]);

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			fixed
			navbar={
				hasSidebar ? (
					<Navbar
						padding="md"
						hiddenBreakpoint="sm"
						hidden={!opened}
						width={{ sm: 300, lg: 400 }}
					>
						<Navbar.Section grow>
							{status === 'loading' ? (
								<LoaderDiv />
							) : (
								<SideLinks links={links} />
							)}
						</Navbar.Section>

						<Navbar.Section>
							<UserButton />
						</Navbar.Section>
					</Navbar>
				) : undefined
			}
			header={
				<Header height={80} padding="md">
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							height: '100%',
						}}
					>
						<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<TextLink href="/">Comitato Studentesco Lussana</TextLink>

						<ButtonLink href="/dashboard">Dashboard</ButtonLink>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}

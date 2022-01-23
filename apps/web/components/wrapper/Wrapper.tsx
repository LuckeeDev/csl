import {
	AppShell,
	Navbar,
	Header,
	MediaQuery,
	Burger,
	useMantineTheme,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import SideLinks from './SideLinks';
import UserButton from './UserButton';
import ButtonLink from 'components/links/ButtonLink';
import TextLink from 'components/links/TextLink';
import { WrapperLinkProps } from './types';
import Icons from 'utils/Icons';

interface WrapperProps {
	children: ReactNode;
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function Wrapper({
	children,
	hasSidebar,
	sidebarLinks,
}: WrapperProps) {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	const links =
		sidebarLinks?.map(({ icon, ...link }) => ({
			icon: Icons[icon],
			...link,
		})) ?? [];

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			fixed
			navbar={
				hasSidebar && (
					<Navbar
						padding="md"
						hiddenBreakpoint="sm"
						hidden={!opened}
						width={{ sm: 300, lg: 400 }}
					>
						<Navbar.Section grow>
							<SideLinks links={links} />
						</Navbar.Section>

						<Navbar.Section>
							<UserButton />
						</Navbar.Section>
					</Navbar>
				)
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

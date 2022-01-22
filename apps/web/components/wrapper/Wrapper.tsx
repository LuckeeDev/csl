import {
	AppShell,
	Navbar,
	Header,
	MediaQuery,
	Burger,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import NavLinks from './NavLinks';
import UserButton from './UserButton';
import { SunIcon, BellIcon, Share1Icon, Share2Icon } from '@modulz/radix-icons';

interface WrapperProps {
	children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	const links = [
		{ icon: <SunIcon />, color: 'blue', label: 'Pull Requests' },
		{ icon: <BellIcon />, color: 'lime', label: 'Open Issues' },
		{ icon: <Share1Icon />, color: 'violet', label: 'Discussions' },
		{ icon: <Share2Icon />, color: 'grape', label: 'Databases' },
	];

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			fixed
			navbar={
				<Navbar
					padding="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{ sm: 300, lg: 400 }}
				>
					<Navbar.Section grow>
						<NavLinks links={links} />
					</Navbar.Section>
					<Navbar.Section>
						<UserButton />
					</Navbar.Section>
				</Navbar>
			}
			header={
				<Header height={70} padding="md">
					<div
						style={{ display: 'flex', alignItems: 'center', height: '100%' }}
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

						<Text>Application header</Text>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}

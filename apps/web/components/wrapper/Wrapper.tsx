import {
	AppShell,
	Navbar,
	Header,
	MediaQuery,
	Burger,
	Text,
	useMantineTheme,
	Button,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import NavButton from '../nav/NavButton';

interface WrapperProps {
	children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
	const [opened, setOpened] = useState(false);
	const { data } = useSession();
	const theme = useMantineTheme();

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
					<Navbar.Section>
						<NavButton href="/">Prova</NavButton>
					</Navbar.Section>
					<Navbar.Section grow>Something</Navbar.Section>
					<Navbar.Section>
						{data ? (
							data.user.email
						) : (
							<Button onClick={() => signIn()}>Login</Button>
						)}
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

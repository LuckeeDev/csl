import {
	Avatar,
	Group,
	MantineTheme,
	Menu,
	Text,
	ThemeIcon,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight, IconUser } from '@tabler/icons-react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { forwardRef, useState } from 'react';

function userButtonStyles(theme: MantineTheme) {
	return {
		display: 'block',
		width: '100%',
		padding: theme.spacing.xs,
		borderRadius: theme.radius.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	};
}

interface LoggedInButtonProps {
	session: Session;
	showUserImage: boolean;
	opened: boolean;
	theme: MantineTheme;
}

// eslint-disable-next-line react/display-name
const LoggedInButton = forwardRef<HTMLButtonElement, LoggedInButtonProps>(
	(
		{ session, showUserImage, opened, theme, ...others }: LoggedInButtonProps,
		ref
	) => (
		<UnstyledButton ref={ref} sx={userButtonStyles} {...others}>
			<Group>
				{showUserImage && (
					<Avatar
						src={session.user.image ?? undefined}
						radius="xl"
						imageProps={{ referrerPolicy: 'no-referrer' }}
					/>
				)}

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{session.user.name}
					</Text>
					<Text color="dimmed" size="xs">
						{session.user.email}
					</Text>
				</div>

				<IconChevronRight
					size={20}
					style={{
						transform: opened ? `rotate(-90deg)` : 'none',
						transition: 'transform 200ms ease',
					}}
				/>
			</Group>
		</UnstyledButton>
	)
);

export default function UserButton() {
	const theme = useMantineTheme();
	const { data: session } = useSession();
	const showUserImage = useMediaQuery(
		`(max-width: ${theme.breakpoints.sm}), (min-width: ${theme.breakpoints.xl})`
	);

	const [opened, setOpened] = useState(false);

	return (
		<div
			style={{
				paddingTop: theme.spacing.sm,
				borderTop: `1px solid ${
					theme.colorScheme === 'dark'
						? theme.colors.dark[4]
						: theme.colors.gray[2]
				}`,
				width: '100%',
			}}
		>
			{session ? (
				<Menu width="target" opened={opened} onChange={setOpened}>
					<Menu.Target>
						<LoggedInButton
							showUserImage={showUserImage}
							session={session}
							opened={opened}
							theme={theme}
						/>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item
							color="red"
							onClick={() => signOut({ callbackUrl: '/' })}
						>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			) : (
				<UnstyledButton sx={userButtonStyles}>
					<Group onClick={() => signIn()}>
						<ThemeIcon color="blue" variant="light">
							<IconUser />
						</ThemeIcon>

						<Text size="sm">Login</Text>
					</Group>
				</UnstyledButton>
			)}
		</div>
	);
}

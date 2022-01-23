import { forwardRef } from 'react';
import {
	ChevronRightIcon,
	ChevronLeftIcon,
	PersonIcon,
} from '@modulz/radix-icons';
import { createStyles } from '@mantine/styles';
import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	ThemeIcon,
	Menu,
	MantineTheme,
} from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	user: {
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
	},
}));

interface LoggedInButtonProps {
	session: Session;
	theme: MantineTheme;
	classes: Record<'user', string>;
}

// eslint-disable-next-line react/display-name
const LoggedInButton = forwardRef<HTMLButtonElement, LoggedInButtonProps>(
	({ session, theme, classes, ...others }: LoggedInButtonProps, ref) => (
		<UnstyledButton ref={ref} className={classes.user} {...others}>
			<Group>
				<Avatar src={session.user.image} radius="xl" />

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{session.user.name}
					</Text>
					<Text color="dimmed" size="xs">
						{session.user.email}
					</Text>
				</div>

				{theme.dir === 'ltr' ? (
					<ChevronRightIcon width={18} height={18} />
				) : (
					<ChevronLeftIcon width={18} height={18} />
				)}
			</Group>
		</UnstyledButton>
	)
);

export default function UserButton() {
	const { classes, theme } = useStyles();
	const { data: session } = useSession();

	return (
		<div
			style={{
				paddingTop: theme.spacing.sm,
				borderTop: `1px solid ${
					theme.colorScheme === 'dark'
						? theme.colors.dark[4]
						: theme.colors.gray[2]
				}`,
			}}
		>
			{session ? (
				<Menu
					sx={{ width: '100%' }}
					control={
						<LoggedInButton session={session} theme={theme} classes={classes} />
					}
				>
					<Menu.Item color="red" onClick={() => signOut()}>
						Logout
					</Menu.Item>
				</Menu>
			) : (
				<UnstyledButton className={classes.user}>
					<Group onClick={() => signIn()}>
						<ThemeIcon color="blue" variant="light">
							<PersonIcon />
						</ThemeIcon>

						<Text size="sm">Login</Text>
					</Group>
				</UnstyledButton>
			)}
		</div>
	);
}

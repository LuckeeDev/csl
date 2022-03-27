import { forwardRef } from 'react';
import { ChevronRightIcon, PersonIcon } from '@modulz/radix-icons';
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
import { useMediaQuery } from '@mantine/hooks';

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
	showUserImage: boolean;
}

// eslint-disable-next-line react/display-name
const LoggedInButton = forwardRef<HTMLButtonElement, LoggedInButtonProps>(
	(
		{ session, theme, classes, showUserImage, ...others }: LoggedInButtonProps,
		ref
	) => (
		<UnstyledButton ref={ref} className={classes.user} {...others}>
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

				<ChevronRightIcon width={18} height={18} />
			</Group>
		</UnstyledButton>
	)
);

export default function UserButton() {
	const { classes, theme } = useStyles();
	const { data: session } = useSession();
	const showUserImage = useMediaQuery(
		`(max-width: ${theme.breakpoints.sm}px), (min-width: ${theme.breakpoints.xl}px)`
	);

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
						<LoggedInButton
							showUserImage={showUserImage}
							session={session}
							theme={theme}
							classes={classes}
						/>
					}
				>
					<Menu.Item color="red" onClick={() => signOut({ callbackUrl: '/' })}>
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

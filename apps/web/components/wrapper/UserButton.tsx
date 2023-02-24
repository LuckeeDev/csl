import { forwardRef } from 'react';
import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	ThemeIcon,
	Menu,
	useMantineTheme,
	MantineTheme,
} from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight, IconUser } from '@tabler/icons-react';

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
}

// eslint-disable-next-line react/display-name
const LoggedInButton = forwardRef<HTMLButtonElement, LoggedInButtonProps>(
	({ session, showUserImage, ...others }: LoggedInButtonProps, ref) => (
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

				<IconChevronRight width={18} height={18} />
			</Group>
		</UnstyledButton>
	)
);

export default function UserButton() {
	const theme = useMantineTheme();
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
				width: '100%',
			}}
		>
			{session ? (
				<Menu width="target">
					<Menu.Target>
						<LoggedInButton showUserImage={showUserImage} session={session} />
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

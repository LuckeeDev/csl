import React from 'react';
import {
	ChevronRightIcon,
	ChevronLeftIcon,
	PersonIcon
} from '@modulz/radix-icons';
import { createStyles } from '@mantine/styles';
import { UnstyledButton, Group, Avatar, Text, ThemeIcon } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';

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
			<UnstyledButton className={classes.user}>
				{session ? (
					<Group onClick={() => signOut()}>
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
				) : (
					<Group onClick={() => signIn()}>
						<ThemeIcon color="blue" variant="light">
							<PersonIcon />
						</ThemeIcon>

						<Text size="sm">Login</Text>
					</Group>
				)}
			</UnstyledButton>
		</div>
	);
}

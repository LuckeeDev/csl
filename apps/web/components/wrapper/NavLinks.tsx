import { createStyles } from '@mantine/styles';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface NavLinkProps {
	icon: ReactNode;
	color: string;
	label: string;
}

const useStyles = createStyles((theme) => ({
	button: {
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

function NavLink({ icon, color, label }: NavLinkProps) {
	const { classes } = useStyles();

	return (
		<UnstyledButton className={classes.button}>
			<Group>
				<ThemeIcon color={color} variant="light">
					{icon}
				</ThemeIcon>

				<Text size="sm">{label}</Text>
			</Group>
		</UnstyledButton>
	);
}

interface NavLinksProps {
	links: NavLinkProps[];
}

export default function NavLinks({ links }: NavLinksProps) {
	return (
		<div>
			{links.map((link) => (
				<NavLink {...link} key={link.label} />
			))}
		</div>
	);
}

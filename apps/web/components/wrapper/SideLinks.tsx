import { createStyles } from '@mantine/styles';
import { ThemeIcon, Group, Text, Anchor } from '@mantine/core';
import Link from 'next/link';
import { WrapperLinkProps } from './types';

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
			textDecoration: 'none',
		},
	},
}));

function SideLink({ icon, color, label, href }: WrapperLinkProps) {
	const { classes } = useStyles();

	return (
		<Link href={href} passHref>
			<Anchor className={classes.button}>
				<Group>
					<ThemeIcon color={color} variant="light">
						{icon}
					</ThemeIcon>

					<Text size="sm">{label}</Text>
				</Group>
			</Anchor>
		</Link>
	);
}

interface SideLinksProps {
	links: WrapperLinkProps[];
}

export default function SideLinks({ links }: SideLinksProps) {
	return (
		<div>
			{links.map((link) => (
				<SideLink {...link} key={link.label} />
			))}
		</div>
	);
}

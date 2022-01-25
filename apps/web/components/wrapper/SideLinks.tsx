import { createStyles } from '@mantine/styles';
import { ThemeIcon, Group, Text, Anchor } from '@mantine/core';
import Link from 'next/link';
import { WrapperLinkProps } from './types';
import { ChevronRightIcon } from '@modulz/radix-icons';
import Icons from 'utils/Icons';

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

interface SideLinksProps {
	links: WrapperLinkProps[];
}

export default function SideLinks({ links }: SideLinksProps) {
	const { classes } = useStyles();

	const iconLinks =
		links?.map(({ icon, ...link }) => ({
			icon: Icons[icon],
			...link,
		})) ?? [];

	return (
		<div>
			{iconLinks.map(({ href, color, icon, label, hasSublinks }) => (
				<Link href={href} passHref key={href}>
					<Anchor className={classes.button}>
						<Group>
							<ThemeIcon color={color} variant="light">
								{icon}
							</ThemeIcon>

							<Text size="sm" style={{ flex: 1 }}>
								{label}
							</Text>

							{hasSublinks && <ChevronRightIcon width={18} height={18} />}
						</Group>
					</Anchor>
				</Link>
			))}
		</div>
	);
}

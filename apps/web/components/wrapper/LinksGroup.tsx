'use client';

import {
	Box,
	Collapse,
	Group,
	ThemeIcon,
	UnstyledButton,
	createStyles,
	rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { WrapperLinkProps } from './types';

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	link: {
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		paddingLeft: rem(31),
		marginLeft: rem(30),
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		borderLeft: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	chevron: {
		transition: 'transform 200ms ease',
	},
}));

function LinksControl({ icon: Icon, label, ...props }: WrapperLinkProps) {
	const { classes, theme } = useStyles();
	const [opened, setOpened] = useState(false);

	const hasLinks = props.href === null;
	const items = useMemo(
		() =>
			hasLinks
				? props.sublinks.map((link) => (
						<Link className={classes.link} href={link.href} key={link.label}>
							{link.label}
						</Link>
				  ))
				: [],
		[props.href]
	);

	return (
		<>
			<UnstyledButton
				onClick={() => setOpened((o) => !o)}
				className={classes.control}
			>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="light" size={30}>
							<Icon size="1.1rem" />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>

					{hasLinks && (
						<IconChevronRight
							className={classes.chevron}
							size="1rem"
							stroke={1.5}
							style={{
								transform: opened
									? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
									: 'none',
							}}
						/>
					)}
				</Group>
			</UnstyledButton>

			{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
		</>
	);
}

export default function LinksGroup(props: WrapperLinkProps) {
	if (props.href === null) {
		return <LinksControl {...props} />;
	} else {
		return (
			<Link
				href={props.href}
				style={{ color: 'unset', textDecoration: 'none' }}
			>
				<LinksControl {...props} />
			</Link>
		);
	}
}

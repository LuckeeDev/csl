import { Anchor, createStyles, px } from '@mantine/core';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import TextLink from 'components/links/TextLink';

import PackageJSON from '../../../../package.json';

const useStyles = createStyles((theme) => ({
	footer: {
		display: 'grid',
		width: '100%',
		height: px(98),
		borderTop: '1px solid #2C2E33',
		padding: `${theme.spacing.xs} 20%`,
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateAreas: '"left vercel right"',
		alignItems: 'center',
		gap: 0,

		[`@media (max-width: ${theme.breakpoints.md})`]: {
			height: 'auto',
			padding: `${theme.spacing.xs} ${theme.spacing.md}`,
			gridTemplateColumns: 'auto auto',
			gridTemplateRows: px(80),
		},
	},
	anchor: {
		display: 'flex',
		alignItems: 'center',
		color: theme.colors.dark[0],

		':hover': {
			color: theme.colors.blue[4],
		},
	},
	icon: {
		marginRight: theme.spacing.xs,
	},
	leftDiv: {
		gridArea: 'left',
	},
	rightDiv: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		gridArea: 'right',
	},
}));

export default function Footer() {
	const { classes } = useStyles();

	return (
		<div className={classes.footer}>
			<div className={classes.leftDiv}>
				<Anchor
					className={classes.anchor}
					href="https://github.com/LuckeeDev/csl"
					target="_blank"
				>
					<IconBrandGithub className={classes.icon} />
					GitHub
					<IconExternalLink />
				</Anchor>

				<span>v{PackageJSON.version}</span>
			</div>

			<div className={classes.rightDiv}>
				<span>Comitato Studentesco Lussana</span>

				<span>
					<TextLink href="/tos" className={classes.anchor}>
						Privacy · Cookies
					</TextLink>
				</span>
			</div>
		</div>
	);
}

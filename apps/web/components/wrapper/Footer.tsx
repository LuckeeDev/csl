import { Anchor, createStyles } from '@mantine/core';
import { ExternalLinkIcon, GitHubLogoIcon } from '@modulz/radix-icons';
import TextLink from 'components/links/TextLink';
import PackageJSON from '../../../../package.json';

const useStyles = createStyles((theme) => ({
	footer: {
		display: 'flex',
		width: '100%',
		height: '98px',
		borderTop: '1px solid #2C2E33',
		padding: `${theme.spacing.xs}px 20%`,
		alignItems: 'center',
		justifyContent: 'space-between',

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
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
}));

export default function Footer() {
	const { classes } = useStyles();

	return (
		<div className={classes.footer}>
			<div>
				<Anchor
					className={classes.anchor}
					href="https://github.com/LuckeeDev/csl"
					target="_blank"
				>
					<GitHubLogoIcon className={classes.icon} />
					GitHub
					<ExternalLinkIcon />
				</Anchor>

				<span>v{PackageJSON.version}</span>
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
				}}
			>
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

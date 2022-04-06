import { Anchor, createStyles } from '@mantine/core';
import { ExternalLinkIcon, GitHubLogoIcon } from '@modulz/radix-icons';
import TextLink from 'components/links/TextLink';
import VercelLogo from 'components/vercel/VercelLogo';
import PackageJSON from '../../../../package.json';

const useStyles = createStyles((theme) => ({
	footer: {
		display: 'grid',
		width: '100%',
		height: '98px',
		borderTop: '1px solid #2C2E33',
		padding: `${theme.spacing.xs}px 20%`,
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateAreas: '"left vercel right"',
		alignItems: 'center',
		gap: 0,

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			height: '152px',
			padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
			gridTemplateColumns: 'auto auto',
			gridTemplateRows: '80px auto',
			gridTemplateAreas: `
			  "left right"
			  "vercel vercel"
			`,
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
	vercelDiv: {
		justifySelf: 'center',
		width: '212px',
		height: '44px',

		gridArea: 'vercel',
	},
	vercelLink: {
		width: '212px',
		height: '44px',
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
					<GitHubLogoIcon className={classes.icon} />
					GitHub
					<ExternalLinkIcon />
				</Anchor>

				<span>v{PackageJSON.version}</span>
			</div>

			<div className={classes.vercelDiv}>
				<a
					className={classes.vercelLink}
					target="_blank"
					href="https://vercel.com?utm_source=liveyourschool&utm_campaign=oss"
				>
					<VercelLogo backgroundColor="transparent" />
				</a>
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

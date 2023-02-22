// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'CSL Docs',
	tagline: 'All you need to get started',
	url: 'https://docs.cslussana.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'LuckeeDev',
	projectName: 'csl',

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/LuckeeDev/csl/edit/main/apps/docs',
				},
				blog: {
					showReadingTime: true,
					editUrl: 'https://github.com/LuckeeDev/csl/edit/main/apps/docs',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Home',
				logo: {
					alt: 'CSL Logo',
					src: 'img/logo.png',
				},
				items: [
					{
						type: 'doc',
						docId: '/category/setup',
						position: 'left',
						label: 'Docs',
					},
					{ to: '/blog', label: 'Blog', position: 'left' },
					{
						href: 'https://github.com/LuckeeDev/csl',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Setup',
								to: '/docs/category/setup',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'Blog',
								to: '/blog',
							},
							{
								label: 'GitHub',
								href: 'https://github.com/LuckeeDev/csl',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()}, CSL.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;

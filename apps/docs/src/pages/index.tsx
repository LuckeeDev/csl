import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import Head from '@docusaurus/Head';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="/docs/welcome"
					>
						Setup - 5min ⏱️
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	return (
		<Layout title="Home" description="The official CSL documentation.">
			<Head>
				<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
			</Head>

			<HomepageHeader />

			<main>
				<HomepageFeatures />
			</main>

			<script src="/js/identity-check.js"></script>
		</Layout>
	);
}

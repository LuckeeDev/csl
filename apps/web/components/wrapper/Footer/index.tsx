import { Anchor } from '@mantine/core';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import TextLink from 'components/links/TextLink';

import PackageJSON from '@csl/package.json';

import styles from './styles.module.css';

export default function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.leftDiv}>
				<Anchor
					className={styles.anchor}
					href="https://github.com/LuckeeDev/csl"
					target="_blank"
				>
					<IconBrandGithub className={styles.icon} />
					GitHub
					<IconExternalLink />
				</Anchor>

				<span>v{PackageJSON.version}</span>
			</div>

			<div className={styles.rightDiv}>
				<span>Comitato Studentesco Lussana</span>

				<span>
					<TextLink href="/tos" className={styles.anchor}>
						Privacy · Cookies
					</TextLink>
				</span>
			</div>
		</div>
	);
}

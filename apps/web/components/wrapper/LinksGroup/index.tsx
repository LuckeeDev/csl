'use client';

import {
	Box,
	Collapse,
	Group,
	ThemeIcon,
	UnstyledButton,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { WrapperLinkProps } from '../types';
import styles from './styles.module.css'

function LinksControl({ icon: Icon, label, ...props }: WrapperLinkProps) {
	const [opened, setOpened] = useState(false);

	const hasLinks = props.href === null;
	const items = useMemo(
		() =>
			hasLinks
				? props.sublinks.map((link) => (
						<Link className={styles.link} href={link.href} key={link.label}>
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
				className={styles.control}
			>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="light" size={30}>
							<Icon size={20} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>

					{hasLinks && (
						<IconChevronRight
							className={styles.chevron}
							size={20}
							stroke={1.5}
							style={{
								transform: opened ? `rotate(90deg)` : 'none',
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

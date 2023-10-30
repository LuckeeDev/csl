import {
	AppShell,
	Burger,
	Group,
	ScrollArea,
	useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ButtonLink from 'components/links/ButtonLink';
import TextLink from 'components/links/TextLink';
import LoaderDiv from 'components/loader/LoaderDiv';
import { DASHBOARD_LINKS } from 'navigation/dashboard';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from 'public/logo.png';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import DefaultPageWrapper from '../DefaultPageWrapper';
import Footer from '../Footer';
import SideLinks from '../SideLinks';
import UserButton from '../UserButton';
import { WrapperLinkProps } from '../types';
import styles from './styles.module.css';

interface WrapperProps {
	children: ReactNode;
	hasSidebar: boolean;
}

export default function Wrapper({ children, hasSidebar }: WrapperProps) {
	const [open, setOpen] = useState(false);
	const theme = useMantineTheme();
	const { data: session, status } = useSession();
	const router = useRouter();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	useEffect(() => {
		function handleNavClose() {
			if (isMobile && open) {
				setOpen(false);
			}
		}

		router.events.on('routeChangeComplete', handleNavClose);

		return () => {
			router.events.off('routeChangeComplete', handleNavClose);
		};
	}, [router, isMobile, open]);

	const links: WrapperLinkProps[] = useMemo(() => {
		if (status === 'loading') {
			return [];
		}

		// Check if links need any special permission
		return DASHBOARD_LINKS.filter((link) => {
			// Create an array of booleans indicating if the user matches required permissions
			const matchesPermissions = link.requiredPermissions?.map(
				(p) => session?.user.permissions?.includes(p) ?? false
			);

			// If any permission is not met, return false...
			if (matchesPermissions.includes(false)) {
				return false;
			}

			// ...otherwise, return true
			return true;
		});
	}, [session, status]);

	return (
		<>
			<AppShell
				header={{ height: 80 }}
				footer={{ height: 98 }}
				// styles={(theme) => ({
				// 	main: {
				// 		display: 'flex',
				// 		flexDirection: 'column',
				// 		justifyContent: 'space-between',
				// 		...(!hasSidebar && {
				// 			paddingLeft: 0,
				// 			paddingRight: 0,
				// 		}),
				// 		...(isMobile && {
				// 			paddingLeft: 0,
				// 			paddingRight: 0,
				// 		}),
				// 		paddingBottom: 0,
				// 		[`@media (max-width: ${theme.breakpoints.sm})`]: {
				// 			paddingLeft: 0,
				// 			paddingRight: 0,
				// 		},
				// 		height: '100%',
				// 	},
				// })}
				navbar={{
					breakpoint: 'sm',
					width: { sm: 300, lg: 400 },
					collapsed: {
						desktop: !hasSidebar,
						mobile: !hasSidebar || !open,
					},
				}}
			>
				<AppShell.Header>
					<Group
						p="md"
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							height: '100%',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%',
							}}
						>
							{hasSidebar && (
								<Burger
									className={styles.burger}
									opened={open}
									onClick={() => setOpen((o) => !o)}
									size="sm"
									color={theme.colors.gray[6]}
								/>
							)}

							<Link
								href="/"
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Image src={Logo} alt="Logo" height={80} width={80} />
							</Link>

							<TextLink href="/shop">Negozio</TextLink>

							<TextLink href="/events" ml="xs">
								Eventi
							</TextLink>
						</div>

						<ButtonLink href="/dashboard">Dashboard</ButtonLink>
					</Group>
				</AppShell.Header>

				<AppShell.Navbar p="md">
					<AppShell.Section grow component={ScrollArea}>
						{status === 'loading' ? <LoaderDiv /> : <SideLinks links={links} />}
					</AppShell.Section>

					<AppShell.Section>
						<UserButton />
					</AppShell.Section>
				</AppShell.Navbar>

				<AppShell.Main>
					<DefaultPageWrapper>{children}</DefaultPageWrapper>
				</AppShell.Main>

				<AppShell.Footer>
					<Footer />
				</AppShell.Footer>
			</AppShell>
		</>
	);
}

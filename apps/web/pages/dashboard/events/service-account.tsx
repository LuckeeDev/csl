import { Alert, Avatar, Group, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import ButtonLink from 'components/links/ButtonLink';
import { environment } from 'environments/environment';
import useServiceAccount from 'hooks/accounts/useServiceAccount';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getProfile } from '@csl/google';

function DashboardServiceAccount() {
	const router = useRouter();
	const { serviceAccount, updateServiceAccount } = useServiceAccount();

	useEffect(() => {
		if (router.isReady && router.query.accessToken && router.query.idToken) {
			const accessToken = router.query.accessToken as string;
			const idToken = router.query.idToken as string;

			const profile = getProfile(idToken);

			updateServiceAccount({
				accessToken,
				email: profile.email,
				image: profile.picture,
				name: profile.name,
			});

			router.push({ query: {} }, undefined, { shallow: true });
		}
	}, [router, updateServiceAccount]);

	return (
		<DashboardPageContainer>
			<PageHeading>Account di servizio</PageHeading>

			<Alert
				mb="md"
				title="Informazioni sull'account di servizio"
				variant="outline"
				icon={<IconInfoCircle />}
			>
				Nessun dato sull&apos;account di servizio viene salvato nel database
				della piattaforma per ragioni di sicurezza. Per questo motivo, a ogni
				sessione sarà necessario rieffettuare il login per poter usufruire dei
				servizi che richiedono questo account.
			</Alert>

			{serviceAccount && (
				<Group mb="md">
					<Avatar
						size="lg"
						src={serviceAccount.image ?? undefined}
						imageProps={{ referrerPolicy: 'no-referrer' }}
					/>

					<div style={{ flex: 1 }}>
						<Text size="sm" style={{ fontWeight: 500 }}>
							{serviceAccount.name}
						</Text>
						<Text c="dimmed" size="xs">
							{serviceAccount.email}
						</Text>
					</div>
				</Group>
			)}

			<ButtonLink
				variant={serviceAccount ? 'outline' : 'filled'}
				href={`/api/service-account/sign-in?redirectUri=${environment.url}/dashboard/events/service-account`}
			>
				{serviceAccount ? 'Cambia' : 'Collega'} account di servizio
			</ButtonLink>
		</DashboardPageContainer>
	);
}

DashboardServiceAccount.hasSidebar = true;
DashboardServiceAccount.sidebarLinks = EVENT_LINKS;

export default DashboardServiceAccount;

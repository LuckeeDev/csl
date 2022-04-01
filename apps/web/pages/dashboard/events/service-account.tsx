import { Avatar, Group, Text } from '@mantine/core';
import { ServiceAccount } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import ButtonLink from 'components/links/ButtonLink';
import getEndpoint from 'data/api/getEndpoint';
import { environment } from 'environments/environment';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import useSWR from 'swr';

function DashboardServiceAccount() {
	const { data } = useSWR<ServiceAccount>('/api/service-account', getEndpoint);

	return (
		<DashboardPageContainer>
			<PageHeading loading={data === undefined}>
				Account di servizio
			</PageHeading>

			{data && (
				<Group mb="md">
					<Avatar
						size="lg"
						src={data.image ?? undefined}
						imageProps={{ referrerPolicy: 'no-referrer' }}
					/>

					<div style={{ flex: 1 }}>
						<Text size="sm" weight={500}>
							{data.name}
						</Text>
						<Text color="dimmed" size="xs">
							{data.email}
						</Text>
					</div>
				</Group>
			)}

			<ButtonLink
				variant={data ? 'outline' : 'filled'}
				href={`/api/service-account/sign-in?redirectUri=${environment.url}/dashboard/events/service-account`}
			>
				{data ? 'Cambia' : 'Collega'} account di servizio
			</ButtonLink>
		</DashboardPageContainer>
	);
}

DashboardServiceAccount.hasSidebar = true;
DashboardServiceAccount.sidebarLinks = EVENT_LINKS;
DashboardServiceAccount.hasLocalCache = true;

export default DashboardServiceAccount;

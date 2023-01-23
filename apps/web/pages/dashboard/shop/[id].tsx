import { useBooleanToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ShopSession } from '@prisma/client';
import axios from 'axios';
import ShopSessionForm from 'components/forms/ShopSessionForm';
import PageTitle from 'components/head/PageTitle';
import { environment } from 'environments/environment';
import useShopSessionForm, {
	ShopSessionData,
	ShopSessionFormValues,
} from 'hooks/forms/useShopSessionForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { CheckIcon } from '@modulz/radix-icons';
import { LoadingOverlay } from '@mantine/core';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';

interface DashboardShopEditProps {
	shopSession: Omit<ShopSessionData, 'start' | 'end'> & {
		start: string;
		end: string;
	};
}

function DashboardShopEdit({ shopSession }: DashboardShopEditProps) {
	const form = useShopSessionForm({
		...shopSession,
		start: new Date(shopSession.start),
		end: new Date(shopSession.end),
	});
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const router = useRouter();

	async function onSubmit(val: ShopSessionFormValues) {
		toggleOverlay();

		const {
			data: { name, start, end },
		} = await axios.patch<ShopSession>(
			`${environment.url}/api/shop/${router.query.id}`,
			{ shopSession: val },
			{ withCredentials: true }
		);

		form.setValues({
			name,
			start: new Date(start),
			end: new Date(end),
		});

		showNotification({
			title: 'Sessione modificata',
			message: 'Le modifiche sono attive a partire da ora',
			icon: <CheckIcon />,
			color: 'teal',
		});

		toggleOverlay();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Modifica sessione | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

			<PageHeading back>Modifica sessione</PageHeading>

			<ShopSessionForm form={form} onSubmit={onSubmit} />
		</DashboardPageContainer>
	);
}

DashboardShopEdit.hasSidebar = true;
DashboardShopEdit.sidebarLinks = SHOP_LINKS;

export default DashboardShopEdit;

export const getServerSideProps: GetServerSideProps<
	DashboardShopEditProps
> = async (ctx) => {
	const sessionID = ctx.params?.id as string;

	const shopSession = await prisma.shopSession.findUnique({
		where: { id: sessionID },
		select: {
			name: true,
			start: true,
			end: true,
		},
	});

	if (!shopSession) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			shopSession: {
				name: shopSession.name,
				start: shopSession.start.toISOString(),
				end: shopSession.end.toISOString(),
			},
		},
	};
};

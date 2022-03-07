import { WrapperLinkProps } from 'components/wrapper/types';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import PageTitle from 'components/head/PageTitle';
import { getSession } from 'next-auth/react';
import useShopSessionForm, {
	ShopSessionFormValues,
} from 'hooks/useShopSessionForm';
import ShopSessionForm from 'components/forms/ShopSessionForm';
import { useBooleanToggle } from '@mantine/hooks';
import axios from 'axios';
import { useNotifications } from '@mantine/notifications';
import { ShopSession } from '@prisma/client';
import { environment } from 'environments/environment';
import { CheckIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';

interface DashboardShopNewProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardShopNew() {
	const form = useShopSessionForm();
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const notifications = useNotifications();
	const router = useRouter();

	async function onSubmit(val: ShopSessionFormValues) {
		toggleOverlay();

		const {
			data: { id },
		} = await axios.post<ShopSession>(
			// /new is needed because of how Next API routing works
			`${environment.url}/api/shop/new`,
			{ shopSession: val },
			{ withCredentials: true }
		);

		notifications.showNotification({
			title: 'Sessione creata',
			message: 'Ora gli studenti potranno ordinare prodotti in questo periodo!',
			icon: <CheckIcon />,
			color: 'teal',
		});

		toggleOverlay();

		router.push(`/dashboard/shop/${id}`);
	}

	return (
		<>
			<PageTitle>Nuova sessione | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

			<h1>Nuova sessione</h1>

			<ShopSessionForm form={form} onSubmit={onSubmit} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps<DashboardShopNewProps> =
	async (ctx) => {
		const session = await getSession(ctx);

		return {
			props: {
				// return the session to allow instant display in client
				session,
				sidebarLinks: SHOP_LINKS,
				hasSidebar: true,
			},
		};
	};

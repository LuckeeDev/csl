import { SHOP_LINKS } from 'navigation/dashboard/shop';
import PageTitle from 'components/head/PageTitle';
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

function DashboardShopNew() {
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

DashboardShopNew.hasSidebar = true;
DashboardShopNew.sidebarLinks = SHOP_LINKS;

export default DashboardShopNew;

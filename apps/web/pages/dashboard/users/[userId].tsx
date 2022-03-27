import PageHeading from 'components/heading/PageHeading';
import { USERS_LINKS } from 'navigation/dashboard/users';

function DashboardGroup() {
	return (
		<>
			<PageHeading back>Dettagli utente</PageHeading>
		</>
	);
}

DashboardGroup.hasSidebar = true;
DashboardGroup.sidebarLinks = USERS_LINKS;

export default DashboardGroup;

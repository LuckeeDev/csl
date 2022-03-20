import BackHeading from 'components/heading/BackHeading';
import { USERS_LINKS } from 'navigation/dashboard/users';

function DashboardGroup() {
	return (
		<>
			<BackHeading>Dettagli utente</BackHeading>
		</>
	);
}

DashboardGroup.hasSidebar = true;
DashboardGroup.sidebarLinks = USERS_LINKS;

export default DashboardGroup;

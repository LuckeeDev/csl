import { USERS_LINKS } from 'navigation/dashboard/users';

export default function DashboardUsers() {
	return <h1>Utenti</h1>;
}

DashboardUsers.hasLocalCache = true;
DashboardUsers.hasSidebar = true;
DashboardUsers.sidebarLinks = USERS_LINKS;

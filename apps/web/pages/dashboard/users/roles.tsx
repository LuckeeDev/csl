import { USERS_LINKS } from 'navigation/dashboard/users';

export default function DashboardUsersRoles() {
	return <h1>Ruoli</h1>;
}

DashboardUsersRoles.hasLocalCache = true;
DashboardUsersRoles.hasSidebar = true;
DashboardUsersRoles.sidebarLinks = USERS_LINKS;

import { EVENT_LINKS } from 'navigation/dashboard/events';

function DashboardSeminarsNew() {
	return (
		<>
			<h1>Nuovo seminario</h1>
		</>
	);
}

DashboardSeminarsNew.hasSidebar = true;
DashboardSeminarsNew.sidebarLinks = EVENT_LINKS;
DashboardSeminarsNew.hasLocalCache = true;

export default DashboardSeminarsNew;

import PageTitle from '@/components/head/PageTitle';
import MuiNextLink from '@/components/link/MuiNextLink';
import ThemeSwitch from '@/components/switch/ThemeSwitch';

export function Index() {
	return (
		<>
			<PageTitle>Home</PageTitle>

			<ThemeSwitch />
			<MuiNextLink href="/auth/login">Login</MuiNextLink>
		</>
	);
}

export default Index;

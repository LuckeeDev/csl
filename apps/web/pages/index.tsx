import PageTitle from '@/components/head/PageTitle';
import { MuiNextLink } from '@/components/link';

export function Index() {
	return (
		<>
			<PageTitle>Home</PageTitle>

			<MuiNextLink href="/auth/login">Login</MuiNextLink>
		</>
	);
}

export default Index;

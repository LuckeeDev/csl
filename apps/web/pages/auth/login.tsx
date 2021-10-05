import { StrapiLoginProvider } from '@csl/types';
import login from '@/utils/auth/login';
import { Button } from '@mui/material';
import { GetStaticProps } from 'next';
import { environment } from '@/environments/environment';
import PageTitle from '@/components/head/PageTitle';

interface LoginPageProps {
	providers: StrapiLoginProvider[];
}

export default function LoginPage({ providers }: LoginPageProps) {
	return (
		<>
			<PageTitle>Login</PageTitle>

			<div>
				{providers.map((provider, i) => (
					<Button key={i} onClick={() => login(provider.name)}>
						{provider.name}
					</Button>
				))}
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<LoginPageProps> = async () => {
	const providersURL = `${environment.strapi}/users-permissions/providers`;

	const providers = await fetch(providersURL).then((res) => res.json());

	const providersArray: StrapiLoginProvider[] = Object.entries(providers)
		.map(
			([name, provider]: [
				StrapiLoginProvider['name'],
				StrapiLoginProvider
			]) => ({
				name,
				...provider,
			})
		)
		.filter((val) => val.enabled === true)
		// TODO: remove this line
		.filter((val) => val.name === 'google');

	return {
		props: {
			providers: providersArray,
		},
		// Revalidate data every ten minutes
		revalidate: 60 * 10,
	};
};

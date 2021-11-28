import MainArticle from '@/components/article/MainArticle.server';
import SignupModal from '@/components/auth/signup/SignupModal.client';
import PageTitle from '@/components/head/PageTitle';
import StyledHomePage from '@/components/pages/HomePage';
import { environment } from '@/environments/environment';
import { GET_HOME_QUERY } from '@/graphql/queries/getHome';
import serverQuery from '@/graphql/serverQuery';
import useSession from '@/hooks/session/useSession';
import { StrapiHome } from '@csl/types';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface HomePageProps {
	home: StrapiHome;
}

export default function Index({ home }: HomePageProps) {
	const router = useRouter();
	const { user } = useSession();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (router.query.signup) {
			if (user && (!user.name || !user.group)) {
				setIsModalOpen(true);
			} else {
				router.push('/');
			}
		}
	}, [user, router]);

	return (
		<StyledHomePage>
			<PageTitle>Home</PageTitle>

			<h1>{home.title}</h1>
			<h2>{home.description}</h2>

			<MainArticle article={home.main_article} />

			<SignupModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</StyledHomePage>
	);
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (ctx) => {
	const { data } = await serverQuery<{ home: StrapiHome }>(GET_HOME_QUERY, {
		apiToken: environment.apiToken,
	});

	return {
		props: {
			home: data.home,
		},
		// Revalidate every 10 minutes
		revalidate: 10 * 60,
	};
};

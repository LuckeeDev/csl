import MainArticle from '@/components/article/MainArticle.server';
import SignupModal from '@/components/auth/signup/SignupModal.client';
import PageTitle from '@/components/head/PageTitle';
import StyledHeroSection from '@/components/pages/home/HeroSection';
import StyledHomePage from '@/components/pages/HomePage';
import { environment } from '@/environments/environment';
import { GET_HOME_QUERY } from '@/graphql/queries/getHome';
import serverQuery from '@/graphql/serverQuery';
import useSession from '@/hooks/session/useSession';
import { StrapiHome } from '@csl/types';
import { Button, Divider } from '@mui/material';
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

			<StyledHeroSection>
				<div className="text">
					<h1 className="title">{home.title}</h1>
					<h2 className="description">{home.description}</h2>

					<Button className="button" variant="outlined">Scopri di più</Button>
				</div>

				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={environment.strapi + home.image.url}
					alt={home.image.caption}
					className="image"
				/>
			</StyledHeroSection>

			<Divider />

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

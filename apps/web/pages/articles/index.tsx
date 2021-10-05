import serverQuery from '@/graphql/serverQuery';
import { gql } from '@apollo/client';
import { StrapiArticle } from '@csl/types';
import { GetStaticProps } from 'next';

const GET_ARTICLES_QUERY = gql`
	query {
		articles {
			title
		}
	}
`;

interface ArticlesHomePageProps {
	articles: StrapiArticle[];
}

export default function ArticlesHomePage(props: ArticlesHomePageProps) {
	return (
		<>
			{props.articles.map(({ title }, i) => (
				<p key={i}>{title}</p>
			))}
		</>
	);
}

export const getStaticProps: GetStaticProps<ArticlesHomePageProps> = async (
	ctx
) => {
	const { data } = await serverQuery<{ articles: StrapiArticle[] }>(
		GET_ARTICLES_QUERY,
		{
			jwt: process.env.JWT,
		}
	);

	return {
		props: {
			requireAuth: true,
			articles: data.articles,
		},
		// Revalidate every 10 minutes
		revalidate: 10 * 60,
	};
};

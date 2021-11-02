import MainArticle from '@/components/article/MainArticle';
import PageTitle from '@/components/head/PageTitle';
import { environment } from '@/environments/environment';
import { GET_ARTICLES_QUERY } from '@/graphql/queries/getArticles';
import serverQuery from '@/graphql/serverQuery';
import { StrapiArticle } from '@csl/types';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';

const StyledArticlesHomeContainer = styled.div`
	padding: 20px 20% 50px;
`;

interface ArticlesHomePageProps {
	articles: StrapiArticle[];
}

export default function ArticlesHomePage(props: ArticlesHomePageProps) {
	return (
		<StyledArticlesHomeContainer>
			<PageTitle>Articoli</PageTitle>

			{props.articles.map((article, i) => (
				<MainArticle article={article} key={i} />
			))}
		</StyledArticlesHomeContainer>
	);
}

export const getStaticProps: GetStaticProps<ArticlesHomePageProps> = async (
	ctx
) => {
	const { data } = await serverQuery<{ articles: StrapiArticle[] }>(
		GET_ARTICLES_QUERY,
		{
			apiToken: environment.apiToken,
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

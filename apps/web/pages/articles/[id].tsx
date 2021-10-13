import PageTitle from '@/components/head/PageTitle';
import { environment } from '@/environments/environment';
import { GET_ARTICLES_QUERY } from '@/graphql/queries/getArticles';
import serverQuery from '@/graphql/serverQuery';
import { gql } from '@apollo/client';
import { StrapiArticle } from '@csl/types';
import { CircularProgress } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Article from '@/components/pages/Article';

const GET_ARTICLE_QUERY = gql`
	query Article($id: ID!) {
		article(id: $id) {
			title
			content
			author
			category {
				name
			}
			published_at
			cover {
				url
				caption
			}
			reading_time
			snippet
		}
	}
`;

interface ArticlePageProps {
	article: StrapiArticle;
	requireAuth: boolean;
}

export default function ArticlePage({ article }: ArticlePageProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <CircularProgress />;
	}

	return (
		<>
			<PageTitle>{article.title}</PageTitle>

			<Article article={article} />
		</>
	);
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (ctx) => {
	const { data } = await serverQuery<{ article: StrapiArticle }>(
		GET_ARTICLE_QUERY,
		{
			apiToken: environment.apiToken,
			variables: {
				id: Number(ctx.params.id),
			},
		}
	);

	return {
		props: {
			requireAuth: true,
			article: data.article,
		},
		// Revalidate every 10 minutes
		revalidate: 10 * 60,
	};
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await serverQuery<{ articles: StrapiArticle[] }>(
		GET_ARTICLES_QUERY,
		{
			apiToken: environment.apiToken,
		}
	);

	const paths = data.articles.map(({ id }) => `/articles/${id}`);

	return {
		paths,
		fallback: true,
	};
};

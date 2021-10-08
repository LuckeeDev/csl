import PageTitle from '@/components/head/PageTitle';
import { MuiNextLink } from '@/components/link';
import { environment } from '@/environments/environment';
import { GET_ARTICLES_QUERY } from '@/graphql/queries/getArticles';
import serverQuery from '@/graphql/serverQuery';
import { StrapiArticle } from '@csl/types';
import { GetStaticProps } from 'next';

interface ArticlesHomePageProps {
	articles: StrapiArticle[];
}

export default function ArticlesHomePage(props: ArticlesHomePageProps) {
	return (
		<>
			<PageTitle>Articoli</PageTitle>

			{props.articles.map(({ title, id }, i) => (
				<MuiNextLink key={i} href={`/articles/${id}`}>
					{title}
				</MuiNextLink>
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

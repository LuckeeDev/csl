import { StrapiArticle } from '@csl/types';
import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material';
import Markdown from '../markdown/Markdown';

const StyledArticleContainer = styled.div`
	width: 100%;
	padding: 30px 20% 80px;
	display: flex;
	flex-direction: column;
`;

const StyledDataContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	p {
		margin: 0;
	}
`;

const LeftDataContainer = styled.div``;

const RightDataContainer = styled.div`
	text-align: right;
`;

const StyledArticleTitle = styled.h1`
	margin-bottom: 0;
`;

const StyledMarkdownSnippet = muiStyled('p')(({ theme }) => ({
	color: theme.palette.text.secondary,
	marginTop: 0,
}));

interface ArticleProps {
	article: StrapiArticle;
}

export default function Article({ article }: ArticleProps) {
	const date = new Date(article.published_at).toLocaleDateString('it');

	return (
		<StyledArticleContainer>
			<StyledDataContainer>
				<LeftDataContainer>
					<p>{article.category.name}</p>
					<p>Scritto da {article.author}</p>
				</LeftDataContainer>

				<RightDataContainer>
					<p>{date}</p>
					<p>Lettura di {article.reading_time} minuti</p>
				</RightDataContainer>
			</StyledDataContainer>

			<StyledArticleTitle>{article.title}</StyledArticleTitle>

			<StyledMarkdownSnippet>{article.snippet}</StyledMarkdownSnippet>

			<Markdown>{article.content}</Markdown>
			
			<i>{article.author}</i>
		</StyledArticleContainer>
	);
}

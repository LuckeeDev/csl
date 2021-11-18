import { environment } from '@/environments/environment';
import { StrapiArticle } from '@csl/types';
import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const StyledArticleLink = styled.a`
	color: inherit;
	text-decoration: none;
`;

const StyledPreviewContainer = styled.div`
	display: grid;
	grid-template-columns: 40% 60%;
	grid-gap: 10px;
	align-items: center;
`;

const StyledArticleTitle = styled.h2`
	margin: 0 0 10px;
`;

const StyledSnippet = muiStyled('p')(({ theme }) => ({
	color: theme.palette.text.secondary,
	marginTop: 0,
	marginBottom: 0,
}));

interface SideArticleProps {
	article: StrapiArticle;
}

export default function SideArticle(props: SideArticleProps) {
	return (
		<Link href={`articles/${props.article.id}`} passHref>
			<StyledArticleLink>
				<StyledPreviewContainer>
					<Image
						src={environment.strapi + props.article.cover.url}
						alt={props.article.cover.caption}
						height={400}
						width={400}
					/>

					<div>
						<StyledArticleTitle>{props.article.title}</StyledArticleTitle>
						<StyledSnippet>{props.article.snippet}</StyledSnippet>
					</div>
				</StyledPreviewContainer>
			</StyledArticleLink>
		</Link>
	);
}

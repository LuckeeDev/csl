import { environment } from '@/environments/environment';
import { StrapiArticle } from '@csl/types';
import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const StyledPreviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const StyledImageContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	max-height: 400px;
	object-fit: contain;
	position: relative;
	overflow: hidden;
`;

interface StyledBackgroundProps {
	image: string;
}

const StyledBackground = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	background-image: ${(props: StyledBackgroundProps) => `url(${props.image})`};
	filter: blur(4px);
`;

const StyledArticleLink = styled.a`
	color: inherit;
	text-decoration: none;
`;

const StyledSnippet = muiStyled('p')(({ theme }) => ({
	color: theme.palette.text.secondary,
	marginTop: 0,
}));

interface MainArticleProps {
	article: StrapiArticle;
}

export default function MainArticle(props: MainArticleProps) {
	return (
		<Link href={`articles/${props.article.id}`} passHref>
			<StyledArticleLink>
				<StyledPreviewContainer>
					<StyledImageContainer>
						<StyledBackground image={environment.strapi + props.article.cover.url}/>

						<Image
							src={environment.strapi + props.article.cover.url}
							alt={props.article.cover.caption}
							height={400}
							width={400}
						/>
					</StyledImageContainer>

					<h2>{props.article.title}</h2>
					<StyledSnippet>{props.article.snippet}</StyledSnippet>
				</StyledPreviewContainer>
			</StyledArticleLink>
		</Link>
	);
}

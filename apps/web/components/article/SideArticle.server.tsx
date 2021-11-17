import { environment } from '@/environments/environment';
import { StrapiArticle } from '@csl/types';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

const StyledArticleLink = styled.a`
	color: inherit;
	text-decoration: none;
`;

const StyledPreviewContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 5px;
	box-sizing: border-box;
	max-height: 150px;
`;

const StyledImageContainer = styled.div`
	max-width: 40%;
`;

const StyledArticleTitle = styled.h2`
	margin-left: 10px;
`;

interface SideArticleProps {
	article: StrapiArticle;
}

export default function SideArticle(props: SideArticleProps) {
	return (
		<Link href={`articles/${props.article.id}`} passHref>
			<StyledArticleLink>
				<StyledPreviewContainer>
					<StyledImageContainer>
						<Image
							src={environment.strapi + props.article.cover.url}
							alt={props.article.cover.caption}
							height={400}
							width={400}
						/>
					</StyledImageContainer>

					<StyledArticleTitle>{props.article.title}</StyledArticleTitle>
				</StyledPreviewContainer>
			</StyledArticleLink>
		</Link>
	);
}

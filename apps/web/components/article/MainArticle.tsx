import { environment } from '@/environments/environment';
import { StrapiArticle } from '@csl/types';
import styled from '@emotion/styled';
import Image from 'next/image';

const StyledPreviewContainer = styled.div`
	display: flex;
`;

interface MainArticleProps {
	article: StrapiArticle;
}

export default function MainArticle(props: MainArticleProps) {
	return (
		<StyledPreviewContainer>
			<Image
				src={environment.strapi + props.article.cover.url}
				alt={props.article.cover.caption}
				height={300}
				width={300}
			/>
		</StyledPreviewContainer>
	);
}

import gql from 'graphql-tag';

export const GET_ALL_ARTICLES = gql`
	query {
		articles {
			title
			content
			author
			published_at
			category {
				name
				color
			}
			cover {
				url
			}
		}
	}
`;

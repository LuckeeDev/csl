import { gql } from '@apollo/client';

export const GET_ARTICLES_QUERY = gql`
	query {
		articles {
			title
			id
		}
	}
`;

import { gql } from '@apollo/client';

export const GET_HOME_QUERY = gql`
	query {
		home {
			title
			description
			image {
				url
				caption
			}
			main_article {
				id
				title
				snippet
				cover {
					url
				}
			}
		}
	}
`;

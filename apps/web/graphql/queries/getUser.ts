import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
	query {
		me {
			username
			email
			name
			confirmed
			blocked
			role {
				type
			}
			group {
				name
			}
		}
	}
`;

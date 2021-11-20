import gql from 'graphql-tag';

export const GET_LOGGEDIN_USER = gql`
	query {
		me {
			email
			username
			name
			group {
				name
			}
			role {
				name
				type
			}
		}
	}
`;

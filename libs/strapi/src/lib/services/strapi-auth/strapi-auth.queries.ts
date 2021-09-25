import gql from 'graphql-tag';

export const GET_LOGGEDIN_USER = gql`
	query {
		me {
			email
			username
			name
			classroom {
				name
			}
			role {
				name
				type
			}
		}
	}
`;

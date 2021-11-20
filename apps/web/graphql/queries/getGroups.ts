import { gql } from '@apollo/client';

export const GET_GROUPS_QUERY = gql`
	query {
		groups(sort: "name:ASC") {
			id
			name
		}
	}
`;

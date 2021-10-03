import { DocumentNode, useQuery } from '@apollo/client';
import { GraphQLQueryOptions } from '@csl/types';
import useSession from '../session/useSession';

export default function useGraphQL(
	query: DocumentNode,
	options?: GraphQLQueryOptions
) {
	const {
		session: { jwt },
	} = useSession();

	const token = options?.jwt ?? jwt;

	const result = useQuery(query, {
		context: {
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		},
		fetchPolicy: options?.useCache === false ? 'network-only' : 'cache-first',
	});

	return result;
}

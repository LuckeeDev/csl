import { DocumentNode, useQuery } from '@apollo/client';
import { GraphQLQueryOptions } from '@csl/types';

export default function useGraphQL(
	query: DocumentNode,
	options?: Omit<GraphQLQueryOptions, 'jwt'>
) {
	const result = useQuery(query, {
		fetchPolicy: options?.useCache === false ? 'network-only' : 'cache-first',
	});

	return result;
}

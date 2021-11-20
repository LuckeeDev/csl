import { DocumentNode, useQuery } from '@apollo/client';
import { GraphQLQueryOptions } from '@csl/types';

export default function useGraphQL<T = unknown>(
	query: DocumentNode,
	options?: Omit<GraphQLQueryOptions, 'jwt' | 'apiToken'>
) {
	const result = useQuery<T>(query, {
		fetchPolicy: options?.useCache === false ? 'network-only' : 'cache-first',
	});

	return result;
}

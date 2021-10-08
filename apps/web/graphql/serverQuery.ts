import client from '@/graphql/client';
import { ApolloQueryResult } from '@apollo/client';
import { GraphQLQueryOptions } from '@csl/types';
import { DocumentNode } from 'graphql';

export default async function serverQuery<T>(
	query: DocumentNode,
	options?: GraphQLQueryOptions
): Promise<ApolloQueryResult<T>> {
	return await client.query<T>({
		query,
		fetchPolicy: options?.useCache === false ? 'network-only' : 'cache-first',
		context: {
			headers: {
				...(options.jwt && {
					Authorization: `Bearer ${options.jwt}`,
				}),
				...(options.apiToken && {
					Token: options.apiToken,
				}),
			},
		},
		...(options.variables && { variables: options.variables }),
	});
}

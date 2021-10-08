export interface GraphQLQueryOptions {
	jwt?: string;
	useCache?: boolean;
	apiToken?: string;
	variables?: Record<string, unknown>;
}

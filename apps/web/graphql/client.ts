import { environment } from '@/environments/environment';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: `${environment.strapi}/graphql`,
	cache: new InMemoryCache(),
});

export default client;

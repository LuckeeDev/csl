import { environment } from '@/environments/environment';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
	uri: `${environment.strapi}/graphql`,
	credentials: 'include',
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

export default client;

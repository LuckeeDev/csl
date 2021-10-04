import client from '@/graphql/client';
import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { SessionContextModel } from '../session/SessionContext';
import SessionProvider from '../session/SessionProvider';
import { CustomThemeContextModel } from '../theme/CustomThemeContext';
import CustomThemeProvider from '../theme/CustomThemeProvider';

interface ProvidersProps {
	themeContext: CustomThemeContextModel;
	sessionContext: SessionContextModel;
	children: ReactNode;
}

export default function Providers(props: ProvidersProps) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={props.sessionContext}>
				<CustomThemeProvider context={props.themeContext}>
					{props.children}
				</CustomThemeProvider>
			</SessionProvider>
		</ApolloProvider>
	);
}

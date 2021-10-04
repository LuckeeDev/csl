import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import CustomThemeContext, {
	CustomThemeContextModel,
} from './CustomThemeContext';

interface CustomThemeProviderProps {
	context: CustomThemeContextModel;
	children: ReactNode;
}

export default function CustomThemeProvider(props: CustomThemeProviderProps) {
	return (
		<ThemeProvider theme={props.context.theme}>
			<CustomThemeContext.Provider value={props.context}>
				{props.children}
			</CustomThemeContext.Provider>
		</ThemeProvider>
	);
}

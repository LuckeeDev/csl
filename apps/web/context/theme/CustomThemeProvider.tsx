import { Theme, ThemeProvider } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';
import ToggleThemeContext from './ToggleThemeContext';

interface CustomThemeProviderProps {
	light: Theme;
	dark: Theme;
	children: ReactNode;
}

export default function CustomThemeProvider(props: CustomThemeProviderProps) {
	const [theme, setTheme] = useState(props.light);
	const lastTheme = useRef<'dark' | 'light'>('light');

	function toggleTheme() {
		setTheme(() => {
			if (lastTheme.current === 'dark') {
				lastTheme.current = 'light';
				return props.light;
			} else if (lastTheme.current === 'light') {
				lastTheme.current = 'dark';
				return props.dark;
			}
		});
	}

	return (
		<ThemeProvider theme={theme}>
			<ToggleThemeContext.Provider value={toggleTheme}>
				{props.children}
			</ToggleThemeContext.Provider>
		</ThemeProvider>
	);
}

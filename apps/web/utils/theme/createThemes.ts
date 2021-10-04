import { createTheme, Theme } from '@mui/material';

interface CreateThemesResult {
	dark: Theme;
	light: Theme;
}

export default function createThemes(): CreateThemesResult {
	const dark = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const light = createTheme({
		palette: {
			mode: 'light',
		},
	});

	return { dark, light };
}

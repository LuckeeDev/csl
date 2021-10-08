import { createTheme, Theme, ThemeOptions } from '@mui/material';

interface CreateThemesResult {
	dark: Theme;
	light: Theme;
}

const GLOBAL_THEME_OPTIONS: ThemeOptions = {
	typography: {
		fontFamily: 'Product Sans',
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				color: 'default',
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				variant: 'contained',
			},
		},
		MuiFab: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					borderRadius: 10,
				},
				sizeSmall: {
					borderRadius: 8,
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					borderRadius: 10,
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: 10,
				},
			},
		},
		MuiRadio: {
			defaultProps: {
				color: 'primary',
			},
		},
		MuiSwitch: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiTab: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiTable: {
			defaultProps: {
				stickyHeader: true,
			},
		},
		MuiTabs: {
			defaultProps: {
				indicatorColor: 'primary',
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
			},
		},
		MuiTooltip: {
			defaultProps: {
				arrow: true,
			},
		},
	},
	shape: {
		borderRadius: 8,
	},
};

export default function createThemes(): CreateThemesResult {
	const dark = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#2196f3',
			},
		},
		...GLOBAL_THEME_OPTIONS,
	});

	const light = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#0d47a1',
			},
		},
		...GLOBAL_THEME_OPTIONS,
	});

	return { dark, light };
}

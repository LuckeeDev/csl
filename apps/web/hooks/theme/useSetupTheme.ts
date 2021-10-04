import { CustomThemeContextModel } from '@/context/theme/CustomThemeContext';
import {
	PREFERS_DARK_SCHEME,
	PREFERS_LIGHT_SCHEME,
	THEME_LOCAL_TOKEN,
} from '@/tokens';
import { Theme, useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

enum ThemeMode {
	DARK = 'DARK',
	LIGHT = 'LIGHT',
}

interface UseSetupThemeParams {
	dark: Theme;
	light: Theme;
}

export default function useSetupTheme({
	dark,
	light,
}: UseSetupThemeParams): CustomThemeContextModel {
	const [currentTheme, setCurrentTheme] = useState<ThemeMode>(null);
	const prefersDark = useMediaQuery(PREFERS_DARK_SCHEME);
	const prefersLight = useMediaQuery(PREFERS_LIGHT_SCHEME);

	useEffect(() => {
		const localTheme = localStorage.getItem(THEME_LOCAL_TOKEN);

		if (
			localTheme &&
			(localTheme === ThemeMode.DARK || localTheme === ThemeMode.LIGHT)
		) {
			setCurrentTheme(localTheme);
		} else if (prefersDark === true) {
			setCurrentTheme(ThemeMode.DARK);
		} else if (prefersLight === true) {
			setCurrentTheme(ThemeMode.LIGHT);
		} else {
			// As with the other if-else-if statements, DARK is used as the default fallback
			// value for the theme
			setCurrentTheme(ThemeMode.DARK);
		}
		// Disable exhaustive deps because we only need this to run at runtime
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggle = useCallback(() => {
		setCurrentTheme(() => {
			if (currentTheme === ThemeMode.DARK) {
				localStorage.setItem(THEME_LOCAL_TOKEN, ThemeMode.LIGHT);
				return ThemeMode.LIGHT;
			} else {
				localStorage.setItem(THEME_LOCAL_TOKEN, ThemeMode.DARK);
				return ThemeMode.DARK;
			}
		});
	}, [currentTheme]);

	const theme = useMemo(() => {
		if (currentTheme === ThemeMode.LIGHT) {
			return light;
		} else {
			return dark;
		}
	}, [currentTheme, dark, light]);

	const switchChecked = useMemo(() => {
		if (currentTheme === ThemeMode.LIGHT) {
			return false;
		} else {
			return true;
		}
	}, [currentTheme]);

	return {
		theme,
		toggle,
		switchChecked,
	};
}

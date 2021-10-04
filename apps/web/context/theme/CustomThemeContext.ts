import { Theme } from '@mui/material';
import { createContext } from 'react';

export interface CustomThemeContextModel {
	toggle: () => void;
	theme: Theme;
	switchChecked: boolean;
}

const ToggleThemeContext = createContext<CustomThemeContextModel>(null);

export default ToggleThemeContext;

import ToggleThemeContext from '@/context/theme/ToggleThemeContext';
import { useContext } from 'react';

export default function useToggleTheme() {
	return useContext(ToggleThemeContext);
}

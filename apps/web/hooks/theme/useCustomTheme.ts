import CustomThemeContext from '@/context/theme/CustomThemeContext';
import { useContext } from 'react';

export default function useCustomTheme() {
	return useContext(CustomThemeContext);
}

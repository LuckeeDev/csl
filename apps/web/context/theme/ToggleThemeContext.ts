import { createContext } from 'react';

type ToggleThemeContextModel = () => void;

const ToggleThemeContext = createContext<ToggleThemeContextModel>(null);

export default ToggleThemeContext;

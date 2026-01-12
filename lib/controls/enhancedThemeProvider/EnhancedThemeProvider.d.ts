import { ITheme } from "@fluentui/react/lib/Styling";
import IEnhancedThemeProviderProps from './IEnhancedThemeProviderProps';
import { ThemeContext, useTheme } from '@fluentui/react-theme-provider';
declare const getDefaultTheme: () => ITheme;
declare const EnhancedThemeProvider: (props: IEnhancedThemeProviderProps) => JSX.Element;
export { EnhancedThemeProvider, getDefaultTheme, useTheme, ThemeContext };
//# sourceMappingURL=EnhancedThemeProvider.d.ts.map
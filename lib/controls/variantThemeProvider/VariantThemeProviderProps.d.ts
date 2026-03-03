import { ThemeProviderProps } from "@fluentui/react-theme-provider/lib/ThemeProvider.types";
export interface VariantThemeProviderProps extends ThemeProviderProps {
    variantType?: VariantType;
    themeColors?: IThemeColors;
}
export declare enum VariantType {
    None = 0,
    Neutral = 1,
    Soft = 2,
    Strong = 3
}
export interface IThemeColors {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
}
//# sourceMappingURL=VariantThemeProviderProps.d.ts.map
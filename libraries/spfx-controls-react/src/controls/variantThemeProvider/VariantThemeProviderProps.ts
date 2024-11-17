import { ThemeProviderProps } from "@fluentui/react-theme-provider/lib/ThemeProvider.types";

export interface VariantThemeProviderProps extends ThemeProviderProps {
    variantType?: VariantType;
    themeColors?: IThemeColors;
}

export enum VariantType {
    None,
    Neutral,
    Soft,
    Strong
}

export interface IThemeColors {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
}
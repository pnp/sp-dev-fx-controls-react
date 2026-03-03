import { ThemeInput } from "@fluentui/react-northstar";
import { IPartialTheme, ITheme } from "@fluentui/react/lib/Styling";
import { ComponentVariablesObject } from "@fluentui/styles";
export declare const themes: {
    [themeKey: string]: ThemeInput<any>;
};
export declare const teamsNextVariableAssignments: {
    componentStyles: {
        Box: {
            root: ({ variables }: ComponentVariablesObject) => {
                backgroundColor: any;
                boxShadow: any;
            };
        };
        Button: {
            root: ({ variables }: ComponentVariablesObject) => {
                color: any;
            };
        };
        ButtonContent: {
            root: ({ variables }: ComponentVariablesObject) => {
                fontWeight: any;
            };
        };
        Card: {
            root: ({ variables }: ComponentVariablesObject) => {
                boxShadow: any;
                "&:hover": {
                    boxShadow: any;
                };
                "&:focus": {
                    boxShadow: any;
                };
            };
        };
        Flex: {
            root: ({ variables }: ComponentVariablesObject) => {
                color: any;
                backgroundColor: any;
                boxShadow: any;
            };
        };
        ToolbarItem: {
            root: ({ variables }: ComponentVariablesObject) => {
                color: any;
                fontWeight: any;
            };
        };
        PopupContent: {
            content: ({ variables }: ComponentVariablesObject) => {
                boxShadow: any;
                borderWidth: any;
            };
        };
        PopupButton: {
            root: ({ variables }: ComponentVariablesObject) => {
                color: any;
            };
        };
        TableRow: {
            root: ({ variables }: ComponentVariablesObject) => {
                height: any;
                minHeight: any;
                alignItems: any;
            };
        };
        TableCell: {
            root: ({ variables }: ComponentVariablesObject) => {
                paddingTop: any;
                paddingBottom: any;
            };
        };
        TreeItem: {
            root: ({ variables }: ComponentVariablesObject) => {
                color: any;
            };
        };
    };
};
export declare const getFluentUIThemeOrDefault: (theme?: IPartialTheme | ITheme) => ITheme;
//# sourceMappingURL=ThemeUtility.d.ts.map
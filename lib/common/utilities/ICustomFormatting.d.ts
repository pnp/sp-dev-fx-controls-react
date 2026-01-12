import { CSSProperties } from "react";
export interface ICustomFormattingExpressionNode {
    operator: string;
    operands: (string | number | ICustomFormattingExpressionNode)[];
}
export interface ICustomFormattingNode {
    elmType: keyof HTMLElementTagNameMap;
    iconName: string;
    style: CSSProperties;
    attributes?: {
        [key: string]: string;
    };
    children?: ICustomFormattingNode[];
    txtContent?: string;
}
export interface ICustomFormattingBodySection {
    displayname: string;
    fields: string[];
}
export interface ICustomFormatting {
    headerJSONFormatter: ICustomFormattingNode;
    bodyJSONFormatter: {
        sections: ICustomFormattingBodySection[];
    };
    footerJSONFormatter: ICustomFormattingNode;
}
//# sourceMappingURL=ICustomFormatting.d.ts.map
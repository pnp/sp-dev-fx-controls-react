import { CSSProperties } from "react";

interface ICustomFormattingNode {
    elmType: keyof HTMLElementTagNameMap;
    style: CSSProperties;
    children?: ICustomFormattingNode[];
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
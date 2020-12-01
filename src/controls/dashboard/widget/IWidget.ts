export interface IWidgetActionKey {
    id: string;
    icon?: JSX.Element;
    title: string;
    onClick?: () => void;
}

export enum WidgetSize {
    Single = "single",
    Double = "double",
    Triple = "triple",
    Box = "box",
}

export interface IWidgetControlOptions {
    isHidden?: boolean;
}

export interface IWidget {
    size: WidgetSize;
    title: string;
    desc?: string;
    widgetActionGroup?: IWidgetActionKey[];
    controlOptions?: IWidgetControlOptions;
    body?: IWidgetBodyContent[];
    link?: IWidgetLink;
}

export interface IWidgetBodyContent {
    id: string;
    title: string;
    content: React.ReactNode;
}

export interface IWidgetLink {
    href: string;
}

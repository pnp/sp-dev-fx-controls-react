import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IWebPartTitleProps {
    displayMode: DisplayMode;
    title: string;
    updateProperty: (value: string) => void;
    className?: string;
    placeholder?: string;
    moreLink?: JSX.Element | (() => React.ReactNode);
    themeVariant?: IReadonlyTheme;
}
/**
 * Web Part Title component
 */
export declare class WebPartTitle extends React.Component<IWebPartTitleProps, {}> {
    /**
     * Constructor
     */
    constructor(props: IWebPartTitleProps);
    /**
     * Process the text area change
     */
    private _onChange;
    /**
     * Default React component render method
     */
    render(): React.ReactElement<IWebPartTitleProps>;
}
//# sourceMappingURL=WebPartTitle.d.ts.map
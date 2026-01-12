import * as React from 'react';
import { IExpandingCardProps } from '@fluentui/react/lib/HoverCard';
export interface IFieldUserHoverCardProps {
    /**
     * IExpandingCardProps
     */
    expandingCardProps: IExpandingCardProps;
    /**
     * User display name
     */
    displayName: string;
    /**
     * CSS styles to apply to the renderer
     */
    cssProps?: React.CSSProperties;
}
export interface IFieldUserHoverCardState {
    contentRendered?: HTMLDivElement;
}
/**
 * Component to render User name with related Hover Card
 */
export default class FieldUserHoverCard extends React.Component<IFieldUserHoverCardProps, IFieldUserHoverCardState> {
    constructor(props: IFieldUserHoverCardProps);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldUserHoverCard.d.ts.map
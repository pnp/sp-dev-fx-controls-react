import * as React from 'react';
export interface IRenderHeaderProps {
    onDismiss: (open?: boolean) => void;
    icon?: string | JSX.Element;
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
}
export declare const RenderHeader: React.FunctionComponent<IRenderHeaderProps>;
//# sourceMappingURL=RenderHeader.d.ts.map
import * as React from 'react';
export interface IRenderSpinnerProps {
    size: "medium" | "small" | "extra-tiny" | "tiny" | "extra-small" | "large" | "extra-large" | "huge";
    label?: string;
    labelPosition?: "above" | "below" | "before" | "after";
    style?: React.CSSProperties;
    className?: string;
}
export declare const RenderSpinner: React.FunctionComponent<IRenderSpinnerProps>;
//# sourceMappingURL=RenderSpinner.d.ts.map
import * as React from "react";
import { IDialogProps } from '@fluentui/react/lib/Dialog';
export interface IAnimatedDialogProps extends IDialogProps {
    dialogAnimationInType?: string;
    dialogAnimationOutType?: string;
    iconName?: string;
    iconAnimationType?: string;
    showAnimatedDialogFooter?: boolean;
    okButtonText?: string;
    onOkClick?: () => void;
    cancelButtonText?: string;
    onSuccess?: () => void;
    onError?: () => void;
}
export declare function AnimatedDialog(props: React.PropsWithChildren<IAnimatedDialogProps>): JSX.Element;
//# sourceMappingURL=AnimatedDialog.d.ts.map
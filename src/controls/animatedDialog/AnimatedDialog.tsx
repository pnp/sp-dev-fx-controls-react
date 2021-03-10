import * as React from "react";
import { useEffect, useState } from 'react';
import styles from './AnimatedDialog.module.scss';
import { Dialog, IDialogProps } from 'office-ui-fabric-react/lib/Dialog';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

// Animate.min.css
require('../../../node_modules/animate.css/animate.min.css');

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

export function AnimatedDialog(props: React.PropsWithChildren<IAnimatedDialogProps>) {

    const [dialogProps, setDialogProps] = useState<IDialogProps>(props);
    const [loading, setLoading] = useState<boolean>(false);

    const { dialogAnimationInType, dialogAnimationOutType,
        iconName, iconAnimationType,
        modalProps, dialogContentProps,
        showAnimatedDialogFooter, okButtonText, cancelButtonText } = props;


    const animationPrefix: string = `animate__`;
    const mainAnimationClass: string = `${animationPrefix}animated`;
    const currentContainerClass: string = modalProps && modalProps.containerClassName;
    const containerAnimationClass: string = `${currentContainerClass} ${mainAnimationClass} ${animationPrefix}fast`;
    const defaultDialogAnimationClass: string = `${animationPrefix}bounceIn`;
    const defaultIconAnimationClass: string = `${animationPrefix}zoomIn`;

    useEffect(() => {

        let containerClassName: string = `${containerAnimationClass} ${defaultDialogAnimationClass}`;
        let title: string | JSX.Element = dialogContentProps && dialogContentProps.title;

        if (props.dialogAnimationInType) {
            containerClassName = `${containerAnimationClass} ${animationPrefix}${dialogAnimationInType}`;
        }

        if (iconName) {
            title =
                <div className={styles.animatedDialogTitleContainer}>
                    <Icon
                        iconName={iconName}
                        className={iconAnimationType ?
                            `${mainAnimationClass} ${animationPrefix}${iconAnimationType}` :
                            `${mainAnimationClass} ${defaultIconAnimationClass}`} />
                    <br />
                    <span>{dialogContentProps && dialogContentProps.title}</span>
                </div>;
        }

        if (props.hidden) {
            containerClassName = `${containerAnimationClass} `;
            containerClassName += dialogAnimationOutType ?
                `${animationPrefix}${dialogAnimationOutType}` :
                `${animationPrefix}zoomOut`;
        }

        setDialogProps({
            ...props,
            modalProps: { ...modalProps, containerClassName },
            dialogContentProps: { ...dialogContentProps, title }
        });


    }, [props.hidden]);

    const animatedDialogFooter: JSX.Element =
        showAnimatedDialogFooter ?
            <div className={styles.animatedDialogFooter}>
                <PrimaryButton
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await props.onOkClick();
                            props.onSuccess();
                        } catch (error) {
                            props.onError();
                        }
                        setLoading(false);
                    }}
                    disabled={loading}
                    text={!loading && (okButtonText ? okButtonText : "Ok")}
                    iconProps={!loading && { iconName: 'CheckMark' }}>
                    {loading && <Spinner size={SpinnerSize.medium} />}
                </PrimaryButton>

                <DefaultButton
                    onClick={props.onDismiss}
                    text={cancelButtonText ? cancelButtonText : "Cancel"}
                    disabled={loading}
                    iconProps={{ iconName: 'Cancel' }} />
            </div> :
            null;

    return (
        <Dialog {...dialogProps}>
            {props.children}
            {
                showAnimatedDialogFooter && animatedDialogFooter
            }
        </Dialog>
    );
}
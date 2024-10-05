import * as React from "react";
import { useEffect, useState } from 'react';
import styles from './AnimatedDialog.module.scss';
import { Dialog, IDialogProps, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { Icon } from '@fluentui/react/lib/Icon';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

// Animate.min.css
//require('../../../node_modules/animate.css/animate.min.css');
require('animate.css/animate.min.css');

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

const animationPrefix: string = `animate__`;
const mainAnimationClass: string = `${animationPrefix}animated`;
const defaultDialogAnimationClass: string = `${animationPrefix}bounceIn`;
const defaultIconAnimationClass: string = `${animationPrefix}zoomIn`;

export function AnimatedDialog(props: React.PropsWithChildren<IAnimatedDialogProps>): JSX.Element {

    const [dialogProps, setDialogProps] = useState<IDialogProps>(props);
    const [animatedDialogContentProps, setAnimatedDialogContentProps] = useState<IDialogContentProps>(props.dialogContentProps);
    const [animatedDialogFooter, setAnimatedDialogFooter] = useState<JSX.Element>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { dialogAnimationInType, dialogAnimationOutType,
        iconName, iconAnimationType,
        modalProps, dialogContentProps,
        showAnimatedDialogFooter, okButtonText, cancelButtonText } = props;

    const currentContainerClass: string = modalProps && modalProps.containerClassName;
    const containerAnimationClass: string = `${currentContainerClass} ${mainAnimationClass} ${animationPrefix}fast`;

    const getAnimatedDialogFooter = (): JSX.Element => {
        return showAnimatedDialogFooter ?
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
            </div> : null;
    };

    useEffect(() => {
        let title: string | JSX.Element = dialogContentProps && dialogContentProps.title;

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

        setAnimatedDialogContentProps({ ...dialogContentProps, title });
    }, []);

    useEffect(() => {
        setAnimatedDialogFooter(getAnimatedDialogFooter());
    }, [loading]);

    useEffect(() => {

        let containerClassName: string = `${containerAnimationClass} ${defaultDialogAnimationClass}`;

        if (props.dialogAnimationInType) {
            containerClassName = `${containerAnimationClass} ${animationPrefix}${dialogAnimationInType}`;
        }

        if (props.hidden) {
            containerClassName = `${containerAnimationClass} `;
            containerClassName += dialogAnimationOutType ?
                `${animationPrefix}${dialogAnimationOutType}` :
                `${animationPrefix}zoomOut`;
        }

        setDialogProps({
            ...props,
            dialogContentProps: animatedDialogContentProps,
            modalProps: { ...modalProps, containerClassName }
        });


    }, [props.hidden]);

    return (
        <Dialog {...dialogProps}>
            {props.children}
            {animatedDialogFooter}
        </Dialog>
    );
}

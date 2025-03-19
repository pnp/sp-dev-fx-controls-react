
import React from "react";
import { Callout } from "@fluentui/react/lib/Callout";
import { useBoolean, useId } from "@fluentui/react-hooks";
import styles from "./FilterBar.module.scss"
import { PillGroup } from "./PillGroup";
import { IFilterBarItemGroup } from "./IFilterBarItemGroup";
import * as strings from "ControlStrings";

export interface IOverflowPillProps  {
    onClick: (label?: string, value?: string) => void;
    items: IFilterBarItemGroup[];
}

export const OverflowPill = (props: IOverflowPillProps): JSX.Element => {
    const [overlayVisible, {toggle: toggleOverlayVisible}] = useBoolean(false);
    const divId = useId('callout-div');

    const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        toggleOverlayVisible();
    } 

    const pillClick = (label, value): void => {
        if (props.onClick)
        {
            props.onClick(label, value);
        }
    }

    return (
        <>
            <div id={divId} className={`${styles.pill} pillOverflow`} data-is-focusable={true} aria-label={strings.FilterOverflowAriaLabel} onClick={onClick} tabIndex={-1}>
                +{props.items.length}
            </div>
            { 
                overlayVisible && (
                    <Callout onDismiss={toggleOverlayVisible} target={`#${divId}`} isBeakVisible={false}>
                        <div className={styles.overflow}>
                            {
                                props.items.map((i, index) => <PillGroup item={i} key={index} onRemoveFilter={pillClick} />)
                            }
                        </div>
                    </Callout>
                )
            }
        </>
    )
}
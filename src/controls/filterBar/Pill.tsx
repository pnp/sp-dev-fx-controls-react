
import { Icon } from "@fluentui/react";
import styles from "./FilterBar.module.scss";
import * as strings from "ControlStrings";
import React from "react";

export interface IPillProps  {
    onClick: (label?: string, value?: string) => void;
    clearAll?: boolean;
    value?: string;
    field?: string;
}
export const Pill = (props: IPillProps): JSX.Element => {
    
    const onClick = (event): void => {
        if (props.onClick)
        {
            props.onClick(props.field, props.value);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buttonProps: any = {
        title: props.clearAll ? strings.ClearAllFiltersTitle: strings.ClearFilterTitle,
        className: `${styles.pill} ${props.clearAll ? `${styles.pill} ${styles.clearAll}` : ""}`,
        "data-automationid": props.clearAll ? "clearfiltersPill": "filterPill",
        "data-field": props.field
    }
    if (props.clearAll) {
        buttonProps.tabIndex = 0;
    }
    else {
        buttonProps["data-is-focusable"] = true;
        buttonProps["data-value"] = props.value;
        buttonProps["aria-disabled"] = false;
    }
    
    return (
        <button {...buttonProps} onClick={onClick}>
            <span className={styles.pillText}>{props.clearAll ? strings.ClearAllFiltersText: props.value}</span>
            <Icon iconName="Cancel" role="presentation" className={`${styles.icon}`} data-icon-name="Cancel" />
        </button>
    )
}
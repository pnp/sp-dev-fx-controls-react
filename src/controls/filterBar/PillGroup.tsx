import React from "react";
import styles from "./FilterBar.module.scss";
import { Pill } from "./Pill";
import { IFilterBarItemGroup } from "./IFilterBarItemGroup";

export interface IPillGroupProps {
    item: IFilterBarItemGroup;
    onRemoveFilter?: (label: string, value: string) => void;
}

export const PillGroup: React.FunctionComponent<IPillGroupProps> = (props) => {
    
    const onClick = (label, value): void => {
        if (props.onRemoveFilter)
        {
            props.onRemoveFilter(label, value);
        }
    }

    return (
        <div className={styles.pillGroup} role="group" aria-label={props.item.label}>
            <div className={styles.label}>
                { props.item.label }: 
            </div>
            {
                props.item.values.map((v, index) => <Pill key={index} field={props.item.label} value={v} onClick={onClick} />)
            }
        </div>
    )
}
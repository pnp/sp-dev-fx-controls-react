import * as React from 'react';
import styles from "./FilterBar.module.scss";
import { PillGroup } from './PillGroup';
import { Pill } from './Pill';
import { OverflowPill } from './OverflowPill';
import { IFilterBarItem } from './IFilterBarItem';
import { IFilterBarItemGroup } from './IFilterBarItemGroup';
import * as strings from "ControlStrings";
import { findLastIndex, uniq} from "lodash";
import { ThemeProvider } from '@fluentui/react/lib/Theme';
import { getTheme } from '@fluentui/react/lib/Styling';

export interface IFilterPillBarProps {
    /**
        Filters to be displayed. Multiple filters with the same label are grouped together
    */
    items: IFilterBarItem[];
    /**
        Number of filters, after which filters start showing as overflow
    */
    inlineItemCount?: number;
    /**
        Callback function called after clicking 'Clear filters' pill.
    */
    onClearFilters?: () => void;
    /**
        Callback function called after clicking a singular filter pill
    */
    onRemoveFilter?: (label: string, value: string) => void; 
}

export const FilterBar: React.FunctionComponent<IFilterPillBarProps> = (props: IFilterPillBarProps) => {
    
    const orderedArray = (arr: IFilterBarItem[]): IFilterBarItem[] => {
        const ret: IFilterBarItem[] = [];
        arr.map(i => {
            const index = findLastIndex(ret, r => r.label === i.label);
            if (index > -1)
            {
                ret.splice(index + 1, 0, i);
            }
            else {
                ret.push(i);
            }
        });
        return ret;
    }

    const groupItems = (itms: IFilterBarItem[]): IFilterBarItemGroup[] => itms.reduce((acc: IFilterBarItemGroup[], itm: IFilterBarItem) => {
        const label = itm.label;
        let obj = acc.find(i => i.label === label);
        if (!obj) {
            obj = {
                label: label,
                values: [itm.value]
            };
            acc.push(obj);
        }
        else {
            if (!obj.values.find(v => v === itm.value)) {
                obj.values.push(itm.value);
            }
        }

        return acc;
    }, []);

    const clearAll = (): void => {
        
        if (props.onClearFilters) {
            props.onClearFilters();
        }
    }

    const pillClick = (label?: string, value?: string): void => {
        console.log(label, value);
        if (props.onRemoveFilter) {
            props.onRemoveFilter(label as string, value as string);
        }

    }
    //const [items, setItems] = React.useState());
    const defaultInlineItemCount = 5;
    const [inlineCount, setInlineCount] = React.useState(defaultInlineItemCount);

    const groupedItems: IFilterBarItemGroup[] = React.useMemo(() => groupItems(orderedArray(uniq(props.items))), [props.items]);

    React.useEffect(() => {
        setInlineCount(props.inlineItemCount ?? defaultInlineItemCount);
    }, [props.inlineItemCount])

    return (
        <>
            <ThemeProvider theme={getTheme()}>
            {
                groupedItems && groupedItems.length > 0 && (
                    <div className={styles.container} aria-label={strings.AppliedFiltersAriaLabel} role='region'>
                        {
                            groupedItems.slice(0, inlineCount).map((i, index) => <PillGroup item={i} key={index} onRemoveFilter={pillClick} />)
                        }
                        {
                            groupedItems.length > inlineCount && (
                                <OverflowPill items={groupedItems.slice(inlineCount)} onClick={pillClick} />
                            )
                        }
                        <Pill clearAll={true} onClick={clearAll} />
                    </div>
                )
            }
            </ThemeProvider>
        </>
    );
};
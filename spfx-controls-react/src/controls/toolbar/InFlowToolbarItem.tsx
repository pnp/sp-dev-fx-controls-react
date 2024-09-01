import {
    Box,
    ButtonContent,
    Tooltip,
    Position,
    tooltipAsLabelBehavior
} from "@fluentui/react-northstar";
import { cloneDeep } from "@microsoft/sp-lodash-subset";
import * as React from "react";
import { TAction } from "../../common/model/TAction";
import styles from "./Toolbar.module.scss";
import { TToolbarLayout } from "./ToolbarActionsUtils";
import { Icon } from "@fluentui/react/lib/Icon";

interface IInFlowToolbarItemProps {
    action: TAction;
    layout: TToolbarLayout;
}

export const toolbarMenuProps = {
    offset: [0, 4] as [number, number],
    position: "below" as Position,
};

const toolbarActionTooltipProps = (() => {
    const props = cloneDeep(toolbarMenuProps);
    props.offset[1] += 10;
    return props;
})();

export const InFlowToolbarItem = ({ action, layout }: IInFlowToolbarItemProps): JSX.Element => {
    const { iconName, title } = action;
    const contentIcon = iconName && (
        <Box className={"extended-toolbar__near-side__item__icon " + styles.inFlowToolbarItemBox} >
            <Icon iconName={iconName} />
        </Box>
    );

    switch (layout) {
        case "verbose":
            return (
                <>
                    {contentIcon}
                    <ButtonContent content={title} />
                </>
            );
        default:
        case "compact":
            return (
                <Tooltip
                    {...toolbarActionTooltipProps}
                    trigger={contentIcon}
                    content={title}
                    accessibility={tooltipAsLabelBehavior}
                />
            );
    }
};

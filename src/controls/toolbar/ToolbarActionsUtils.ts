import { ObjectShorthandCollection, ShorthandCollection, ToolbarItemProps, ToolbarItemShorthandKinds, TreeItemProps } from "@fluentui/react-northstar";
import { TActions } from "../../common/model/TAction";
import styles from "./Toolbar.module.scss";


export type TToolbarItems = ShorthandCollection<
    ToolbarItemProps,
    ToolbarItemShorthandKinds
>;

export type TActionGroups = {
    [slug: string]: TActions;
};

export type TFilters = ObjectShorthandCollection<TreeItemProps, never>;

export type TToolbarLayout = "compact" | "verbose";

const slugSeparator = "__";

export function needsSeparator(
    actionSlug: string,
    index: number,
    actionSlugs: string[]
): boolean {
    if (index === 0) {
        return false;
    }
    else if (actionSlugs[index - 1]) {
        return actionSlugs[index - 1].split(slugSeparator)[0] !==
            actionSlug.split(slugSeparator)[0];
    }
}

export function flattenedActions(actionGroups: TActionGroups): TActions {
    return Object.keys(actionGroups).reduce(
        (acc_i: TActions, actionGroupSlug: string) => {
            const actionGroup = actionGroups[actionGroupSlug];
            return Object.keys(actionGroup).reduce((acc_j, actionSlug) => {
                const action = actionGroup[actionSlug];
                acc_j[`${actionGroupSlug}${slugSeparator}${actionSlug}`] = action;
                return acc_j;
            }, acc_i);
        },
        {}
    );
}
export function getInFlowToolbarItems(allActions: TActions, childredFactory: (action) => JSX.Element): TToolbarItems {
    return Object.keys(allActions).reduce(
        (acc: TToolbarItems, actionSlug, index, actionSlugs) => {
            const action = allActions[actionSlug];
            acc.push({
                ...action,
                key: actionSlug,
                children: childredFactory(action),
                title: action.title,
                "aria-label": action.title,
                className: "extended-toolbar__near-side__item " + styles.toolbarButtonStyles,
                styles: {
                    flex: "0 0 auto",
                    margin: "0 .0625rem",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            });
            if (needsSeparator(actionSlug, index, actionSlugs))
                acc.push({
                    key: `divider${slugSeparator}${index}`,
                    kind: "divider",
                });
            return acc;
        },
        []
    );
}

export function getOverflowToolbarItems(allActions: TActions, childredFactory: (action) => JSX.Element): TToolbarItems {
    return Object.keys(allActions).reduce(
        (acc: TToolbarItems, actionSlug, index, actionSlugs) => {
            const action = allActions[actionSlug];
            acc.push({
                key: actionSlug,
                content: action.title,
                icon: childredFactory(action),
                title: action.title,
                "aria-label": action.title,
                styles: { padding: ".375rem .5rem" },
                onClick: action.onClick
            });
            if (needsSeparator(actionSlug, index, actionSlugs))
                acc.push({
                    key: `divider${slugSeparator}${index}`,
                    kind: "divider",
                    styles: { margin: ".25rem 0", "&:first-child": { display: "none" } },
                });
            return acc;
        },
        []
    );
}

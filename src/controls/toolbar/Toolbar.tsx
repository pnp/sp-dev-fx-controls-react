import * as React from "react";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";

import {
  Box,
  ButtonContent,
  ComponentEventHandler,
  ObjectShorthandCollection,
  Position,
  PropsOfElement,
  ProviderConsumer as FluentUIThemeConsumer,
  ShorthandCollection,
  Toolbar as FluentUIToolbar,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  Tooltip,
  TreeItemProps,
  tooltipAsLabelBehavior,
  teamsTheme,
} from "@fluentui/react-northstar";

import { SiteVariablesPrepared } from "@fluentui/styles";

import { TAction, TActions } from "../../common/model/TAction";

import { ToolbarFilter } from "./ToolbarFilter";
import { ToolbarFind } from "./ToolbarFind";
import { ToolbarTheme } from "./ToolbarTheme";

import "./toolbar.css";
import { Icon } from "office-ui-fabric-react/lib/components/Icon/Icon";

type TToolbarItems = ShorthandCollection<
  ToolbarItemProps,
  ToolbarItemShorthandKinds
>;

export type TActionGroups = {
  [slug: string]: TActions;
};

export type TFilters = ObjectShorthandCollection<TreeItemProps, never>;

export interface IToolbarProps extends PropsOfElement<"div"> {
  actionGroups: TActionGroups;
  filters?: TFilters;
  find?: boolean;
  filtersSingleSelect?: boolean;
  onSelectedFiltersChange?: (selectedFilters: string[]) => string[];
  onFindQueryChange?: (findQuery: string) => string;
  __internal_callbacks__?: {
    [callbackId: string]: ComponentEventHandler<ToolbarItemProps>;
  };
}

export type TToolbarLayout = "compact" | "verbose";

const slugSeparator = "__";

const toolbarMenuProps = {
  offset: [0, 4] as [number, number],
  position: "below" as Position,
};

const toolbarActionTooltipProps = (() => {
  const props = cloneDeep(toolbarMenuProps);
  props.offset[1] += 10;
  return props;
})();

const toolbarButtonStyles = {
  padding: ".5rem",
  borderWidth: "1px",
  marginTop: 0,
  marginBottom: 0,
  height: "3rem",
  minWidth: 0,
  "&:focus:before": {
    top: "calc(.5rem - 1px)",
    bottom: "calc(.5rem - 1px)",
  },
  "&:focus:after": {
    top: "calc(.5rem - 1px)",
    bottom: "calc(.5rem - 1px)",
  },
};

function flattenedActions(actionGroups: TActionGroups): TActions {
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

function needsSeparator(
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

interface IInFlowToolbarItemProps {
  action: TAction;
  layout: TToolbarLayout;
}

const InFlowToolbarItem = ({ action, layout }: IInFlowToolbarItemProps) => {
  const { iconName, title } = action;
  const contentIcon = iconName && (
    <Box
      styles={{
        width: "1rem",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        "@media (min-width: 640px)": {
          marginRight: ".5rem",
        },
      }}
      className="extended-toolbar__near-side__item__icon"
    >
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

export const Toolbar = (props: IToolbarProps) => {
  const { actionGroups, filters, filtersSingleSelect, find } = props;

  const allActions = flattenedActions(actionGroups);

  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const [layout, setLayout] = React.useState<TToolbarLayout>("compact");
  const [findActive, setFindActive] = React.useState<boolean>(false);

  const layoutQuery = React.useRef<MediaQueryList | null>(null);

  const onChangeLayout = () => {
    setLayout(
      layoutQuery.current && layoutQuery.current.matches ? "verbose" : "compact"
    );
  };

  React.useLayoutEffect(() => {
    layoutQuery.current = window.matchMedia("(min-width: 640px)");
    layoutQuery.current.addEventListener("change", onChangeLayout);
    onChangeLayout();
    return () => {
      if (layoutQuery.current) {
        layoutQuery.current.removeEventListener("change", onChangeLayout);
      }
    };
  });

  const inFlowToolbarItems: TToolbarItems = Object.keys(allActions).reduce(
    (acc: TToolbarItems, actionSlug, index, actionSlugs) => {
      const action = allActions[actionSlug];
      acc.push({
        ...action,
        key: actionSlug,
        children: <InFlowToolbarItem action={action} layout={layout} />,
        title: action.title,
        "aria-label": action.title,
        className: "extended-toolbar__near-side__item",
        styles: {
          ...toolbarButtonStyles,
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

  const overflowToolbarItems: TToolbarItems = Object.keys(allActions).reduce(
    (acc: TToolbarItems, actionSlug, index, actionSlugs) => {
      const action = allActions[actionSlug];
      acc.push({
        key: actionSlug,
        content: action.title,
        icon: <Icon iconName={action.iconName} />,
        title: action.title,
        "aria-label": action.title,
        styles: { padding: ".375rem .5rem" },
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

  const displayFindOnly = find && layout === "compact" && findActive;

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {

        if (!globalTheme || globalTheme.fontFaces.length == 0) {
          globalTheme = teamsTheme;
        }
        return <ToolbarTheme globalTheme={globalTheme}>
          <Box
            className="extended-toolbar"
            variables={({ colorScheme, theme }: SiteVariablesPrepared) => ({
              backgroundColor:
                theme === "teamsHighContrastTheme"
                  ? colorScheme.grey.background
                  : colorScheme.grey.background2,
              elevation: colorScheme.elevations[16],
            })}
            styles={{
              padding: "0 1.25rem",
              marginBottom: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
            }}
            {...omit(props, [
              "actionGroups",
              "filters",
              "find",
              "filtersSingleSelect",
              "onSelectedFiltersChange",
              "onFindQueryChange",
            ])}
          >
            {!displayFindOnly && (
              <FluentUIToolbar
                aria-label="Extended toolbar"
                className="extended-toolbar__near-side"
                items={inFlowToolbarItems}
                overflow
                overflowOpen={overflowOpen}
                overflowItem={{
                  title: "More",
                  menu: toolbarMenuProps,
                  styles: toolbarButtonStyles,
                }}
                onOverflowOpenChange={(event, changeProps) => {
                  if (changeProps && changeProps.overflowOpen) {
                    setOverflowOpen(changeProps.overflowOpen);
                    if (changeProps.overflowOpen) {
                      setFiltersOpen(false);
                    }
                  }
                }}
                getOverflowItems={(startIndex) =>
                  overflowToolbarItems.slice(startIndex)
                }
                styles={{
                  flex: "1 0 0",
                  overflow: "hidden",
                  maxWidth: "40rem",
                  minWidth: "2rem",
                }}
              />
            )}
            <Box
              className="extended-toolbar__far-side"
              styles={{
                flex: displayFindOnly ? "1 1 100%" : "0 1 auto",
                display: "flex",
                flexFlow: "row nowrap",
                overflow: "hidden",
                paddingLeft: displayFindOnly ? "0" : "2.5rem",
              }}
            >
              {!displayFindOnly && filters && (
                <ToolbarFilter
                  layout={layout}
                  filters={filters}
                  singleSelect={!!filtersSingleSelect}
                  open={filtersOpen}
                  onOpenChange={(_e, changeProps) => {
                    if (changeProps.open) {
                      setFiltersOpen(changeProps.open);
                      if (changeProps.open) {
                        setOverflowOpen(false);
                      }
                    }
                  }}
                  onSelectedFiltersChange={props.onSelectedFiltersChange}
                  toolbarMenuProps={toolbarMenuProps}
                  toolbarButtonStyles={toolbarButtonStyles}
                />
              )}
              {find && (
                <ToolbarFind
                  {...{
                    layout,
                    findActive,
                    setFindActive,
                    toolbarButtonStyles,
                    onFindQueryChange: props.onFindQueryChange,
                  }}
                />
              )}
            </Box>
          </Box>
        </ToolbarTheme>;
      }}
    />
  );
};

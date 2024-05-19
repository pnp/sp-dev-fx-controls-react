import * as React from "react";
import omit from "lodash/omit";

import {
  Box,
  PropsOfElement,
  ProviderConsumer as FluentUIThemeConsumer,
  Toolbar as FluentUIToolbar,
  teamsTheme,
} from "@fluentui/react-northstar";

import { SiteVariablesPrepared } from "@fluentui/styles";
import { ToolbarFilter } from "./ToolbarFilter";
import { ToolbarFind } from "./ToolbarFind";
import { ToolbarTheme } from "./ToolbarTheme";

import "./toolbar.css";
import { InFlowToolbarItem, toolbarMenuProps } from "./InFlowToolbarItem";
import styles from "./Toolbar.module.scss";
import { flattenedActions, getInFlowToolbarItems, getOverflowToolbarItems, TActionGroups, TFilters, TToolbarItems, TToolbarLayout } from "./ToolbarActionsUtils";
import { useTelemetry } from "../../common/telemetry";
import { Icon } from "@fluentui/react/lib/Icon";

/**
 * Toolbar props
 */
export interface IToolbarProps extends PropsOfElement<"div"> {
  /**
   * Toolbar action groups
   */
  actionGroups: TActionGroups;
  /**
   * Toolbar filters
   */
  filters?: TFilters;
  /**
   * When using the Toolbar as a controlled component, use this property to set the IDs of selected filters.
   * Leave this property undefined to use the Toolbar as an uncontrolled component.
   */
  selectedFilterIds?: string[];
  /**
   * Specifies if searchbox should be displayed
   */
  find?: boolean;
  /**
   * Specifies if a user can select only one filter at a time
   */
  filtersSingleSelect?: boolean;
  /**
   * Filter changed handler
   */
  onSelectedFiltersChange?: (selectedFilters: string[]) => (string[] | void);
  /**
   * Search query changed handler
   */
  onFindQueryChange?: (findQuery: string) => string;
}

export const Toolbar = (props: IToolbarProps): JSX.Element => {
  const { actionGroups, filters, selectedFilterIds, filtersSingleSelect, find } = props;

  const allActions = flattenedActions(actionGroups);

  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const [layout, setLayout] = React.useState<TToolbarLayout>("compact");
  const [findActive, setFindActive] = React.useState<boolean>(false);

  const layoutQuery = React.useRef<MediaQueryList | null>(null);

  const onChangeLayout = (): void => {
    setLayout(
      layoutQuery.current && layoutQuery.current.matches ? "verbose" : "compact"
    );
  };

  useTelemetry('ReactToolbar');

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

  const inFlowToolbarItems: TToolbarItems = getInFlowToolbarItems(allActions, (action) => <InFlowToolbarItem action={action} layout={layout} />);

  const overflowToolbarItems: TToolbarItems = getOverflowToolbarItems(allActions, (action)=><Icon iconName={action.iconName} />);

  const displayFindOnly = find && layout === "compact" && findActive;

  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {

        if (!globalTheme || globalTheme.fontFaces.length === 0) {
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
                className={"extended-toolbar__near-side " + styles.toolbarButtonStyles}
                items={inFlowToolbarItems}
                overflow
                overflowOpen={overflowOpen}
                overflowItem={{
                  title: "More",
                  menu: toolbarMenuProps,
                }}
                onOverflowOpenChange={(event, changeProps) => {
                  if (changeProps && changeProps.overflowOpen) {
                    setOverflowOpen(changeProps.overflowOpen);
                    if (changeProps.overflowOpen) {
                      setFiltersOpen(false);
                    }
                  }
                  else{
                    setOverflowOpen(false);
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
                  selectedFilterIds={selectedFilterIds}
                  singleSelect={!!filtersSingleSelect}
                  open={filtersOpen}
                  onOpenChange={(_e, changeProps) => {
                    if (changeProps.open) {
                      setFiltersOpen(changeProps.open);
                      setOverflowOpen(false);
                    }
                    else {
                      setFiltersOpen(false);
                      setOverflowOpen(false);
                    }
                  }}
                  onSelectedFiltersChange={props.onSelectedFiltersChange}
                  toolbarMenuProps={toolbarMenuProps}
                />
              )}
              {find && (
                <ToolbarFind
                  {...{
                    layout,
                    findActive,
                    setFindActive,
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

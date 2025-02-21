import * as React from "react";
import get from "lodash/get";

import {
  Box,
  Button,
  ComponentEventHandler,
  Divider,
  ObjectShorthandCollection,
  Popup,
  PopupProps,
  ShorthandCollection,
  ShorthandRenderFunction,
  Text,
  Tooltip,
  Tree,
  TreeTitleProps,
  TreeItemProps,
  tooltipAsLabelBehavior,
} from "@fluentui/react-northstar";

import {
  AudienceIcon,
  TriangleDownIcon,
  TriangleEndIcon,
} from "@fluentui/react-icons-northstar";

import { ComponentSlotStyle, SiteVariablesPrepared } from "@fluentui/styles";

import styles from "./Toolbar.module.scss";
import { TToolbarLayout } from "./ToolbarActionsUtils";

const treeItemIconStyles = {
  position: "relative",
  left: "-1rem",
  height: "1rem",
  width: "0",
  display: "block",
  pointerEvents: "none",
};

const treeItemTitleRenderer: ShorthandRenderFunction<TreeTitleProps> = (
  Component,
  { content, expanded, hasSubtree, ...restProps }
) => (
    <Component
      expanded={expanded}
      hasSubtree={hasSubtree}
      styles={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0.325rem 0.875rem 0.325rem 1.125rem",
      }}
      selectionIndicator={{
        styles: { flex: "0 0 auto", marginLeft: "1rem" },
      }}
      {...restProps}
    >
      {hasSubtree ? (
        expanded ? (
          <TriangleDownIcon styles={treeItemIconStyles as ComponentSlotStyle} />
        ) : (
            <TriangleEndIcon styles={treeItemIconStyles as ComponentSlotStyle} />
          )
      ) : null}
      <Text
        styles={{
          flex: "1 1 auto",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          pointerEvents: "none",
          marginRight: ".5rem",
        }}
        content={content}
        className="extended-toolbar__filters-menu__item__content"
      />
    </Component>
  );

const addSelectableParent = (
  items: ShorthandCollection<TreeItemProps>
): ShorthandCollection<TreeItemProps> => {
  return items.map((item) => {
    if (item && item.hasOwnProperty("items")) // eslint-disable-line no-prototype-builtins
      return Object.assign(item, {
        selectableParent: true,
        items: addSelectableParent(get(item, ["items"], [])),
      });
    else return item;
  });
};

const findSingleTitle = (
  selectedId: string,
  filters: ShorthandCollection<TreeItemProps>
): string | undefined => {
  let result: string | undefined = undefined;
  for (let i = 0; i < filters.length; i += 1) {
    if (get(filters, [i, "id"]) === selectedId) {
      result = get(filters, [i, "title"]);
      break;
    } else if (Array.isArray(get(filters, [i, "items"]))) {
      const deepResult = findSingleTitle(
        selectedId,
        get(filters, [i, "items"])
      );
      if (deepResult) {
        result = deepResult;
        break;
      }
    }
  }
  return result;
};

const getSingleTitle = (
  layout: TToolbarLayout,
  selectedId: string | undefined,
  filters: ObjectShorthandCollection<TreeItemProps, never>
): string => {
  switch (layout) {
    case "verbose":
      return (selectedId && findSingleTitle(selectedId, filters)) || "Filter";
    default:
    case "compact":
      return selectedId ? "(1)" : "";
  }
};

export interface IExtendedToolbarFilterProps {
  layout: TToolbarLayout;
  filters: ObjectShorthandCollection<TreeItemProps, never>;
  selectedFilterIds?: string[];
  singleSelect: boolean;
  open: boolean;
  onOpenChange: ComponentEventHandler<PopupProps>;
  toolbarMenuProps: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  toolbarButtonStyles?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSelectedFiltersChange?: (selectedFilters: string[]) => string[] | void;
}

export const ToolbarFilter = (props: IExtendedToolbarFilterProps): JSX.Element => {
  const {
    layout,
    filters,
    selectedFilterIds: externalSelectedFilters,
    singleSelect,
    open,
    onOpenChange,
    toolbarMenuProps,
  } = props;
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const propagateSetSelectedFilters = (eventSelectedFilters: string[]): void => {
    if (props.onSelectedFiltersChange) {
      const selectedFiltersAfterNotifyingChange = props.onSelectedFiltersChange(eventSelectedFilters);
      // If Toolbar is used as a controlled component - i.e. selectedFilterIds is defined - then we ignore the value
      // returned by the onSelectedFiltersChange callback and assume that selectedFilterIds will be updated
      // to reflect the new set of selected filters.
      // If Toolbar is uncontrolled then a defined returned value from the onSelectedFilterChange callback will be
      // used as the new set of selected filters.
      if (externalSelectedFilters === undefined) {
        console.log("externalSelectedFilters is undefined");
        if (selectedFiltersAfterNotifyingChange !== undefined && Array.isArray(selectedFiltersAfterNotifyingChange)) {
          setSelectedFilters(selectedFiltersAfterNotifyingChange);
        } else {
          setSelectedFilters(eventSelectedFilters);
        }
      }
    } else {
      setSelectedFilters(eventSelectedFilters);
    }
  };

  React.useEffect(() => {
    if (externalSelectedFilters !== undefined) {
      setSelectedFilters(externalSelectedFilters);
    }
  }, [externalSelectedFilters]);

  const invokerTitle = singleSelect
    ? getSingleTitle(layout, selectedFilters[0], filters)
    : `${layout === "verbose" ? "Filter" : ""}${selectedFilters.length > 0 ? ` (${selectedFilters.length})` : ""
    }`;
  const filtersForTree = singleSelect
    ? filters
    : (addSelectableParent(filters) as ObjectShorthandCollection<
      TreeItemProps,
      never
    >);

  const filterInvoker = (
    <Button
      text
      title="Filter"
      content={invokerTitle}
      className={"extended-toolbar__filters-invoker " + styles.toolbarButtonStyles}
      icon={<AudienceIcon outline />}
      styles={{
        marginRight: ".5rem",
        flex: "0 0 auto",
      }}
      onClick={(e) => onOpenChange(e, { open: !open })}
    />
  );

  return filters.length ? (
    <Popup
      {...toolbarMenuProps}
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        layout === "compact" ? (
          <Tooltip
            trigger={filterInvoker}
            content="Filter"
            accessibility={tooltipAsLabelBehavior}
          />
        ) : (
            filterInvoker
          )
      }
      content={{
        styles: { width: "13.75rem" },
        content: (
          <Box className="extended-toolbar__filters-menu">
            <Box
              className="extended-toolbar__filters-menu__header"
              styles={{
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                padding: "0 .5rem",
              }}
            >
              <Text
                content="Filter"
                className="extended-toolbar__filters-menu__title"
                styles={{
                  flex: "1 0 auto",
                  padding: ".5rem 0",
                }}
              />
              <Button
                text
                primary
                content="Clear"
                aria-label="Clear filter"
                className="extended-toolbar__filters-menu__clear-action"
                onClick={() => propagateSetSelectedFilters([])}
                styles={{
                  marginRight: "calc(1px - .5rem)",
                  padding: ".5rem",
                  height: "2rem",
                  minWidth: 0,
                }}
                variables={({ colorScheme, theme }: SiteVariablesPrepared) => {
                  let color = colorScheme.brand.foreground;
                  switch (theme) {
                    case "teamsHighContrastTheme":
                      color = colorScheme.grey.foregroundHover;
                      break;
                  }
                  return { color };
                }}
              />
            </Box>
            <Divider styles={{ padding: 0, margin: "0 .5rem" }} />
            <Tree
              selectable
              items={filtersForTree}
              onSelectedItemIdsChange={(event, selectProps) => {
                if (selectProps && selectProps.selectedItemIds) {
                  const selectedItemIds = selectProps.selectedItemIds as
                    | ((prevState: string[]) => string[])
                    | string[]
                    | undefined;
                  const nextSelectedFilters =
                    typeof selectedItemIds === "function"
                      ? selectedItemIds(selectedFilters)
                      : Array.isArray(selectedItemIds)
                        ? selectedItemIds
                        : [];
                  propagateSetSelectedFilters(
                    singleSelect
                      ? nextSelectedFilters.slice(
                        nextSelectedFilters.length - 1,
                        nextSelectedFilters.length
                      )
                      : nextSelectedFilters
                  );
                }
              }}
              selectedItemIds={selectedFilters}
              renderItemTitle={treeItemTitleRenderer}
              className="extended-toolbar__filters-menu__tree"
              aria-labelledby="extended-toolbar__filters-menu__title"
              styles={{ padding: "0.3125rem 0" }}
            />
          </Box>
        ),
      }}
      trapFocus={{
        firstFocusableSelector:
          ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
      }}
    />
  ) : null;
};

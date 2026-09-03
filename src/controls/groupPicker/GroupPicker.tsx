import * as React from "react";
import {
  TagPicker,
  IBasePicker,
  ITag,
  IBasePickerSuggestionsProps,
  IPickerItemProps,
  ISuggestionItemProps,
} from "@fluentui/react/lib/Pickers";

import { useGroups } from "../../hooks";
import { IGroup } from "../../common/model/IGroup";
import { IGroupPickerProps, GroupTypeFilter } from "./IGroupPickerProps";
import { IGroupPickerState } from "./IGroupPickerState";
import { useGroupPickerStyles } from "./GroupPickerStyles";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Customizer } from "@fluentui/react/lib/Utilities";

import pullAllBy from "lodash/pullAllBy";
import find from "lodash/find";
import strings from "ControlStrings";

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: strings.GroupPickerSuggestionsHeaderText,
  noResultsFoundText: strings.genericNoResultsFoundText,
};

const initialState: IGroupPickerState = {
  savedSelectedGroups: [],
};

const getTextFromItem = (item: ITag): string => item.name;

const matchGroupType = (
  group: IGroup,
  groupType?: GroupTypeFilter
): boolean => {
  if (!groupType || groupType === "All") return true;

  const isUnified = group.groupTypes?.includes("Unified");
  const isSecurity = !!group.securityEnabled && !isUnified;

  if (groupType === "M365") return isUnified;
  if (groupType === "Security") return isSecurity;
  return true;
};

const reducer = (
  state: IGroupPickerState,
  action: { type: string; payload: any } // eslint-disable-line @typescript-eslint/no-explicit-any
): IGroupPickerState => {
  switch (action.type) {
    case "UPDATE_SELECTEDITEM":
      return { ...state, savedSelectedGroups: action.payload };
    default:
      return state;
  }
};

export const GroupPicker: React.FunctionComponent<IGroupPickerProps> = (
  props: IGroupPickerProps
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const picker = React.useRef<IBasePicker<ITag>>(null);
  const { serviceScope } = props.appcontext;
  const { getGroups } = useGroups(serviceScope);
  const {
    onSelectedGroups,
    selectedGroups,
    itemLimit,
    multiSelect,
    label,
    styles,
    themeVariant,
    groupType,
  } = props;

  const {
    pickerStylesMulti,
    pickerStylesSingle,
    renderItemStylesMulti,
    renderItemStylesSingle,
    renderIconButtonRemoveStyles,
    componentClasses,
  } = useGroupPickerStyles(themeVariant);

  const groupTypeById = React.useRef<Record<string, "m365" | "security">>({});

  const getGroupTypeIcon = React.useCallback(
    (groupId: string | number | undefined): JSX.Element | null => {
      if (!groupId) return null;
      const groupType = groupTypeById.current[groupId.toString()];
      if (!groupType) return null;
      if (groupType === "m365") {
        return (
          <FontIcon
            iconName="OfficeLogo"
            className={componentClasses.groupTypeIconM365}
            title={strings.GroupPickerGroupTypeM365Label}
            aria-label={strings.GroupPickerGroupTypeM365Label}
          />
        );
      }
      return (
        <FontIcon
          iconName="LockSolid"
          className={componentClasses.groupTypeIconSecurity}
          title={strings.GroupPickerGroupTypeSecurityLabel}
          aria-label={strings.GroupPickerGroupTypeSecurityLabel}
        />
      );
    },
    [componentClasses.groupTypeIconM365, componentClasses.groupTypeIconSecurity]
  );

  const useFilterSuggestedGroups = React.useCallback(
    async (filterText: string, groupsList: ITag[]): Promise<ITag[]> => {
      const tags: ITag[] = [];
      try {
        const groups: IGroup[] = await getGroups(filterText);
        if (groups?.length) {
          for (const group of groups) {
            if (!matchGroupType(group, groupType)) continue;
            const isUnified = group.groupTypes?.includes("Unified");
            const groupTypeKey: "m365" | "security" | undefined = isUnified
              ? "m365"
              : group.securityEnabled
                ? "security"
                : undefined;
            if (groupTypeKey) {
              groupTypeById.current[group.id] = groupTypeKey;
            }
            const checkExists = find(groupsList, { key: group.id });
            if (checkExists) continue;
            tags.push({ key: group.id, name: group.displayName });
          }
        }
        return tags;
      } catch (error) {
        console.log(error);
        return tags;
      }
    },
    [groupType, getGroups]
  );

  React.useEffect(() => {
    dispatch({
      type: "UPDATE_SELECTEDITEM",
      payload: selectedGroups,
    });
  }, [props]);

  const _onRenderItem = React.useCallback(
    (itemProps: IPickerItemProps<ITag>) => {
      const { savedSelectedGroups } = state;
      if (itemProps.item) {
        return (
          <Stack
            horizontal
            horizontalAlign="start"
            verticalAlign="center"
            tokens={{ childrenGap: 7 }}
            styles={
              (multiSelect ?? true) && (itemLimit && itemLimit > 1)
                ? renderItemStylesMulti
                : renderItemStylesSingle
            }
          >
            <FontIcon iconName="Group" />
            <Text variant="medium">{itemProps.item.name}</Text>
            {getGroupTypeIcon(itemProps.item.key)}
            <IconButton
              styles={renderIconButtonRemoveStyles}
              iconProps={{ iconName: "Cancel" }}
              title={strings.TeamPickerButtonRemoveTitle}
              onClick={() => {
                const _newSelectedGroups = pullAllBy(savedSelectedGroups, [
                  itemProps.item,
                ]);
                dispatch({
                  type: "UPDATE_SELECTEDITEM",
                  payload: _newSelectedGroups,
                });
                onSelectedGroups(_newSelectedGroups);
              }}
            />
          </Stack>
        );
      }
      return null;
    },
    [
      state.savedSelectedGroups,
      renderItemStylesMulti,
      renderItemStylesSingle,
      renderIconButtonRemoveStyles,
      itemLimit,
      onSelectedGroups,
    ]
  );

  const _onRenderSuggestionsItem = React.useCallback(
    (propsTag: ITag, _itemProps: ISuggestionItemProps<ITag>) => {
      return (
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          tokens={{ childrenGap: 5, padding: 10 }}
        >
          <FontIcon iconName="Group" />
          <Text variant="smallPlus">{propsTag.name}</Text>
          {getGroupTypeIcon(propsTag.key)}
        </Stack>
      );
    },
    []
  );


  return (
    <Customizer settings={{ theme: props.themeVariant }}>
      <div style={{ width: "100%" }}>
        {label && <Label>{label}</Label>}
        <TagPicker
          styles={
            styles ??
            ((multiSelect ?? true) && (itemLimit && itemLimit > 1)
              ? pickerStylesMulti
              : pickerStylesSingle)
          }
          selectedItems={state.savedSelectedGroups}
          onRenderItem={_onRenderItem}
          onRenderSuggestionsItem={_onRenderSuggestionsItem}
          onResolveSuggestions={useFilterSuggestedGroups}
          getTextFromItem={getTextFromItem}
          pickerSuggestionsProps={pickerSuggestionsProps}
          onEmptyResolveSuggestions={(selectGroups) => {
            return useFilterSuggestedGroups("", selectGroups);
          }}
          itemLimit={(multiSelect ?? true) ? (props.itemLimit ?? undefined) : 1}
          onChange={(items) => {
            dispatch({ type: "UPDATE_SELECTEDITEM", payload: items });
            props.onSelectedGroups(items);
          }}
          componentRef={picker}
        />
      </div>
    </Customizer>
  );
};

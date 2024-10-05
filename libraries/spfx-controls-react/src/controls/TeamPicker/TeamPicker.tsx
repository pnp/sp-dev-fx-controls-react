import * as React from "react";
import {
  TagPicker,
  IBasePicker,
  ITag,
  IBasePickerSuggestionsProps,
  IPickerItemProps,
  ISuggestionItemProps,
} from "@fluentui/react/lib/Pickers";

import { useTeams } from "../../hooks";
import { ITeam } from "../../common/model/ITeam";
import { ITeamPickerProps } from "./ITeamPickerProps";
import { ITeamPickerState } from "./ITeamPickerState";
import { TEAMS_SVG_LOGO } from "./constants";
import { useTeamPickerStyles } from "./TeamPickerStyles";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";

import pullAllBy from "lodash/pullAllBy";
import find from "lodash/find";
import { ImageIcon } from "@fluentui/react/lib/Icon";
import { Customizer } from "@fluentui/react/lib/Utilities";
import strings from "ControlStrings";
const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: strings.TeamPickerSugestionsHeaderText,
  noResultsFoundText: strings.TeamPickernoResultsFoundText,
};
const initialState: ITeamPickerState = {
  savedSelectedTeams: [],
};
const getTextFromItem = (item: ITag): string => item.name;
// Reducer to update state
const reducer = (
  state: ITeamPickerState,
  action: { type: string; payload: any } // eslint-disable-line @typescript-eslint/no-explicit-any
): {
  savedSelectedTeams: any; // eslint-disable-line @typescript-eslint/no-explicit-any
} => {
  switch (action.type) {
    case "UPDATE_SELECTEDITEM":
      return { ...state, savedSelectedTeams: action.payload };
    default:
      return state;
  }
};

// select Team control
export const TeamPicker: React.FunctionComponent<ITeamPickerProps> = (
  props: ITeamPickerProps
) => {
  // initialize reducer
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const picker = React.useRef<IBasePicker<ITag>>(null);
  const { serviceScope } = props.appcontext;
  const { getMyTeams } = useTeams(serviceScope);
  const {
    onSelectedTeams,
    selectedTeams,
    itemLimit,
    label,
    styles,
    themeVariant,
  } = props;
  const {
    pickerStylesMulti,
    pickerStylesSingle,
    renderItemStylesMulti,
    renderItemStylesSingle,
    renderIconButtonRemoveStyles,
  } = useTeamPickerStyles(themeVariant);

  const useFilterSuggestedTeams = React.useCallback(
    async (filterText: string, teamsList: ITag[]): Promise<ITag[]> => {
      const tags: ITag[] = [];
      try {
        const teams: ITeam[] = await getMyTeams(filterText);
        if (teams?.length) {
          for (const team of teams) {
            const checkExists = find(teamsList, { key: team.id });
            if (checkExists) continue;
            tags.push({ key: team.id, name: team.displayName });
          }
        }
        return tags;
      } catch (error) {
        console.log(error);
        return tags;
      }
    },
    []
  );

  React.useEffect(() => {
    dispatch({
      type: "UPDATE_SELECTEDITEM",
      payload: selectedTeams,
    });
  }, [props]);

  const _onRenderItem = React.useCallback(
    (itemProps: IPickerItemProps<ITag>) => {
      const { savedSelectedTeams } = state;
      if (itemProps.item) {
        return (
          <Stack
            horizontal
            horizontalAlign="start"
            verticalAlign="center"
            tokens={{ childrenGap: 7 }}
            styles={
              itemLimit && itemLimit > 1
                ? renderItemStylesMulti
                : renderItemStylesSingle
            }
          >
            <ImageIcon
              imageProps={{
                src: TEAMS_SVG_LOGO,
                width: 18,
                height: 18,
              }}
            />

            <Text variant="medium">{itemProps.item.name}</Text>
            <IconButton
              styles={renderIconButtonRemoveStyles}
              iconProps={{ iconName: "Cancel" }}
              title={strings.TeamPickerButtonRemoveTitle}
              onClick={(ev) => {
                const _newSelectedTeams = pullAllBy(savedSelectedTeams, [
                  itemProps.item,
                ]);
                dispatch({
                  type: "UPDATE_SELECTEDITEM",
                  payload: _newSelectedTeams,
                });
                onSelectedTeams(_newSelectedTeams);
              }}
            />
          </Stack>
        );
      } else {
        return null;
      }
    },
    [
      selectedTeams,
      state.savedSelectedTeams,
      props.themeVariant,
      renderItemStylesSingle,
      renderIconButtonRemoveStyles,
      renderItemStylesMulti,
    ]
  );

  // reder sugestion Items
  const _onRenderSuggestionsItem = React.useCallback(
    (propsTag: ITag, itemProps: ISuggestionItemProps<ITag>) => {
      return (
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          tokens={{ childrenGap: 5, padding: 10 }}
        >
          <ImageIcon
            imageProps={{
              src: TEAMS_SVG_LOGO,
              width: 18,
              height: 18,
            }}
          />
          <Text variant="smallPlus">{propsTag.name}</Text>
        </Stack>
      );
    },
    [props.themeVariant]
  );

  // Render  control
  return (
    <Customizer settings={{ theme: props.themeVariant }}>
      <div style={{ width: "100%" }}>
        {label && <Label>{label}</Label>}
        <TagPicker
          styles={
            styles ??
            (itemLimit && itemLimit > 1
              ? pickerStylesMulti
              : pickerStylesSingle)
          }
          selectedItems={state.savedSelectedTeams}
          onRenderItem={_onRenderItem}
          onRenderSuggestionsItem={_onRenderSuggestionsItem}
          onResolveSuggestions={useFilterSuggestedTeams}
          getTextFromItem={getTextFromItem}
          pickerSuggestionsProps={pickerSuggestionsProps}
          onEmptyResolveSuggestions={(selectTeams) => {
            return useFilterSuggestedTeams("", selectTeams);
          }}
          itemLimit={props.itemLimit ?? undefined}
          onChange={(items) => {
            dispatch({ type: "UPDATE_SELECTEDITEM", payload: items });
            props.onSelectedTeams(items);
          }}
          componentRef={picker}
        />
      </div>
    </Customizer>
  );
};

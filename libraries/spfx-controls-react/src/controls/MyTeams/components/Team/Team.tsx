import * as React from "react";
import { ITeamProps } from "./ITeamProps";
import { PersonCardInteraction } from "@microsoft/mgt-spfx";
import { People } from "@microsoft/mgt-react/dist/es6/spfx";
import { getMyTeamsStyles } from "../../MyTeamsStyles";
import { CommandButton } from "@fluentui/react/lib/Button";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Text } from "@fluentui/react/lib/Text";
import { Stack, StackItem } from "@fluentui/react/lib/Stack";
import {
  IContextualMenuItem,
  IContextualMenuItemProps,
  ContextualMenuItemType,
} from "@fluentui/react/lib/ContextualMenu";

import { useTeams } from "../../../../hooks";
import { ITeamMenber } from "../../../../common/model/ITeamMember";
import { EMembershipType } from "../../../../common/model/EMembershipType";
import { IShowMessageProps, ShowMessage } from "../ShowMessage";
import { MessageBarType } from "@fluentui/react/lib/MessageBar";
import strings from "ControlStrings";
import { ITeamState } from "./ITeamState";
import { teamsReducer } from "./TeamReducer";
import { ETeamTypes } from "./ETeamTypes";

const initialState: ITeamState = {
  teamMembers: [],
  teamsOwners: undefined,
  channelsMenu: { items: [] },
  hasError: false,
  isLoading: true,
  message: undefined,
};

export const Team: React.FunctionComponent<ITeamProps> = (
  props: React.PropsWithChildren<ITeamProps>
) => {
  const {
    team,
    serviceScope,
    onSelectedChannel,
    themeVariant,
    enablePersonCardInteraction,
  } = props;
  const { styleClasses } = getMyTeamsStyles(themeVariant);

  const { getTeamMembers, getTeamChannels, getTeamOwners } = useTeams(
    serviceScope
  );

  const [state, dispatch] = React.useReducer(teamsReducer, initialState);

  const onClickChannel = React.useCallback(
    (
      ev: React.MouseEvent<HTMLElement, MouseEvent>,
      item: IContextualMenuItem
    ) => {
      if (onSelectedChannel) {
        onSelectedChannel(item.data.teamId, item.key)
      }
      else {
        window.open(item.data.webUrl);
      }
    },
    [onSelectedChannel]
  );

  const _renderItem = React.useCallback(
    (itemProps: IContextualMenuItemProps) => {
      return (
        <Stack
          horizontalAlign="start"
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
          styles={{ root: { paddingLeft: 10, paddingRight: 10 } }}
        >
          <FontIcon iconName={itemProps.item.iconProps.iconName} />
          <Text variant="small" block>
            {itemProps.item.text}{" "}
          </Text>
          {itemProps.item.secondaryText === "isFavourite" ? (
            <Stack horizontal horizontalAlign="end" verticalAlign="center">
              <FontIcon iconName="FavoriteStarFill" />
            </Stack>
          ) : null}
        </Stack>
      );
    },
    []
  );

  React.useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: ETeamTypes.SET_HAS_ERROR,
          payload: false,
        });
        dispatch({
          type: ETeamTypes.SET_IS_LOADING,
          payload: true,
        });
        dispatch({
          type: ETeamTypes.SET_MESSAGE,
          payload: undefined,
        });

        const _members: ITeamMenber[] = await getTeamMembers(team.id);
        const teamOwners: ITeamMenber[] = await getTeamOwners(team.id);
        const _renderOwners: string[] = [];
        for (const teamOwner of teamOwners) {
          _renderOwners.push(teamOwner.displayName);
        }
        dispatch({
          type: ETeamTypes.SET_TEAM_OWNERS,
          payload: _renderOwners.join(","),
        });

        const publicChannels: IContextualMenuItem[] = [];
        const privateChannels: IContextualMenuItem[] = [];
        const _renderMembers: string[] = [];

        for (const teamMember of _members) {
          _renderMembers.push(teamMember.userId);
        }
        dispatch({
          type: ETeamTypes.SET_TEAM_MEMBERS,
          payload: _renderMembers,
        });

        // get Channels
        const channels = await getTeamChannels(team.id);

        publicChannels.push({
          itemType: ContextualMenuItemType.Header,
          key: "public",
          text: strings.MyTeamsTeamChannelPublicMessage,
          iconProps: { iconName: "People" },
        });
        publicChannels.push({
          itemType: ContextualMenuItemType.Divider,
          key: "div",
        });
        for (const channel of channels) {
          switch (channel.membershipType) {
            // channels private
            case EMembershipType.Private:
              privateChannels.push({
                iconProps: { iconName: "ChatInviteFriend" },
                itemType: ContextualMenuItemType.Normal,
                key: channel.id,
                text: channel.displayName,
                data: { webUrl: channel.webUrl, teamId: team.id },
                secondaryText: channel.isFavoriteByDefault ? "isFavourite" : "",
                onClick: onClickChannel,
              });
              break;
            // Channel
            default:
              publicChannels.push({
                iconProps: { iconName: "ChatInviteFriend" },
                itemType: ContextualMenuItemType.Normal,
                key: channel.id,
                text: channel.displayName,
                data: { webUrl: channel.webUrl, teamId: team.id },
                secondaryText: channel.isFavoriteByDefault ? "isFavourite" : "",
                onClick: onClickChannel,
              });
              break;
          }
        }
        // at the end add private header
        publicChannels.push({
          itemType: ContextualMenuItemType.Header,
          key: "private",
          text: strings.MyTeamsTeamChannelTypeMessage,
          iconProps: { iconName: "SecurityGroup" },
        });

        const allChannels = [...publicChannels, ...privateChannels];

        dispatch({
          type: ETeamTypes.SET_TEAM_CHANNELS,
          payload: {
            items: allChannels,
            contextualMenuItemAs: _renderItem,
          },
        });
        /*  setChannelsMenu({
          items: allChannels,
          contextualMenuItemAs: _renderItem,
        }); */
      } catch (error) {
        const messageError: IShowMessageProps = {
          isShow: true,
          message: strings.MyTeamsMessageError,
          messageBarType: MessageBarType.error,
        };

        console.log(error);
        dispatch({
          type: ETeamTypes.SET_IS_LOADING,
          payload: false,
        });
        dispatch({
          type: ETeamTypes.SET_MESSAGE,
          payload: messageError,
        });
        dispatch({
          type: ETeamTypes.SET_HAS_ERROR,
          payload: true,
        });
      }
    })().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }, []);

  const {
    teamMembers,
    teamsOwners,
    hasError,
    channelsMenu,
    message,
  } = state;

  return (
    <>
      <Stack
        className={styleClasses.teamContainer}
        verticalAlign="start"
        tokens={{ childrenGap: 15 }}
      >
        {hasError ? (
          <ShowMessage {...message} />
        ) : (
          <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            wrap
          >
            <StackItem align="start">
              <Text
                variant="xLarge"
                block
                styles={{ root: { fontWeight: 500 } }}
              >
                {team.displayName}
              </Text>
              <Text
                variant="small"
                block
                styles={{ root: { fontWeight: 400 } }}
              >
                owners: {teamsOwners}
              </Text>
            </StackItem>
            <Stack
              horizontalAlign="end"
              horizontal
              verticalAlign="center"
              tokens={{ childrenGap: 10 }}
            >
              <People
                userIds={teamMembers}
                showPresence
                showMax={6}
                personCardInteraction={
                  enablePersonCardInteraction
                    ? PersonCardInteraction.hover
                    : PersonCardInteraction.none
                }
              />
              <CommandButton
                iconProps={{ iconName: "PageList" }}
                text={"channel"}
                menuProps={channelsMenu}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

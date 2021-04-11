import * as React from "react";
import { ITeamProps } from "./ITeamProps";
import { PersonCardInteraction, People } from "@microsoft/mgt-react";
import { getMyTeamsStyles } from "../../MyTeamsStyles";
import { CommandButton } from "office-ui-fabric-react/lib/Button";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack, StackItem } from "office-ui-fabric-react/lib/Stack";
import {
  IContextualMenuItem,
  IContextualMenuItemProps,
  IContextualMenuProps,
  ContextualMenuItemType,
} from "office-ui-fabric-react/lib/ContextualMenu";

import { useTeams } from "../../../../hooks";
import { ITeamMenber } from "../../../../common/model/ITeamMember";
import { EMembershipType } from "../../../../common/model/EMembersipType";
import { IShowMessageProps, ShowMessage } from "../ShowMessage";
import { MessageBarType } from "office-ui-fabric-react";
import strings from "ControlStrings";

export const Team: React.FunctionComponent<ITeamProps> = (
  props: React.PropsWithChildren<ITeamProps>
) => {
  const { styleClasses } = getMyTeamsStyles(props.themeVariant);

  const { team, serviceScope, onSelectedChannel } = props;
  const { getTeamMembers, getTeamChannels, getTeamOwners } = useTeams(
    serviceScope
  );
  const [teamMembers, setTeamMembers] = React.useState<string[]>([]);
  const [teamsOwners, setTeamOwners] = React.useState<string>("");
  const [channelsMenu, setChannelsMenu] = React.useState<IContextualMenuProps>({
    items: [],
  } as IContextualMenuProps);

  const [message, setMessage] = React.useState<IShowMessageProps>(undefined);
  const [hasError, setHasError] = React.useState<boolean>(false);

  const onClickChannel = React.useCallback(
    (
      ev: React.MouseEvent<HTMLElement, MouseEvent>,
      item: IContextualMenuItem
    ) => {
      onSelectedChannel
        ? onSelectedChannel(item.data.teamId, item.key)
        : window.open(item.data.webUrl);
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
        setHasError(false);
        setMessage(undefined);
        const _members: ITeamMenber[] = await getTeamMembers(team.id);
        const teamOwners: ITeamMenber[] = await getTeamOwners(team.id);
        let _renderOwners: string[] = [];
        for (const teamOwner of teamOwners) {
          _renderOwners.push(teamOwner.displayName);
        }
        setTeamOwners(_renderOwners.join(","));
        let publicChannels: IContextualMenuItem[] = [];
        let privateChannels: IContextualMenuItem[] = [];
        let _renderMembers: string[] = [];
        let allChannels: IContextualMenuItem[];

        for (const teamMember of _members) {
          _renderMembers.push(teamMember.userId);
        }
        setTeamMembers(_renderMembers);
        // get Channels
        const channels = await getTeamChannels(team.id);

        publicChannels.push({
          itemType: ContextualMenuItemType.Header,
          key: "public",
          text: "Public Channels",
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
          text: "Private Channels",
          iconProps: { iconName: "SecurityGroup" },
        });

        allChannels = [...publicChannels, ...privateChannels];
        setChannelsMenu({
          items: allChannels,
          contextualMenuItemAs: _renderItem,
        });
      } catch (error) {
        const messageError: IShowMessageProps = {
          isShow: true,
          message:
          strings.MyTeamsMessageError,
          messageBarType: MessageBarType.error,
        };
        console.log(error);
        setHasError(true);
        setMessage(messageError);
      }
    })();
  }, []);

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
                personCardInteraction={PersonCardInteraction.hover}
              ></People>
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

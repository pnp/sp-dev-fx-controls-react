import { ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClientV3 } from '@microsoft/sp-http';
import { PageContext } from "@microsoft/sp-page-context";
import React from "react";
import { ITeamMenber } from "../common/model/ITeamMember";
import { ITeam } from "./../common/model/ITeam";
import { ITeamChannel } from "./../common/model/ITeamChannel";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTeams = (serviceScope: ServiceScope) => {
  const _pageContext = React.useRef<PageContext>();
  const _msgGraphClient = React.useRef<MSGraphClientV3>();

  const init = React.useCallback(async () => {

      _pageContext.current = serviceScope.consume(PageContext.serviceKey);
      _msgGraphClient.current = await serviceScope
        .consume(MSGraphClientFactory.serviceKey)
        .getClient("3");

  }, [serviceScope]);

  const getMyTeams = React.useCallback(async (filter?: string): Promise<
    ITeam[]
  > => {
    await init();
    if (!_msgGraphClient.current) return;
    const teamsResults = await _msgGraphClient.current
      .api(`/me/joinedTeams`)
      .filter(
        filter ? `startswith(toupper(displayName),toupper('${filter}'))` : ""
      )
      .select("id,displayName")
      .get();
    return teamsResults.value as ITeam[];
  }, [init]);

  const getTeamChannels = React.useCallback(
    async (teamId: string, filter?: string): Promise<ITeamChannel[]> => {
      await init();
      if (!_msgGraphClient.current) return;
      const teamsChannelResults = await _msgGraphClient.current
        .api(`/teams/${teamId}/channels`)
        .filter(
          filter ? `startswith(toupper(displayName),toupper('${filter}'))` : ""
        )
        .get();

      return teamsChannelResults.value as ITeamChannel[];
    },
    [init]
  );

  const getTeamMembers = React.useCallback(async (teamId: string): Promise<
    ITeamMenber[]
  > => {
    await init();
    if (!_msgGraphClient.current) return;
    const usersResults = await _msgGraphClient.current
      .api(`/teams/${teamId}/members`)
      .get();

    return usersResults.value;
  }, [init]);

  const getTeamOwners = React.useCallback(async (teamId: string): Promise<
  ITeamMenber[]
  > => {
    await init();
    if (!_msgGraphClient.current) return;
    const usersResults = await _msgGraphClient.current
      .api(`/teams/${teamId}/members`)
      .filter(
        "microsoft.graph.aadUserConversationMember/roles/any(c:c eq 'owner')"
      )
      .get();
    return usersResults?.value as ITeamMenber[];
  }, [init]);



  return {
    init,
    getMyTeams,
    getTeamChannels,
    getTeamMembers,
    getTeamOwners
  };
};

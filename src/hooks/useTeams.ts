
import React from "react";

import { ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClient, MSGraphClientFactory } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";

import { ITeam } from "./../common/model/ITeam";
import { ITeamChannel } from "./../common/model/ITeamChannel";

export const useTeams = (serviceScope: ServiceScope) => {
  let _pageContext = React.useRef<PageContext>();
  let _msgGraphclient = React.useRef<MSGraphClient>();

  const init = React.useCallback(async () => {
    serviceScope.whenFinished(async () => {
      _pageContext.current = serviceScope.consume(PageContext.serviceKey);
      _msgGraphclient.current = await serviceScope
        .consume(MSGraphClientFactory.serviceKey)
        .getClient();
    });
  }, []);

  // constructer
  (async () => {
    await init();
  })();

  const getMyTeams = React.useCallback(async (filter: string): Promise<
    ITeam[]
  > => {
    // Get Events using Delta
    if (!_msgGraphclient.current) return;

    const teamsResults = await _msgGraphclient.current
      .api(`/me/joinedTeams`)
      .filter(
        filter ? `startswith(toupper(displayName),toupper('${filter}'))` : ""
      )
      .select("id,displayName")
      .get();

    return teamsResults.value as ITeam[];
  }, []);

  const getTeamChannels = React.useCallback(
    async (teamId: string, filter?: string): Promise<ITeamChannel[]> => {
      // Get Events using Delta
      if (!_msgGraphclient.current) return;
      const teamsChannelResults = await _msgGraphclient.current
        .api(`/teams/${teamId}/channels`)
        .filter(
          filter ? `startswith(toupper(displayName),toupper('${filter}'))` : ""
        )
        .get();

      return teamsChannelResults.value as ITeamChannel[];
    },
    []
  );

  return {
    init,
    getMyTeams,
    getTeamChannels,
  };
};

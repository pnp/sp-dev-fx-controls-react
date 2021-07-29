import { AppContext } from "../common";
import { useContext, useCallback } from "react";
import { MSGraphClientFactory, MSGraphClient } from "@microsoft/sp-http";
import { Person } from "@microsoft/microsoft-graph-types";
import { IUsers } from "../../peoplepicker/IUsers";
import { IUserInfo, IUsersResults } from "../models/IUsersResults";

interface returnObject {
  getUsers: (search: string) => Promise<IUsersResults>;
  getUsersNextPage: (nextLink: string) => Promise<IUsersResults>;
  getSuggestions: () => Promise<IUsersResults>;
}

//GET https://graph.microsoft.com/v1.0/me/people/?$filter=personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'
export const useMsGraphAPI = (): returnObject => {
  const { serviceScope } = useContext(AppContext);

  const getSuggestions = useCallback(async (): Promise<IUsersResults> => {
    const msGraphClient: MSGraphClient = await serviceScope.consume(MSGraphClientFactory.serviceKey).getClient();
    if (!msGraphClient) return;
    const _users: IUserInfo[] = [];

    const suggestedUsersResults = (await msGraphClient
      .api(`me/people`)
      .header("ConsistencyLevel", "eventual")
      .filter(`personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'`)
      .orderby(`displayName`)
      .get()) as any;
    console.log("rs", suggestedUsersResults);
    const _sugestions: Person[] = suggestedUsersResults.value as Person[];
    for (const sugestion of _sugestions) {
      _users.push({
        displayName: sugestion.displayName,
        givenName: sugestion.givenName,
        id: sugestion.id,
        mail: sugestion.scoredEmailAddresses[0].address,
      });
    }

    const returnInfo: IUsersResults = {
      users: _users,
      hasMore: false,
      nextLink: undefined,
    };
    return returnInfo;
  }, [serviceScope, MSGraphClientFactory]);

  const getUsers = useCallback(
    async (search: string): Promise<IUsersResults> => {
      const msGraphClient: MSGraphClient = await serviceScope.consume(MSGraphClientFactory.serviceKey).getClient();
      if (!msGraphClient || !search) return;
      let _search = "";
      let _filter = "";

      if (search.length) {
        _filter = `startswith(mail,'${search}') OR startswith(displayName,'${search}')`;
      }

      const usersResults = await msGraphClient
        .api(`/users`)
        .header("ConsistencyLevel", "eventual")
        .filter(_filter)
        .orderby(`displayName`)
        .count(true)
        .top(25)
        .get();
      console.log("rs", usersResults);
      const returnInfo: IUsersResults = {
        users: usersResults.value,
        hasMore: usersResults["@odata.nextLink"] ? true : false,
        nextLink: usersResults["@odata.nextLink"] ?? undefined,
      };
      return returnInfo;
    },
    [serviceScope, MSGraphClientFactory]
  );

  const getUsersNextPage = useCallback(
    async (nextLink: string): Promise<IUsersResults> => {
      const msGraphClient: MSGraphClient = await serviceScope.consume(MSGraphClientFactory.serviceKey).getClient();
      if (!msGraphClient) return;
      const usersResults = await msGraphClient.api(`${nextLink}`).get();

      const returnInfo: IUsersResults = {
        users: usersResults.value,
        hasMore: usersResults["@odata.nextLink"] ? true : false,
        nextLink: usersResults["@odata.nextLink"] ?? undefined,
      };
      return returnInfo;
    },
    [serviceScope, MSGraphClientFactory]
  );

  return { getUsers, getUsersNextPage, getSuggestions };
};

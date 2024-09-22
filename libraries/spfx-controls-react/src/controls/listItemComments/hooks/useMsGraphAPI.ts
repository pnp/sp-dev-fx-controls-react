import { Person } from "@microsoft/microsoft-graph-types";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import { useCallback, useContext } from "react";
import { AppContext } from "../common";
import { IUserInfo, IUsersResults } from "../models/IUsersResults";

interface returnObject {
  getUsers: (search: string) => Promise<IUsersResults>;
  getUsersNextPage: (nextLink: string) => Promise<IUsersResults>;
  getSuggestions: () => Promise<IUsersResults>;
}

export const useMsGraphAPI = (): returnObject => {
  const { serviceScope } = useContext(AppContext);
  let _msGraphClient: MSGraphClientV3 = undefined;
  serviceScope.whenFinished(async () => {
    _msGraphClient = await serviceScope.consume(MSGraphClientFactory.serviceKey).getClient("3");
  });
  const getSuggestions = useCallback(async (): Promise<IUsersResults> => {
    if (!_msGraphClient) return;
    const _users: IUserInfo[] = [];

    const suggestedUsersResults = (await _msGraphClient
      .api(`me/people`)
      .header("ConsistencyLevel", "eventual")
      .filter(`personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'`)
      .orderby(`displayName`)
      .get()) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  }, [_msGraphClient]);

  const getUsers = useCallback(
    async (search: string): Promise<IUsersResults> => {
      if (!_msGraphClient || !search) return;
      let _filter = "";

      if (search.length) {
        _filter = `mail ne null AND (startswith(mail,'${search}') OR startswith(displayName,'${search}'))`;
      }

      const usersResults = await _msGraphClient
        .api(`/users`)
        .header("ConsistencyLevel", "eventual")
        .filter(_filter)
        .orderby(`displayName`)
        .count(true)
        .top(25)
        .get();

      const returnInfo: IUsersResults = {
        users: usersResults.value,
        hasMore: usersResults["@odata.nextLink"] ? true : false,
        nextLink: usersResults["@odata.nextLink"] ?? undefined,
      };
      return returnInfo;
    },
    [_msGraphClient]
  );

  const getUsersNextPage = useCallback(
    async (nextLink: string): Promise<IUsersResults> => {
      if (!_msGraphClient) return;
      const usersResults = await _msGraphClient.api(`${nextLink}`).get();
      const returnInfo: IUsersResults = {
        users: usersResults.value,
        hasMore: usersResults["@odata.nextLink"] ? true : false,
        nextLink: usersResults["@odata.nextLink"] ?? undefined,
      };
      return returnInfo;
    },
    [_msGraphClient]
  );

  return { getUsers, getUsersNextPage, getSuggestions };
};

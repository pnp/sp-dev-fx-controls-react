/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  Presence,
  User,
} from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { IGraphBatchRequest } from '../models/IGraphBatchRequest';
import { IUserInfo } from '../models/IUserInfo';
import { useCache } from './useLocalStorage';
import { useUtils } from './useUtils';

interface IuseGraphUserAPI {
  getUserByName: (searchName: string) => Promise<User[] | undefined>;
  getUserById: (user: string) => Promise<IUserInfo | undefined>;
  getUserPresence: (userObjectId: string) => Promise<Presence | undefined>;
}

export const useGraphUserAPI = (context: BaseComponentContext): IuseGraphUserAPI => {
  const { getCacheValue, setCacheValue } = useCache("local");
  const { b64toBlob, blobToBase64 } = useUtils();

  const graphClient = React.useMemo(async () => {
    if (!context) return undefined;
    return await context.msGraphClientFactory.getClient("3");
  }, [context]);

  const getUserByName = React.useCallback(
    async (searchName: string): Promise<User[] | undefined> => {
      if (!graphClient || !searchName) return undefined;

      try {
        const response: any = await (await graphClient)
          ?.api(
            `/users?$filter=startswith(displayName,'${searchName}') and accountEnabled eq true and userType eq 'Member'`
          )
          .select("displayName,mail,jobTitle,department,officeLocation,preferredLanguage,accountEnabled,assignedLicenses,assignedPlans,usageLocation,userPrincipalName")
          .get();
        if (response) {
          return response?.value ?? undefined;
        }
      } catch (error) {
        console.log("[getUserByName] error:", error);
        throw new Error("Something went wrong when fetching user");
      }
      return undefined;
    },
    [graphClient]
  );

  const getUserById = React.useCallback(
    async (user: string): Promise<IUserInfo | undefined> => {
      let userInfo: IUserInfo | undefined;
      let blobPhoto: string | undefined;
      let usersResults: User | undefined;

      // Create a Batch Request
      // 2 rquests
      // id=1 = user Info
      // id=2 = user Photo

      if (!graphClient) return undefined;
      const batchRequests: IGraphBatchRequest[] = [
        {
          id: "1",
          url: `/users/${user}?$select=country,id, displayName,mail,jobTitle,department,officeLocation,preferredLanguage,accountEnabled,assignedLicenses,assignedPlans,usageLocation,userPrincipalName`,
          method: "GET",
          headers: {
            ConsistencyLevel: "eventual",
          },
        },
        {
          id: "2",
          url: `/users/${user}/photo/$value`,
          headers: { "content-type": "img/jpg" },
          method: "GET",
        },

      ];

      // Try to get user information from cache
      try {
        userInfo = await getCacheValue(`${user}`);
        if (userInfo) {
        return userInfo;
        }
        const batchResults: any = await (await graphClient)
        ?.api(`/$batch`)
        .version("v1.0")
        .post({ requests: batchRequests });

      // get Responses
      const responses: any = batchResults?.responses;
      // load responses
      for (const response of responses) {
        // user info
        switch (response.id) {
          case "1":
            usersResults = response.body;
            break;
          case "2":
            const binToBlob = response?.body ? await b64toBlob(response?.body, "img/jpg") : undefined;
            blobPhoto = (await blobToBase64(binToBlob as any)) ?? undefined;
            break;

          default:
            break;
        }
      }
      // save userinfo in cache
      userInfo = { ...usersResults, userPhoto: blobPhoto as any, presence: undefined  };
      // return Userinfo with photo
      setCacheValue(`${user}`, userInfo);
      return userInfo;
      } catch (error) {
        // execute batch
        console.log("[getUserById] error:", error);
      }
    },
    [graphClient, getCacheValue]
  );


  const getUserPresence = React.useCallback(
    async (userObjectId: string): Promise<Presence | undefined> => {
      if (!graphClient || !userObjectId) return ;

      try {
        const response: any = await (await graphClient)
          ?.api(
            `/users/${userObjectId}/presence`
          )

          .get();
        if (response) {
          return response ?? undefined;
        }
      } catch (error) {
        console.log("[getUserPresence] error:", error);
        throw new Error("Something went wrong when getting user presence");
      }
      return undefined;
    },
    [graphClient]
  );

  return { getUserById, getUserByName, getUserPresence };
};

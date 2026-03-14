import { ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import React from "react";
import { IGroup } from "../common/model/IGroup";

const escapeFilterValue = (value: string): string =>
  value.replace(/'/g, "''");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGroups = (serviceScope: ServiceScope) => {
  const _pageContext = React.useRef<PageContext>();
  const _msgGraphClient = React.useRef<MSGraphClientV3>();

  const init = React.useCallback(async () => {
    _pageContext.current = serviceScope.consume(PageContext.serviceKey);
    _msgGraphClient.current = await serviceScope
      .consume(MSGraphClientFactory.serviceKey)
      .getClient("3");
  }, [serviceScope]);

  const getGroups = React.useCallback(
    async (filter?: string): Promise<IGroup[]> => {
      await init();
      if (!_msgGraphClient.current) return [];

      const api = _msgGraphClient.current
        .api("/groups")
        .select(
          "id,displayName,description,groupTypes,mailEnabled,mail,securityEnabled,visibility,resourceProvisioningOptions"
        );

      if (filter) {
        api.filter(
          `startswith(toupper(displayName),toupper('${escapeFilterValue(
            filter
          )}'))`
        );
      }

      const groupResults = await api.get();
      return groupResults.value as IGroup[];
    },
    [init]
  );

  return {
    init,
    getGroups,
  };
};

import React from "react";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BaseComponentContext } from "@microsoft/sp-component-base";

export const useDeleteFile = ( context: BaseComponentContext) => {
 const deleteFile =   React.useCallback(async (driveId:string, siteId:string, itemId:string, uploadLocation: string ) => {
    const graphClient = await context.msGraphClientFactory.getClient("3");

    try {
      let requestURL = `/sites/${siteId}/drives/${driveId}/items/${itemId}`;
      if (uploadLocation === "OneDrive") {
        requestURL = `/me/drive/items/${itemId}`;
      }
      await graphClient.api(requestURL).delete();
      return true;
    } catch (err) {
      console.error(`[DeleteFile] Err='${err.message}'`);
      throw new Error(`Something went wrong when deleting the file. Status='${err.status}`);

    }

 }, []);

  return [ deleteFile ] as const;

};

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPHttpClient } from '@microsoft/sp-http';

import { useGraphAPI } from './useGrapAPI';

interface ISpAPI {
  
  
  getADAcesstoken: () => Promise<void>;
  downloadBingContent: (absoluteFileUrl: string, fileName: string) => Promise<File>;
  downLoadSpOrOneDriveContent: (driveId: string, itemId: string, fileName: string) => Promise<File>;
 
}
export const useSpAPI = (context: BaseComponentContext): ISpAPI => {
   const { getDriveItemDownloadUrl } = useGraphAPI(context);

  const getFileFromBlob = React.useCallback((blob: Blob, fileName: string): File => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }, []);
 
  const getADAcesstoken = React.useCallback( async () => {
    const token1 = await context.aadTokenProviderFactory.getTokenProvider();
    const token = await token1.getToken('https://microsoft.sharepoint.com');

    const getSiteLists = await fetch('https://ysz3l-my.sharepoint.com/personal/jmendes_spteckint_onmicrosoft_com/_api/web/lists', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await   getSiteLists.json();
    console.log(data);
    
  }, []);
 



  const  downloadBingContent = async (absoluteFileUrl: string, fileName: string): Promise<File> => {
    try {
      const fileDownloadResult = await  context.httpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1, {
        method: "GET",
        mode: "cors"
      });

      if (!fileDownloadResult || !fileDownloadResult.ok) {
        throw new Error(`Something went wrong when downloading the file. Status='${fileDownloadResult.status}'`);
      }

      // Return file created from blob
      const blob: Blob = await fileDownloadResult.blob();
      return  getFileFromBlob(blob, fileName);
    } catch (err) {
      console.error(`[DownloadBingContent] Err='${err.message}'`);
      return null;
    }
  }


  const downLoadSpOrOneDriveContent = async (driveId: string, itemId:string ,fileName: string): Promise<File> => {

    try {
      const fileDownloadUrl = await getDriveItemDownloadUrl(driveId, itemId);
      const fileDownloadResult = await  context.httpClient.get(fileDownloadUrl, SPHttpClient.configurations.v1, {
        method: "GET",
        mode: "cors"
      });

      if (!fileDownloadResult || !fileDownloadResult.ok) {
        throw new Error(`Something went wrong when downloading the file. Status='${fileDownloadResult.status}'`);
      }

      // Return file created from blob
      const blob: Blob = await fileDownloadResult.blob();
      return  getFileFromBlob(blob, fileName);
    } catch (err) {
      console.error(`[DownloadBingContent] Err='${err.message}'`);
      return null;
    }
  };

  return {
     getADAcesstoken, downloadBingContent, downLoadSpOrOneDriveContent
  };
};

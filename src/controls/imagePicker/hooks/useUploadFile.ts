/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { BaseComponentContext } from "@microsoft/sp-component-base";

import { EUploadLocations } from "../constants/EUploadLocations";
import { IUploadFileResult } from "../models/IUploadFileResult";

export const useUploadFile = (context: BaseComponentContext) => {
  const [showProgressBar, setShowProgressBar] = React.useState<boolean>(false);
  const [percentComplete, setPercentComplete] = React.useState<number>(0);
  const [uploadedFile, setUploadedFile] = React.useState<any>(null);
  const [isUploadFinished, setIsUploadFinished] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>(null);

  React.useEffect(() => {
    setShowProgressBar(false);
    setPercentComplete(0);
    setUploadedFile(null);
    setIsUploadFinished(false);
  }, []);

  const uploadFile = React.useCallback(
    async (
      file: File,
      folderName: string = "Upload Images",
      siteId: string,
      libraryId: string,
      uploadLocation: string
    ): Promise<IUploadFileResult> => {
      //await delay(5000);
      setShowProgressBar(true);
      let result: any = null;
      const graphClient = await context.msGraphClientFactory.getClient("3");

      try {
        const payload = {
          "@microsoft.graph.conflictBehavior": "rename",
          description: "description",
          fileSize: file.size,
          name: `${file.name}`,
        };

        //Step1: Create the upload session

        let requestURL = `/sites/${siteId}/drives/${libraryId}/root:/${folderName}/${file.name}:/createUploadSession`;
        if (uploadLocation === EUploadLocations.OneDrive) {
          requestURL = `/me/drive/root:/${folderName}/${file.name}:/createUploadSession`;
        }
        const uploadSessionRes = await graphClient.api(requestURL).post(payload);
        const uploadEndpoint: string = uploadSessionRes.uploadUrl;

        //Get file content
        const fileBuffer = file;

        // Maximum file chunk size
        const FILE_CHUNK_SIZE = 320 * 1024; // 0.32 MB;

        //Total number of chunks for given file
        const NUM_CHUNKS = Math.floor(fileBuffer.size / FILE_CHUNK_SIZE) + 1;

        //Counter for building progress bar
        let counter = 1;

        //Initial value of upload index
        let uploadIndex: number = 0;

        for (; uploadIndex < fileBuffer.size; ) {
          //Get the current progress bar status
          const progressValue = parseFloat((counter / NUM_CHUNKS).toFixed(2));
          setPercentComplete(progressValue);

          //Calculate the end index
          let endIndex = uploadIndex + FILE_CHUNK_SIZE - 1;

          //Gets the slice
          let slice: Blob;
          if (endIndex >= fileBuffer.size) {
            endIndex = fileBuffer.size - 1;
            slice = fileBuffer.slice(uploadIndex);
          } else {
            slice = fileBuffer.slice(uploadIndex, endIndex + 1);
          }

          //Upload file
          const headers = {
            "Content-Length": `${slice.size}`,
            "Content-Range": `bytes ${uploadIndex}-${endIndex}/${fileBuffer.size}`,
          };

          const response = await graphClient.api(uploadEndpoint).headers(headers).put(slice);
          if (!response) {
            break;
          }
          if (response.nextExpectedRanges) {
            //Get the next expected range of the slice
            uploadIndex = parseFloat(response.nextExpectedRanges[0]);
            counter++;
          } else {
            //if there is no next range then break the loop
            //Gets the upoaded file response
            result = response;
            setUploadedFile(result);
            console.log("Upload finished", result);
            break;
          }
        }
        setShowProgressBar(false);
        setIsUploadFinished(true);
        setUploadedFile(result);
        setError(null);
        return result;
      } catch (error) {
        console.log("Error in UploadLargeFileInChunks:", error);
        setShowProgressBar(false);
        setIsUploadFinished(true);
        setError(error as Error);
        throw error;
      }
    },
    [context]
  );

  return [uploadFile, showProgressBar, percentComplete, uploadedFile, isUploadFinished, error] as const;
};

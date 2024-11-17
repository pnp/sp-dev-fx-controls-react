/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { useAtom } from 'jotai';

import { globalState } from '../../jotai/atoms';
import { IGlobalState } from '../../models/IGlobalState';
import { DocumentList } from '../DocumentList/DocumentList';
import { IUploadFilesProps } from './IUploadFilesProps';

export const UploadFilesControl:React.FunctionComponent<IUploadFilesProps> = (
  props: React.PropsWithChildren<IUploadFilesProps>
) => {
  const { themeVariant, context, title,onUploadFiles ,  pageSize} = props;
  const  [ ,setGlobalState] = useAtom(globalState);
  React.useEffect(() => {
     setGlobalState((prevState: IGlobalState) =>  {
      return {
     ...prevState,
      themeVariant: themeVariant,
      context: context,
      title: title,
      onUploadFiles: onUploadFiles,
      pageSize: pageSize
  }});
  }, [themeVariant, context, pageSize,title,   onUploadFiles]);
    return (
      <section>
          <DocumentList onUploadFiles={onUploadFiles}/>
      </section>
    );

}

import { MessageBar } from '@fluentui/react/lib/MessageBar';
import * as React from 'react';
import {IShowMessageProps} from './IShowMessageProps';


export const ShowMessage: React.FunctionComponent<IShowMessageProps> = (props: IShowMessageProps) => {
  if (props.isShow){
    return (
      <>
      <MessageBar {...props }>{props.message}</MessageBar>
      </>
    );
  }
  // nullRender
 return null;
};

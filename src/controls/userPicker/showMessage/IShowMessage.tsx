import * as React from 'react';

import { EMessageType } from '../constants/EMessageTypes';

export interface IShowMessageProps {
  messageType: EMessageType;
  message: string | React.ReactNode;
  children?: React.ReactNode;
}

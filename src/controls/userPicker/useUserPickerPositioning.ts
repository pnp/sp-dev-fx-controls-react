import * as React from 'react';

import {
  PositioningShorthandValue,
  resolvePositioningShorthand,
  usePositioning,
} from '@fluentui/react-positioning';

import { IUserPickerProps } from './IUserPickerProps';

export  const useUserPickerPositioning = (props: IUserPickerProps): [React.MutableRefObject<unknown>, React.MutableRefObject<unknown>]  => {
  const { positioning } = props;

  // Set a default set of fallback positions to try if the dropdown does not fit on screen
  const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

  // popper options
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: { crossAxis: 0, mainAxis: 2 },
    fallbackPositions,
    matchTargetSize: 'width' as const,
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popperOptions);

  return [containerRef, targetRef];
}

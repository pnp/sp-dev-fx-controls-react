 
import * as React from 'react';

import { ICardProps } from './ICardProps';
import { useComponentUtils } from '../hooks/useComponentsUtils';

export const useCardStyles = (props: ICardProps): { cardStyles: (containerWidth: number, containerHeight: number) => React.CSSProperties; bodyCardDefaultStyles: React.CSSProperties } => {
  const { styles } = props;
  const { getBaseStyles } = useComponentUtils();

  const cardStyles = React.useCallback(
    (containerWidth: number, containerHeight: number): React.CSSProperties => {
      const baseStyles = getBaseStyles(props as unknown, containerWidth, containerHeight);
      return {
        ...baseStyles,
        ...styles,
      };
    },
    [getBaseStyles, props, styles],
  );

  const bodyCardDefaultStyles: React.CSSProperties = React.useMemo(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'stretch',
      overflow: 'unset',
    };
  }, []);

  return { cardStyles, bodyCardDefaultStyles };
};

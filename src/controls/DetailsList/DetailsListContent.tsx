import * as React from 'react';
import { Text } from '@fluentui/react-components';

export const renderDetailsListContent = (
  content: React.ReactNode,
  className?: string,
): React.ReactNode => {
  if (typeof content === 'string' || typeof content === 'number') {
    return <Text className={className}>{content}</Text>;
  }
  return content;
};

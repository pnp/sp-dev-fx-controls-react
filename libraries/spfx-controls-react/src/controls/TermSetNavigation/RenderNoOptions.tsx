import * as React from 'react';

import * as strings from 'ControlStrings';

import {
  Image,
  Stack,
  Text,
} from '@fluentui/react';

export interface IRenderNoOptionsProps {}

export const RenderNoOptions: React.FunctionComponent<IRenderNoOptionsProps> = (
  props: React.PropsWithChildren<IRenderNoOptionsProps>
) => {
  return (
    <>
      <Stack tokens={{ childrenGap: 10 }} verticalFill verticalAlign="start" horizontalAlign="center">
        <Image src={require("./assets/menu-rafiki.svg")} width={210} height={210} />
        <Stack tokens={{ childrenGap: 5 }} horizontalAlign={"center"}>
          <Text variant="large">{strings.TermSetNavigationNoTerms}</Text>
        </Stack>
      </Stack>
    </>
  );
};

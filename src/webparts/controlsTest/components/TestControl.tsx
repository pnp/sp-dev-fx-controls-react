import * as React from 'react';

import { Stack } from '@fluentui/react';
import { TermStore } from '@microsoft/microsoft-graph-types';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { TermSetNavigation } from '../../../TermSetNavigation';

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant: any;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const { themeVariant, context } = props;

  const onSelect = React.useCallback((selected: TermStore.Term) => {
    console.log(selected);
  }, []);

  const onSelectedTermAction = React.useCallback((selected: TermStore.Term, option:string) => {
    console.log(selected, option);
  }, []);

  return (
    <>
      <Stack>
        <TermSetNavigation
          context={context}
          themeVariant={themeVariant}
          termSetId={"289180a0-4a8b-4f08-ae6e-ea3fb1b669e2"}
          showContextMenu={true}
          contextMenuItems={[
            {
              key: "add",
              text: "Add",
              iconProps: { iconName: "add" },
            },
            {
              key: "adit",
              text: "Edit",
              iconProps: { iconName: "Edit" },
            },
            {
              key: "remove",
              text: "Remove",
              iconProps: { iconName: "delete" },
            },
          ]}
          onSelected={onSelect}
          onSelectedTermAction={onSelectedTermAction}
        />
      </Stack>
    </>
  );
};

import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import {
  IStep,
  ProgressStepsIndicator,
} from '../../../controls/ProgressStepsIndicator';

const progressSteps: IStep[] = [
  { id: 0, title: "Step 1", description: "Step 1 Description" },
  { id: 1, title: "Step 2", description: "Step 2 Description" },
  { id: 3, title: "Step 3", description: "Step 3 Description" },
  { id: 4, title: "Step 4", description: "Step 4 Description" },
  { id: 5, title: "Step 5", description: "Step 5 Description" },
  { id: 6, title: "Step 6", description: "Step 6 Description" },
];

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant?: IReadonlyTheme;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {

  const onValueChange = React.useCallback((newValue: string, validationErrors: string[]): void => {
    console.log(newValue);
  }, []);

  return (
    <>
      <Stack tokens={{ childrenGap: 60, padding: 10 }}>
        <ProgressStepsIndicator steps={progressSteps} currentStep={0} themeVariant={props.themeVariant} />
        <ProgressStepsIndicator steps={progressSteps} currentStep={3} themeVariant={props.themeVariant} />
      </Stack>
    </>
  );
};

import * as React from 'react';

import * as strings from 'ControlStrings';
import {
  Customizer,
} from '@fluentui/react/lib/Utilities';

import {
  Stack,
} from '@fluentui/react/lib/Stack';
import {
  Icon,
} from '@fluentui/react/lib/Icon';

import {
  Label,
} from '@fluentui/react/lib/Label';
import {
  MessageBarType,
 MessageBar,
} from '@fluentui/react/lib/MessageBar';

import { IProgressStepsIndicatorProps } from './IProgressStepsIndicatorProps';
import {
  getProgressStepsIndicatorStyles,
} from './ProgressStepsIndicatorStyles';

export const ProgressStepsIndicator: React.FunctionComponent<IProgressStepsIndicatorProps> = (
  props: IProgressStepsIndicatorProps
) => {
  const [renderSteps, setRenderSteps] = React.useState<JSX.Element[]>([]);
  const [renderStepsTitle, setRenderStepsTitle] = React.useState<JSX.Element[]>([]);
  const { steps, currentStep, themeVariant } = props;
  const {
    labelStepTitleCurrentStyle,
    labelStepTitleStyle,
    labelStepStyles,
    stackStepsStyles,
    componentClasses,
  } = getProgressStepsIndicatorStyles(themeVariant, currentStep, steps.length);

  React.useEffect(() => {
    (() => {
      const _renderSteps: JSX.Element[] = [];
      const _renderStepTitle: JSX.Element[] = [];

      const _currentStep: number = currentStep ? currentStep : 0;
      if (steps && steps.length) {
        steps.map((step, i) => {
          if (_currentStep > i) {
            _renderSteps.push(
              <Stack key={`${i}`} horizontal>
                <div className={componentClasses.bulletCompleted}>
                  <Icon iconName={"CheckMark"} />
                </div>
              </Stack>
            );

            _renderStepTitle.push(
              <Label key={`${i}`} styles={labelStepTitleStyle}>
                {step.title}
              </Label>
            );
          }

          if (_currentStep === i) {
            _renderSteps.push(
              <Stack key={`${i}`} horizontal>
                <div key={`${i}`} className={componentClasses.bulletCurrent}>
                  <Label styles={labelStepStyles}>{i + 1}</Label>
                </div>
              </Stack>
            );
            _renderStepTitle.push(
              <Label key={`${i}`} styles={labelStepTitleCurrentStyle}>
                {step.title}
              </Label>
            );
          }
          if (_currentStep < i) {
            _renderSteps.push(
              <div key={`${i}`} className={componentClasses.bullet}>
                <Label styles={labelStepStyles}>{i + 1}</Label>
              </div>
            );
            _renderStepTitle.push(
              <Label key={`${i}`} styles={labelStepTitleStyle}>
                {step.title}
              </Label>
            );
          }
        });
      }
      setRenderSteps(_renderSteps);
      setRenderStepsTitle(_renderStepTitle);
    })();
  }, [steps, currentStep]);

  if (steps && steps.length === 0) {
    return <MessageBar messageBarType={MessageBarType.info}>{strings.ProgressStepsIndicatorNoSteps}</MessageBar>;
  }

  return (
    <Customizer settings={{ theme: props.themeVariant }}>
      <Stack styles={stackStepsStyles}>
        <div className={componentClasses.line} />
        <Stack horizontal horizontalAlign="space-between">
          {renderSteps}
        </Stack>
      </Stack>
      <Stack horizontal horizontalAlign="space-between" styles={{ root: { marginTop: "7px !important" } }}>
        {renderStepsTitle}
      </Stack>
    </Customizer>
  );
};

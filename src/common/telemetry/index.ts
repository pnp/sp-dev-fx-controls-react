import PnPTelemetry from "@pnp/telemetry-js";
import { version } from './version';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import * as React from 'react';

const CONTROL_TYPE = "react";

/**
 * Track control information
 *
 * @param componentName
 * @param properties
 */
export function track(componentName: string, properties: any = {}): void { // eslint-disable-line @typescript-eslint/no-explicit-any
  const telemetry = PnPTelemetry.getInstance();
  telemetry.trackEvent(componentName, {
    version,
    controlType: CONTROL_TYPE,
    debug: DEBUG ? "true" : "false",
    environment: EnvironmentType[Environment.type],
    ...properties
  });
}

export const useTelemetry = (componentName: string, properties: any = {}): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const [hasBeenCalled, setHasBeenCalled] = React.useState<boolean>(false);

  if (hasBeenCalled) {
    return;
  }

  track(componentName, properties);
  setHasBeenCalled(true);
};

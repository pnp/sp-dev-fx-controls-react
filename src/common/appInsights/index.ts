import { AppInsights } from "applicationinsights-js";
import { version } from './version';
import {Environment,EnvironmentType} from "@microsoft/sp-core-library";

const controlType = "react";

AppInsights.downloadAndSetup({ instrumentationKey: "9f59b81e-d2ed-411e-a961-8bcf3f7f04d0" });

appInsights.queue.push(() => {
  // Remove operation name from the telemetry
  if (AppInsights.context && AppInsights.context.operation && AppInsights.context.operation.name) {
    AppInsights.context.operation.name = null;
  }

  // Filter out telemetry data
  appInsights.context.addTelemetryInitializer((envelope: Microsoft.ApplicationInsights.IEnvelope) => {
    const telemetryItem = envelope.data.baseData;
    // Only send telemetry data if it contains data of this library
    if (!telemetryItem.properties || !telemetryItem.properties.controlType) {
      return false;
    }

    // Only send telemetry if it is coming from the right control type
    if (telemetryItem.properties && telemetryItem.properties.controlType && telemetryItem.properties.controlType !== controlType) {
      return false;
    }
  });
});

export function track(componentName: string, properties: any = {}): void {
  AppInsights.trackEvent(componentName, {
    version,
    controlType,
    debug: DEBUG ? "true" : "false",
    environment: EnvironmentType[Environment.type],
    ...properties
  });
}

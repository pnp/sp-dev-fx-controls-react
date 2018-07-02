import { AppInsights } from "applicationinsights-js";
import { version } from './version';
import {Environment,EnvironmentType} from "@microsoft/sp-core-library";

const controlType = "react";
const iKey = "9f59b81e-d2ed-411e-a961-8bcf3f7f04d0";

if (typeof AppInsights !== "undefined") {
  AppInsights.downloadAndSetup({
    instrumentationKey: iKey,
    disableExceptionTracking: true,
    disableAjaxTracking: true
  });
}

if (typeof appInsights !== "undefined") {
  appInsights.queue.push(() => {
    // Remove operation name from the telemetry
    if (AppInsights.context && AppInsights.context.operation && AppInsights.context.operation.name) {
      AppInsights.context.operation.name = null;
    }

    // Filter out telemetry data
    appInsights.context.addTelemetryInitializer((envelope: Microsoft.ApplicationInsights.IEnvelope) => {
      // Only run this telemetry initializer for the PnP controls
      if (envelope.iKey === iKey) {
        const telemetryItem = envelope.data.baseData;
        // Only send telemetry data if it contains data of this library
        if (!telemetryItem.properties || !telemetryItem.properties.controlType) {
          return false;
        }

        // Check if the type of data is only EventData, otherwise this may not be sent
        if (envelope.data && envelope.data.baseType !== "EventData") {
          return false;
        }

        // Only send telemetry if it is coming from the right control type
        if (telemetryItem.properties && telemetryItem.properties.controlType && telemetryItem.properties.controlType !== controlType) {
          return false;
        }
      }
    });
  });
}

export function track(componentName: string, properties: any = {}): void {
  AppInsights.trackEvent(componentName, {
    version,
    controlType,
    debug: DEBUG ? "true" : "false",
    environment: EnvironmentType[Environment.type],
    ...properties
  });
}

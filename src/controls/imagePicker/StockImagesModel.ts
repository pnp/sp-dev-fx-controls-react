export interface EventFlags {
  dataCategories: number;
  diagnosticLevel: number;
}

export interface DataField {
  name: string;
  dataType: number;
  value: string;
  classification: number;
}

export interface TelemetryProperties {
  ariaTenantToken: string;
  nexusTenantToken: number;
}

export interface EventValue {
  eventName: string;
  eventFlags: EventFlags;
  dataFields: DataField[];
  telemetryProperties: TelemetryProperties;
}
export interface SubmitValue {
  action: string;
  contenttype: string;
  sourceUrl: string;
  caption: string;
}

export interface StockImagesEvent {
  MessageId: string;
  Values: EventValue | SubmitValue[];
  SendTime: number;
}
import * as React from "react";

import {
  Body1,
  Card,
  FluentProvider,
  IdPrefixProvider,
  Text,
  Title3,
  tokens,
  webLightTheme,
} from "@fluentui/react-components";
import {
  ISPFilePickerItem,
  SPFilePicker,
} from "../../../controls/SPFilePicker";

import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITestSPFilePickerControlProps {
  context: WebPartContext;
}

export const TestSPFilePickerControl: React.FunctionComponent<ITestSPFilePickerControlProps> = (props) => {
  const { context } = props;
  const [items, setItems] = React.useState<ISPFilePickerItem[]>([]);

  return (
    <IdPrefixProvider value="TestSPFilePickerControl">
    <FluentProvider theme={webLightTheme}>
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
        <Title3>SPFilePicker</Title3>
        <Body1>
          Opens the Microsoft-hosted SharePoint / OneDrive File Picker (v8) in a
          dialog and returns the selected item(s).
        </Body1>

        <SPFilePicker
          context={context}
          selectionMode="multiple"
          itemsMode="files"
          fileTypes={["docx", "pdf", "xlsx", "pptx"]}
          onPicked={(picked) => {
            console.log("SPFilePicker picked:", picked);
            setItems(picked);
          }}
          onCancel={() => console.log("SPFilePicker cancelled")}
          onError={(error) => console.error("SPFilePicker error:", error)}
        />

        {items.length > 0 && (
          <Card style={{ padding: tokens.spacingVerticalM }}>
            <Text weight="semibold">Selected item(s):</Text>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name ?? item.id}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </FluentProvider>
    </IdPrefixProvider>
  );
};

export default TestSPFilePickerControl;

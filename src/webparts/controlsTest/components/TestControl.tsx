import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IBasePickerStyles } from "office-ui-fabric-react/lib/Pickers";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { ListItemComments } from "../../../controls/listItemComments";
import { Elanguages, MonacoEditor } from "../../../controls/monacoEditor";
import { PeoplePicker, PrincipalType } from "../../../PeoplePicker";
export interface ITestControlProps {
  context: WebPartContext;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  return (
    <>
      <Stack>
        <MonacoEditor
          value={""}
          theme={"vs"}
          readOnly={false}
          showLineNumbers={true}
          showMiniMap={true}

          onValueChange={function (newValue: string, validationErrors: string[]): void {
            console.log(newValue);

          }}
          language={
            Elanguages.json
          }
        />
      </Stack>
    </>
  );
};

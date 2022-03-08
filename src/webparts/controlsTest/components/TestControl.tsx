import * as React from "react";

import { Stack } from "office-ui-fabric-react/lib/Stack";

import { WebPartContext } from "@microsoft/sp-webpart-base";

import { MonacoEditor } from "../../../controls/monacoEditor";

export interface ITestControlProps {
  context: WebPartContext;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const defaultValue  = React.useMemo(() => {
    return (['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'));
  } , []);

  const onValueChange = React.useCallback( (newValue: string, validationErrors: string[]): void => {
  console.log(newValue);
 } , []);

  return (
    <>
      <Stack>
        <MonacoEditor
          value={defaultValue}
          showMiniMap={true}
          onValueChange={onValueChange}
          language={"javascript"}
          showLineNumbers={true}
        />
      </Stack>
    </>
  );
};

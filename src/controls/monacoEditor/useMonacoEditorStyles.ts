import { IProcessedStyleSet, mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import React from "react";

export const useMonacoEditorStyles = (): {
  controlClasses: IProcessedStyleSet<{
    containerStyles: {
      height: string;
    };
  }>;
} => {
  const controlClasses = React.useMemo(() => {
    return mergeStyleSets({
      containerStyles: {
        height: "800px",
      }
    });
  }, []);

  return { controlClasses };
};

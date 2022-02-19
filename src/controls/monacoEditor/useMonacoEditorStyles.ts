import { mergeStyleSets } from "office-ui-fabric-react";
import React from "react";

export const useMonacoEditorStyles = () => {
  const controlClasses =  React.useMemo(() =>{
      return mergeStyleSets({
        containerStyles:{
          height: "800px",
        }
      });
  },[]);

  return {controlClasses };
};

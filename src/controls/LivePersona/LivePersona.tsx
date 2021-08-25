import * as React from "react";
import { createElement, useEffect, useRef } from "react";
import { useState } from "react";
import { Log } from "@microsoft/sp-core-library";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ILivePersonatProps} from '.';

const LIVE_PERSONA_COMPONENT_ID: string = "914330ee-2df2-4f6e-a858-30c23a812408";


export const LivePersona: React.FunctionComponent<ILivePersonatProps> = (
  props: React.PropsWithChildren<ILivePersonatProps>
) => {
  const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false);
  const sharedLibrary = useRef<any>();
  const { upn, template, disableHover, context, serviceScope } = props;

  useEffect(() => {
    (async () => {
      if (!isComponentLoaded) {
        try {
          sharedLibrary.current = await SPComponentLoader.loadComponentById(LIVE_PERSONA_COMPONENT_ID);
          setIsComponentLoaded(true);
        } catch (error) {
          Log.error(`[LivePersona]`, error, serviceScope ?? context.serviceScope);
        }
      }
    })();
  }, []);

let renderPersona: JSX.Element = null;
if (isComponentLoaded) {
    renderPersona = createElement(sharedLibrary.current.LivePersonaCard, {
        className: 'livePersonaCard',
        clientScenario: 'livePersonaCard',
        disableHover:  disableHover,
        hostAppPersonaInfo: {
            PersonaType: 'User'
        },
        upn:  upn,
        serviceScope: serviceScope ?? context.serviceScope,
    }, createElement("div",{},template));
}
return renderPersona;
};

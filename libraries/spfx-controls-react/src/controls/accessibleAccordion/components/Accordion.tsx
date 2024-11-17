import "../css/AccordionStylesOverride.css";

import * as React from "react";
import { DivAttributes } from "../helpers/types";
import { Provider } from "./AccordionContext";
import { UUID } from "./ItemContext";
import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';
import { getFluentUIThemeOrDefault } from "../../../common/utilities/ThemeUtility";
import { useTheme } from "@fluentui/react-theme-provider/lib/useTheme";
import { useEffect, useRef } from "react";

type AccordionProps = Pick<
  DivAttributes,
  Exclude<keyof DivAttributes, 'onChange'>> & {
    className?: string;
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    onChange?(args: UUID[]): void;
    /**
    * Set Fluent UI Theme.
    * If not set or set to null or not defined, the theme passed through context will be used, or the default theme of the page will be loaded.
    */
    theme?: IPartialTheme | ITheme;
  };

const Accordion = ({
  className = 'accordion',
  allowMultipleExpanded,
  allowZeroExpanded,
  onChange,
  preExpanded,
  theme,
  ...rest
}: AccordionProps): JSX.Element => {

  const contextTheme = useTheme();
  const divElement = useRef(null);

  useEffect(() => {
    if (divElement.current) {
      const themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
      divElement.current.style.setProperty(`--accordion-bodyDivider`, themeToApply.semanticColors.bodyDivider);
      divElement.current.style.setProperty(`--accordion-buttonBackground`, themeToApply.semanticColors.buttonBackground);
      divElement.current.style.setProperty(`--accordion-buttonText`, themeToApply.semanticColors.buttonText);
      divElement.current.style.setProperty(`--accordion-buttonBackgroundHovered`, themeToApply.semanticColors.buttonBackgroundHovered);
      divElement.current.style.setProperty(`--accordion-bodyBackground`, themeToApply.semanticColors.bodyBackground);
      divElement.current.style.setProperty(`--accordion-bodyText`, themeToApply.semanticColors.bodyText);
    }
  });

  return (
    <Provider
      preExpanded={preExpanded}
      allowMultipleExpanded={allowMultipleExpanded}
      allowZeroExpanded={allowZeroExpanded}
      onChange={onChange}
    >
      <div
        data-accordion-component="Accordion"
        className={className}
        ref={divElement}
        {...rest}
      />
    </Provider>
  );
};

export default Accordion;

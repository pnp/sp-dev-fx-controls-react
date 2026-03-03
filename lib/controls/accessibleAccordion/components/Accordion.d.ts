import "../css/AccordionStylesOverride.css";
import { DivAttributes } from "../helpers/types";
import { UUID } from "./ItemContext";
import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';
type AccordionProps = Pick<DivAttributes, Exclude<keyof DivAttributes, 'onChange'>> & {
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
declare const Accordion: ({ className, allowMultipleExpanded, allowZeroExpanded, onChange, preExpanded, theme, ...rest }: AccordionProps) => JSX.Element;
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map
import { LocalizedFontFamilies } from '@fluentui/theme';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { create } from 'nano-css';

export const applyAdaptiveCardHostStyles = (theme: IReadonlyTheme, classPrefix: string): void => {
    const nanoCss = create();
    nanoCss.put(`.${classPrefix}-ac-container:focus`, {
        outline: "none !important"
    });
    nanoCss.put(`.${classPrefix}-ac-adaptiveCard:focus`, {
        outline: "none !important"
    });
    nanoCss.put(`.${classPrefix}-ac-pushButton`, {
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "center",
        verticalAlign: "middle",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "14px",
        fontWeight: "600",
        padding: "4px 10px 5px 10px",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        userSelect: "none",
        height: "32px",
        borderRadius: "2px",
        border: `1px solid ${theme.semanticColors.buttonBorder}`,
        backgroundColor: `${theme.semanticColors.buttonBackground}`,
        color: `${theme.semanticColors.buttonText}`
    });
    nanoCss.put(`.${classPrefix}-ac-pushButton:hover`, {
        border: `1px solid ${theme.semanticColors.buttonBorder}`,
        backgroundColor: `${theme.semanticColors.buttonBackgroundHovered}`,
        color: `${theme.semanticColors.buttonTextHovered}`
    });
    nanoCss.put(`.${classPrefix}-ac-pushButton:active`, {
        border: `1px solid ${theme.semanticColors.buttonBorder}`,
        backgroundColor: `${theme.semanticColors.buttonBackgroundPressed}`,
        color: `${theme.semanticColors.buttonTextPressed}`
    });
    nanoCss.put(`.${classPrefix}-ac-pushButton-disabled`, {
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "center",
        verticalAlign: "middle",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "14px",
        fontWeight: "600",
        padding: "4px 10px 5px 10px",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        userSelect: "none",
        height: "32px",
        borderRadius: "2px",
        border: `1px solid ${theme.semanticColors.buttonBorderDisabled}`,
        backgroundColor: `${theme.semanticColors.buttonBackgroundDisabled}`,
        color: `${theme.semanticColors.buttonTextDisabled}`
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-overlay`, {
        fontFamily: `${(theme.fonts.medium.fontFamily) ? theme.fonts.medium.fontFamily : LocalizedFontFamilies.WestEuropean}`,
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "10000"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl`, {
        boxSizing: "border-box",
        fontSize: "14px",
        fontWeight: "normal"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-popup-container`, {
        backgroundColor: `${theme.semanticColors.bodyBackground}`,
        position: "absolute",
        overflowY: "auto",
        boxShadow: "rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
        borderRadius: "2px"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-popup-container:focus`, {
        outline: "0"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-slide`, {
        animationDuration: "0.5s",
        animationTimingFunction: "cubic-bezier(0.1, 0.9, 0.2, 1)"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-slide.${classPrefix}-ac-ctrl-slideTopToBottom`, {
        animationName: "fadeIn, slideTopToBottom"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-slide.${classPrefix}-ac-ctrl-slideBottomToTop`, {
        animationName: "fadeIn, slideBottomToTop"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-slide.${classPrefix}-ac-ctrl-slideLeftToRight`, {
        animationName: "fadeIn, slideLeftToRight"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-slide.${classPrefix}-ac-ctrl-slideRightToLeft`, {
        animationName: "fadeIn, slideRightToLeft"
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-dropdown-item`, {
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "block",
        padding: "0px 12px 0px 12px",
        lineHeight: "30px",
        cursor: "pointer",
        backgroundColor: `${theme.semanticColors.buttonBackground}`,
        color: `${theme.semanticColors.buttonText}`
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-dropdown-item:hover`, {
        backgroundColor: `${theme.semanticColors.buttonBackgroundHovered}`,
        color: `${theme.semanticColors.buttonTextHovered}`
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-dropdown-item:focus`, {
        outline: "0",
        backgroundColor: `${theme.semanticColors.buttonBackgroundPressed}`,
        color: `${theme.semanticColors.buttonTextPressed}`
    });
    nanoCss.put(`.${classPrefix}-ac-ctrl-dropdown-item-disabled`, {
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "block",
        padding: "0px 12px 0px 12px",
        lineHeight: "30px",
        cursor: "pointer",
        backgroundColor: `${theme.semanticColors.buttonBackgroundDisabled}`,
        color: `${theme.semanticColors.buttonTextDisabled}`
    });
};

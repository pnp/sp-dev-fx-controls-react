import { LocalizedFontFamilies } from '@fluentui/theme';
import { create } from 'nano-css';
export var applyAdaptiveCardHostStyles = function (theme, classPrefix) {
    var nanoCss = create();
    nanoCss.put(".".concat(classPrefix, "-ac-container:focus"), {
        outline: "none !important"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-adaptiveCard:focus"), {
        outline: "none !important"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-pushButton"), {
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
        border: "1px solid ".concat(theme.semanticColors.buttonBorder),
        backgroundColor: "".concat(theme.semanticColors.buttonBackground),
        color: "".concat(theme.semanticColors.buttonText)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-pushButton:hover"), {
        border: "1px solid ".concat(theme.semanticColors.buttonBorder),
        backgroundColor: "".concat(theme.semanticColors.buttonBackgroundHovered),
        color: "".concat(theme.semanticColors.buttonTextHovered)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-pushButton:active"), {
        border: "1px solid ".concat(theme.semanticColors.buttonBorder),
        backgroundColor: "".concat(theme.semanticColors.buttonBackgroundPressed),
        color: "".concat(theme.semanticColors.buttonTextPressed)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-pushButton-disabled"), {
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
        border: "1px solid ".concat(theme.semanticColors.buttonBorderDisabled),
        backgroundColor: "".concat(theme.semanticColors.buttonBackgroundDisabled),
        color: "".concat(theme.semanticColors.buttonTextDisabled)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-overlay"), {
        fontFamily: "".concat((theme.fonts.medium.fontFamily) ? theme.fonts.medium.fontFamily : LocalizedFontFamilies.WestEuropean),
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "10000"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl"), {
        boxSizing: "border-box",
        fontSize: "14px",
        fontWeight: "normal"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-popup-container"), {
        backgroundColor: "".concat(theme.semanticColors.bodyBackground),
        position: "absolute",
        overflowY: "auto",
        boxShadow: "rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
        borderRadius: "2px"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-popup-container:focus"), {
        outline: "0"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-slide"), {
        animationDuration: "0.5s",
        animationTimingFunction: "cubic-bezier(0.1, 0.9, 0.2, 1)"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-slide.").concat(classPrefix, "-ac-ctrl-slideTopToBottom"), {
        animationName: "fadeIn, slideTopToBottom"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-slide.").concat(classPrefix, "-ac-ctrl-slideBottomToTop"), {
        animationName: "fadeIn, slideBottomToTop"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-slide.").concat(classPrefix, "-ac-ctrl-slideLeftToRight"), {
        animationName: "fadeIn, slideLeftToRight"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-slide.").concat(classPrefix, "-ac-ctrl-slideRightToLeft"), {
        animationName: "fadeIn, slideRightToLeft"
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-dropdown-item"), {
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "block",
        padding: "0px 12px 0px 12px",
        lineHeight: "30px",
        cursor: "pointer",
        backgroundColor: "".concat(theme.semanticColors.buttonBackground),
        color: "".concat(theme.semanticColors.buttonText)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-dropdown-item:hover"), {
        backgroundColor: "".concat(theme.semanticColors.buttonBackgroundHovered),
        color: "".concat(theme.semanticColors.buttonTextHovered)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-dropdown-item:focus"), {
        outline: "0",
        backgroundColor: "".concat(theme.semanticColors.buttonBackgroundPressed),
        color: "".concat(theme.semanticColors.buttonTextPressed)
    });
    nanoCss.put(".".concat(classPrefix, "-ac-ctrl-dropdown-item-disabled"), {
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "block",
        padding: "0px 12px 0px 12px",
        lineHeight: "30px",
        cursor: "pointer",
        backgroundColor: "".concat(theme.semanticColors.buttonBackgroundDisabled),
        color: "".concat(theme.semanticColors.buttonTextDisabled)
    });
};
//# sourceMappingURL=Styles.js.map
import { getFocusStyle, getGlobalClassNames, HighContrastSelector } from "@fluentui/react/lib/Styling";
import { getRTL } from "@fluentui/react/lib/Utilities";
import { ButtonGlobalClassNames } from "@fluentui/react/lib/Button";
var GlobalClassNames = {
    root: 'ms-TagItem',
    text: 'ms-TagItem-text',
    close: 'ms-TagItem-close',
    isSelected: 'is-selected',
};
var TAG_HEIGHT = 26;
export function getStyles(props) {
    var _a, _b, _c, _d;
    var className = props.className, theme = props.theme, selected = props.selected, disabled = props.disabled;
    var palette = theme.palette, effects = theme.effects, fonts = theme.fonts, semanticColors = theme.semanticColors;
    var classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            fonts.medium,
            getFocusStyle(theme),
            {
                boxSizing: 'content-box',
                flexShrink: '1',
                margin: 2,
                height: TAG_HEIGHT,
                lineHeight: TAG_HEIGHT,
                cursor: 'default',
                userSelect: 'none',
                display: 'flex',
                flexWrap: 'nowrap',
                maxWidth: 300,
                minWidth: 0, // needed to prevent long tags from overflowing container
                borderRadius: effects.roundedCorner2,
                color: semanticColors.inputText,
                background: !selected || disabled ? palette.neutralLighter : palette.themePrimary,
                selectors: (_a = {
                        ':hover': [
                            !disabled &&
                                !selected && {
                                color: palette.neutralDark,
                                background: palette.neutralLight,
                                selectors: {
                                    '.ms-TagItem-close': {
                                        color: palette.neutralPrimary,
                                    },
                                },
                            },
                            disabled && { background: palette.neutralLighter },
                            selected && !disabled && { background: palette.themePrimary },
                        ]
                    },
                    _a[HighContrastSelector] = {
                        border: "1px solid ".concat(!selected ? 'WindowText' : 'WindowFrame'),
                    },
                    _a),
            },
            disabled && {
                selectors: (_b = {},
                    _b[HighContrastSelector] = {
                        borderColor: 'GrayText',
                    },
                    _b),
            },
            selected &&
                !disabled && [
                classNames.isSelected,
                {
                    color: palette.white,
                },
            ],
            className,
        ],
        text: [
            classNames.text,
            {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 30,
                margin: '0 8px',
            },
            disabled && {
                selectors: (_c = {},
                    _c[HighContrastSelector] = {
                        color: 'GrayText',
                    },
                    _c),
            },
        ],
        close: [
            classNames.close,
            {
                color: palette.neutralSecondary,
                width: 30,
                height: '100%',
                flex: '0 0 auto',
                borderRadius: getRTL(theme)
                    ? "".concat(effects.roundedCorner2, " 0 0 ").concat(effects.roundedCorner2)
                    : "0 ".concat(effects.roundedCorner2, " ").concat(effects.roundedCorner2, " 0"),
                selectors: {
                    ':hover': {
                        background: palette.neutralQuaternaryAlt,
                        color: palette.neutralPrimary,
                    },
                    ':active': {
                        color: palette.white,
                        backgroundColor: palette.themeDark,
                    },
                },
            },
            selected && {
                color: palette.white,
                selectors: {
                    ':hover': {
                        color: palette.white,
                        background: palette.themeDark,
                    },
                },
            },
            disabled && {
                selectors: (_d = {},
                    _d[".".concat(ButtonGlobalClassNames.msButtonIcon)] = {
                        color: palette.neutralSecondary,
                    },
                    _d),
            },
        ],
    };
}
//# sourceMappingURL=TermItem.styles.js.map
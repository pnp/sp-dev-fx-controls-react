import { mergeStyleSets } from '@fluentui/merge-styles';
import { FontSizes } from '@fluentui/react/lib/Styling';
export var getClassNames = function (theme) {
    return mergeStyleSets({
        placeholder: {
            display: "flex"
        },
        placeholderContainer: {
            alignItems: "center",
            color: theme.palette.neutralSecondary,
            backgroundColor: theme.palette.neutralLighter,
            width: "100%",
            padding: "80px 0"
        },
        placeholderHead: {
            color: theme.palette.neutralPrimary
        },
        placeholderHeadContainer: {
            height: "100%",
            whiteSpace: "nowrap",
            textAlign: "center"
        },
        placeholderIcon: {
            display: "inline-block",
            verticalAlign: "middle",
            whiteSpace: "normal",
            fontSize: FontSizes.size42
        },
        placeholderText: {
            display: "inline",
            verticalAlign: "middle",
            whiteSpace: "normal",
            fontWeight: 100,
            fontSize: FontSizes.size28,
            paddingLeft: "20px"
        },
        hide: {
            display: "none"
        },
        placeholderDescription: {
            width: "65%",
            verticalAlign: "middle",
            margin: "0 auto",
            textAlign: "center"
        },
        placeholderDescriptionText: {
            color: theme.palette.neutralSecondary,
            fontSize: "17px",
            display: "inline-block",
            margin: "24px 0",
            fontWeight: "100"
        }
    });
};
//# sourceMappingURL=PlaceholderComponent.styles.js.map
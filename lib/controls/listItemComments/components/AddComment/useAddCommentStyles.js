import * as React from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AppContext } from "../../common";
export var useAddCommentStyles = function () {
    var theme = React.useContext(AppContext).theme;
    var itemContainerStyles = {
        root: { paddingTop: 0, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 },
    };
    var deleteButtonContainerStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
        },
    };
    var searchMentionContainerStyles = {
        root: {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "silver",
            width: "100%",
            boxSizing: "border-box",
            ":focus": {
                borderColor: theme.themePrimary,
            },
            ":hover": {
                borderColor: theme.themePrimary,
                boxSizing: "border-box",
            },
        },
    };
    var documentCardUserStyles = {
        root: {
            marginTop: 2,
            backgroundColor: theme === null || theme === void 0 ? void 0 : theme.white,
            boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
            boxSizing: "border-box",
            ":hover": {
                borderColor: theme.themePrimary,
                backgroundColor: theme.neutralLighterAlt,
                borderWidth: 1,
                boxSizing: "border-box",
            },
        },
    };
    var componentClasses = mergeStyleSets({
        container: {
            borderWidth: 1,
            borderStyle: "solid",
            display: "block",
            borderColor: "silver",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
            paddingTop: 1,
            paddingLeft: 1,
            ":focus": {
                borderWidth: 2,
                borderColor: theme.themePrimary,
                paddingTop: 0,
                paddingLeft: 0,
            },
            ":hover": {
                borderWidth: 2,
                borderColor: theme.themePrimary,
                paddingTop: 0,
                paddingLeft: 0,
            },
        },
    });
    var mentionsClasses = mergeStyleSets({
        mention: {
            position: "relative",
            zIndex: 9999,
            color: theme.themePrimary,
            pointerEvents: "none",
        },
    });
    var reactMentionStyles = {
        control: {
            backgroundColor: "#fff",
            fontSize: 12,
            border: "none",
            fontWeight: "normal",
            outlineColor: theme.themePrimary,
            borderRadius: 0,
        },
        "&multiLine": {
            control: {
                border: "none",
                fontFamily: '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue"',
                minHeight: 35,
                fontSize: 14,
                fontWeight: 400,
                borderRadius: 0,
            },
            highlighter: {
                padding: 9,
                border: "none",
                borderWidth: 0,
                borderRadius: 0,
            },
            input: {
                padding: 9,
                border: "none",
                outline: "none",
            },
        },
        "&singleLine": {
            display: "inline-block",
            height: 50,
            outlineColor: theme.themePrimary,
            border: "none",
            highlighter: {
                padding: 1,
                border: "1px inset transparent",
            },
            input: {
                padding: 1,
                width: "100%",
                borderRadius: 0,
                border: "none",
            },
        },
        suggestions: {
            list: {
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.15)",
                fontSize: 14,
            },
            item: {
                padding: "5px 15px",
                borderBottom: "1px solid",
                borderBottomColor: theme.themeLight,
                "&focused": {
                    backgroundColor: theme.neutralLighterAlt,
                },
            },
        },
    };
    return {
        documentCardUserStyles: documentCardUserStyles,
        deleteButtonContainerStyles: deleteButtonContainerStyles,
        reactMentionStyles: reactMentionStyles,
        itemContainerStyles: itemContainerStyles,
        searchMentionContainerStyles: searchMentionContainerStyles,
        mentionsClasses: mentionsClasses,
        componentClasses: componentClasses,
    };
};
//# sourceMappingURL=useAddCommentStyles.js.map
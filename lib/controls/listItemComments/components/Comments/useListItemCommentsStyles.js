import * as React from "react";
import { FontWeights, getTheme, mergeStyles, mergeStyleSets, } from '@fluentui/react/lib/Styling';
import { AppContext } from '../../common';
import { TILE_HEIGHT } from '../../common/constants';
export var useListItemCommentsStyles = function () {
    var _a = React.useContext(AppContext), theme = _a.theme, numberCommentsPerPage = _a.numberCommentsPerPage;
    var fluentTheme = getTheme();
    // Calc Height List tiles Container Based on number Items per Page
    var tilesHeight = numberCommentsPerPage
        ? (numberCommentsPerPage < 5 ? 5 : numberCommentsPerPage) * TILE_HEIGHT + 35
        : 7 * TILE_HEIGHT;
    var itemContainerStyles = {
        root: {
            paddingTop: 0,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
        },
    };
    var buttonsContainerStyles = {
        root: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
    };
    var userListContainerStyles = {
        root: { paddingLeft: 2, paddingRight: 2, paddingBottom: 2, minWidth: 206 },
    };
    var renderUserContainerStyles = {
        root: {
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
        },
    };
    var documentCardStyles = {
        root: {
            maxWidth: "initial",
            marginBottom: 7,
            width: "100%",
            backgroundColor: theme.neutralLighterAlt,
            userSelect: "text",
            boxSizing: "border-box",
            ":hover": {
                borderColor: theme.themePrimary,
                borderWidth: 1,
            },
        },
    };
    var documentCardHighlightedStyles = {
        root: {
            maxWidth: "initial",
            marginBottom: 7,
            width: "100%",
            backgroundColor: theme.themeLighter,
            userSelect: "text",
            border: "solid 3px " + theme.themePrimary,
            boxSizing: "border-box",
            ":hover": {
                borderColor: theme.themePrimary,
                borderWidth: 1,
            },
        },
    };
    var documentCardDeleteStyles = {
        root: {
            marginBottom: 5,
            backgroundColor: theme.neutralLighterAlt,
            boxSizing: "border-box",
            ":hover": {
                borderColor: theme.themePrimary,
                borderWidth: 1,
            },
        },
    };
    var documentCardUserStyles = {
        root: {
            marginTop: 2,
            backgroundColor: theme === null || theme === void 0 ? void 0 : theme.white,
            boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
            boxSizing: "border-box",
            ':hover': {
                borderColor: theme.themePrimary,
                backgroundColor: theme.neutralLighterAlt,
                borderWidth: 1,
            },
        },
    };
    var configurationListClasses = mergeStyleSets({
        listIcon: mergeStyles({
            fontSize: 18,
            width: 18,
            height: 18,
            color: theme.themePrimary,
        }),
        nolistItemIcon: mergeStyles({
            fontSize: 28,
            width: 28,
            height: 28,
            color: theme.themePrimary,
        }),
        divContainer: {
            display: 'block',
        },
        titlesContainer: {
            width: "100%",
            height: tilesHeight,
            marginBottom: 10,
            display: 'flex',
            marginTop: 15,
            overflow: 'auto',
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.neutralLighter,
            },
            '&::-webkit-scrollbar': {
                width: 5,
            },
        },
    });
    var contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
        },
        header: [
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            fluentTheme.fonts.xLargePlus,
            {
                flex: '1 1 auto',
                borderTop: "4px solid ".concat(theme.themePrimary),
                color: theme.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 24px',
            },
        ],
        heading: {
            color: theme.neutralPrimary,
            fontWeight: FontWeights.semibold,
            fontSize: 'inherit',
            margin: '0',
        },
        body: {
            flex: '4 4 auto',
            padding: '0 24px 24px 24px',
            overflowY: 'hidden',
            selectors: {
                p: { margin: '14px 0' },
                'p:first-child': { marginTop: 0 },
                'p:last-child': { marginBottom: 0 },
            },
        },
    });
    var iconButtonStyles = {
        root: {
            color: theme.neutralPrimary,
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
        rootHovered: {
            color: theme.neutralDark,
        },
    };
    return {
        itemContainerStyles: itemContainerStyles,
        buttonsContainerStyles: buttonsContainerStyles,
        userListContainerStyles: userListContainerStyles,
        renderUserContainerStyles: renderUserContainerStyles,
        documentCardStyles: documentCardStyles,
        documentCardDeleteStyles: documentCardDeleteStyles,
        documentCardHighlightedStyles: documentCardHighlightedStyles,
        documentCardUserStyles: documentCardUserStyles,
        configurationListClasses: configurationListClasses,
        contentStyles: contentStyles,
        iconButtonStyles: iconButtonStyles,
    };
};
//# sourceMappingURL=useListItemCommentsStyles.js.map
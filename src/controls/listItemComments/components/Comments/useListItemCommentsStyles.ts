import * as React from "react";
import { IDocumentCardStyles } from "@fluentui/react/lib/DocumentCard";
import { IStackStyles } from "@fluentui/react/lib/Stack";
import {
  FontWeights,
  getTheme,
  IStyle,
  mergeStyles,
  mergeStyleSets,
} from '@fluentui/react/lib/Styling';
import { AppContext } from '../../common';
import { TILE_HEIGHT } from '../../common/constants';
import { IButtonStyles } from '@fluentui/react';

interface returnObjectStyles {
  itemContainerStyles: IStackStyles;
  buttonsContainerStyles: Partial<IStackStyles>;
  userListContainerStyles: Partial<IStackStyles>;
  renderUserContainerStyles: Partial<IStackStyles>;
  documentCardStyles: Partial<IDocumentCardStyles>;
  documentCardDeleteStyles: Partial<IDocumentCardStyles>;
  documentCardHighlightedStyles: Partial<IDocumentCardStyles>;
  documentCardUserStyles: Partial<IDocumentCardStyles>;
  configurationListClasses: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  contentStyles: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  iconButtonStyles: Partial<IButtonStyles>;
}

export const useListItemCommentsStyles = (): returnObjectStyles => {
  const { theme, numberCommentsPerPage } = React.useContext(AppContext);
  const fluentTheme = getTheme();

  // Calc Height List tiles Container Based on number Items per Page
  const tilesHeight: number = numberCommentsPerPage
    ? (numberCommentsPerPage < 5 ? 5 : numberCommentsPerPage) * TILE_HEIGHT + 35
    : 7 * TILE_HEIGHT;

  const itemContainerStyles: IStackStyles = {
    root: {
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
    } as IStyle,
  };

  const buttonsContainerStyles: Partial<IStackStyles> = {
    root: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  };

  const userListContainerStyles: Partial<IStackStyles> = {
    root: { paddingLeft: 2, paddingRight: 2, paddingBottom: 2, minWidth: 206 },
  };

  const renderUserContainerStyles: Partial<IStackStyles> = {
    root: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
  };
  const documentCardStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginBottom: 7,
      width: 322,
      backgroundColor: theme.neutralLighterAlt,
      userSelect: 'text',
      ':hover': {
        borderColor: theme.themePrimary,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const documentCardHighlightedStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginBottom: 7,
      width: 322,
      backgroundColor: theme.themeLighter,
      userSelect: 'text',
      border: 'solid 3px ' + theme.themePrimary,
      ':hover': {
        borderColor: theme.themePrimary,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const documentCardDeleteStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginBottom: 5,
      backgroundColor: theme.neutralLighterAlt,
      ':hover': {
        borderColor: theme.themePrimary,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const documentCardUserStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginTop: 2,
      backgroundColor: theme?.white,
      boxShadow: '0 5px 15px rgba(50, 50, 90, .1)',

      ':hover': {
        borderColor: theme.themePrimary,
        backgroundColor: theme.neutralLighterAlt,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const configurationListClasses = mergeStyleSets({
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
    } as IStyle,
    titlesContainer: {
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
    } as IStyle,
  });

  const contentStyles = mergeStyleSets({
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
        borderTop: `4px solid ${theme.themePrimary}`,
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

  const iconButtonStyles: Partial<IButtonStyles> = {
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
    itemContainerStyles,
    buttonsContainerStyles,
    userListContainerStyles,
    renderUserContainerStyles,
    documentCardStyles,
    documentCardDeleteStyles,
    documentCardHighlightedStyles,
    documentCardUserStyles,
    configurationListClasses,
    contentStyles,
    iconButtonStyles,
  };
};

import * as React from "react";
import { IDocumentCardStyles } from "@fluentui/react/lib/DocumentCard";
import { IStackStyles } from "@fluentui/react/lib/Stack";
import {
  IStyle,
  mergeStyles,
  mergeStyleSets,
} from "@fluentui/react/lib/Styling";
import { AppContext } from "../../common";
import { TILE_HEIGHT } from "../../common/constants";

interface returnObjectStyles {
  itemContainerStyles: IStackStyles;
  deleteButtonContainerStyles: Partial<IStackStyles>;
  userListContainerStyles: Partial<IStackStyles>;
  renderUserContainerStyles: Partial<IStackStyles>;
  documentCardStyles: Partial<IDocumentCardStyles>;
  documentCardDeleteStyles: Partial<IDocumentCardStyles>;
  documentCardHighlightedStyles: Partial<IDocumentCardStyles>;
  documentCardUserStyles: Partial<IDocumentCardStyles>;
  configurationListClasses: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const useListItemCommentsStyles = (): returnObjectStyles => {
  const { theme, numberCommentsPerPage } = React.useContext(AppContext);
  // Calc Height List tiles Container Based on number Items per Page
  const tilesHeight: number = numberCommentsPerPage
    ? (numberCommentsPerPage < 5 ? 5 : numberCommentsPerPage) * TILE_HEIGHT + 35
    : 7 * TILE_HEIGHT;

  const itemContainerStyles: IStackStyles = {
    root: { paddingTop: 0, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 } as IStyle,
  };

  const deleteButtonContainerStyles: Partial<IStackStyles> = {
    root: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  };

  const userListContainerStyles: Partial<IStackStyles> = {
    root: { paddingLeft: 2, paddingRight: 2, paddingBottom: 2, minWidth: 206 },
  };

  const renderUserContainerStyles: Partial<IStackStyles> = {
    root: { paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 },
  };
  const documentCardStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginBottom: 7,
      width: 322,
      backgroundColor: theme.neutralLighterAlt,
      ":hover": {
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
      border: "solid 3px "+theme.themePrimary,
      ":hover": {
        borderColor: theme.themePrimary,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const documentCardDeleteStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginBottom: 5,
      backgroundColor: theme.neutralLighterAlt,
      ":hover": {
        borderColor: theme.themePrimary,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const documentCardUserStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginTop: 2,
      backgroundColor: theme?.white,
      boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",

      ":hover": {
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
      display: "block",
    } as IStyle,
    titlesContainer: {
      height: tilesHeight,
      marginBottom: 10,
      display: "flex",
      marginTop: 15,
      overflow: "auto",
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.neutralLighter,
      },
      "&::-webkit-scrollbar": {
        width: 5,
      },
    } as IStyle,
  });

  return {
    itemContainerStyles,
    deleteButtonContainerStyles,
    userListContainerStyles,
    renderUserContainerStyles,
    documentCardStyles,
    documentCardDeleteStyles,
    documentCardHighlightedStyles,
    documentCardUserStyles,
    configurationListClasses,
  };
};

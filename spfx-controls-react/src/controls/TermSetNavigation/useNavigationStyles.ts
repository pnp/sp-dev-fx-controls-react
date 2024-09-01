/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { useAtom } from 'jotai';

import {
  INavLink,
  INavStyles,
  IStackStyles,
  IStyle,
  ITextStyles,
  mergeStyles,
  mergeStyleSets,
} from '@fluentui/react';
import { TermStore } from '@microsoft/microsoft-graph-types';

import { globalState } from './atoms/globalState';

export const useNavigationStyles = (): any  => {
  const [appGlobalState] = useAtom(globalState);
  const { themeVariant, selectedItem, termSetId } = appGlobalState;

  const stackSelctedItemStyles = React.useCallback(
    (isSelected: boolean): Partial<IStackStyles> => {
      return {
        root: {
          backgroundColor: isSelected ? themeVariant?.semanticColors?.bodyBackgroundChecked : "",
          borderLeft: isSelected ? `2px solid ${themeVariant?.palette.themePrimary}` : "",
        },
      };
    },
    [themeVariant]
  );

  const navStyles = React.useCallback((): Partial<INavStyles> => {
    return {
      root: {
        overflowX: "hidden",
        overflowY: "auto",
      },
      chevronButton: { display: "none" },
      chevronIcon: { display: "none" },
    };
  }, [themeVariant]);

  const stackGroupHeaderStyles = React.useCallback(
    (item: TermStore.Set): Partial<IStackStyles> => {
      return {
        root: {
          backgroundColor:termSetId === item?.id ? themeVariant?.semanticColors?.bodyBackgroundChecked : "",
          borderLeft: termSetId === item?.id ? `2px solid ${themeVariant?.palette.themePrimary}` : "",
          ":hover": {
            backgroundColor: themeVariant?.semanticColors?.bodyBackgroundHovered,
          },
        },
      };
    },
    [themeVariant, termSetId]
  );

  const textNavLinkStyles = React.useCallback(
    (item: INavLink): ITextStyles => {
      return {
        root: {
          color: themeVariant?.semanticColors?.bodyText,
          display: "-webkit-box",
          "-webkit-line-clamp": "1",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          textAlign: "start",
          textOverflow: "ellipsis",
          cursor: "pointer",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          fontWeight: selectedItem === item ? "bold" : "normal",
        },
      };
    },
    [themeVariant, selectedItem]
  );

  const textGroupLinkStyles = React.useCallback(
    (item: TermStore.Set): ITextStyles => {
      return {
        root: {
          color: themeVariant?.semanticColors?.bodyText,
          display: "-webkit-box",
          "-webkit-line-clamp": "1",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          textAlign: "start",
          textOverflow: "ellipsis",
          cursor: "pointer",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          fontWeight:termSetId === item?.id ? "bold" : "normal",
        },
      };
    },
    [themeVariant, termSetId]
  );

  const stackNavigationContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        border: `1px solid ${themeVariant?.semanticColors?.bodyDivider}`,

        minHeight: "600px",
        color: themeVariant?.semanticColors.bodyText,
        paddingTop: 15,
        paddingBottom: 15,
      } as IStyle,
    };
  }, [themeVariant]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      layout: mergeStyles({
        display: "grid",
        gridGap: "20px",
        gridTemplateColumns: "1fr 4fr",
        gridTemplateAreas: `
        "sidebar  content"

      "sidebar  footer"`,
        width: "100%",
        height: "100%",
       gridTemplateRows: "1fr 50px",
      }),
      navlink: mergeStyles({
        display: "grid",
        gridColumnGap: "10px",
        gridTemplateColumns: "20px 20px 1fr",
        alignItems: "center",

        width: "100%",
      }),



      separator: mergeStyles({
        height: "1px",
        backgroundColor: themeVariant?.palette?.themeLight,
        opacity: themeVariant?.isInverted ? "0.2" : "1",
        width: "100%",
      }),
    });
  }, [themeVariant]);

  return {
    textNavLinkStyles,
    textGroupLinkStyles,
    stackGroupHeaderStyles,
    stackNavigationContainerStyles,
    controlStyles,
    navStyles,
    stackSelctedItemStyles,
  };
};

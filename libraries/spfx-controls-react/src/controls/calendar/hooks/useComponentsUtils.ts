import * as React from 'react';

import { EBreakPoints } from '../constants';

import { tokens } from '@fluentui/react-components';
import { IBaseProps } from '@uifabric/utilities';
import { THorizontalSpacing } from '../baseComponentProps/THorizontalSpacing';
import { TPading } from '../baseComponentProps/TPading';
import { TVerticalSpacing } from '../baseComponentProps/TVerticalSpacing';

interface IUseUtils {
  getCacheKey: (key: string, uniqueId: string) => string;
  validateUrl: (url: string) => boolean;
  trimBeginDoubleSlash: (value: string) => string;

  isValidGUID: (str: string) => boolean;
  getPageNameFromUrl: (url: string) => string;
  getSPSiteAbsoluteUrl: (absolutefileUrl: string) => string;
  getFileServerRelativeUrlFromAbsoluteUrl: (absoluteFileUrl: string) => string;
  encodeRestUrl: (query: string) => string;
  getSpacing: <T>(
    value: string | T,
    containerWidth: number,
    type: 'vertical' | 'horizontal' | 'padding',
  ) => string;
  getCurrentDevice: (containerWidth: number) => string;
  getBaseStyles: (
    baseProps: IBaseProps,
    containerWidth: number,
    containerHeight: number,
  ) => React.CSSProperties;
  getLayoutBreakPoint: <T>(value: string | T, containerWidth: number) => string;
}

export const useComponentUtils = (): IUseUtils => {
  const getCacheKey = React.useCallback((key: string, uniqueId: string) => {
    return `${key}${uniqueId}`;
  }, []);

  const validateUrl = React.useCallback((url: string): boolean => {
    if (!url) {
      return false;
    }
    try {
      const urlValid = new URL(url);
      return !!urlValid;
    } catch {
      return false;
    }
  }, []);

  const trimBeginDoubleSlash = (value: string): string => {
    if (value.charAt(0) === '/' && value.charAt(1) === '/') {
      return value.substring(1, value.length);
    }
    return value;
  };

  const isValidGUID = React.useCallback((str: string): boolean => {
    const regex = new RegExp(
      /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/,
    );
    if (!str) {
      return false;
    }

    if (regex.test(str) === true) {
      return true;
    } else {
      return false;
    }
  }, []);

  const getPageNameFromUrl = React.useCallback((url: string): string => {
    if (!url) {
      return '';
    }
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }, []);

  const getSPSiteAbsoluteUrl = React.useCallback(
    (absolutefileUrl: string): string => {
      const hostname = window.location.hostname;
      const rootSiteUrl = `https://${hostname}`;
      if (
        absolutefileUrl.indexOf(`${rootSiteUrl}/sites/`) > -1 ||
        absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1
      ) {
        const fileServerRelativeUrl = absolutefileUrl.split(hostname)[1];
        // Split server relative URL by '/' to obtain web name
        const webName = fileServerRelativeUrl.split('/')[2];

        let webAbsoluteUrl = `https://${hostname}/sites/${webName}`;
        if (absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1) {
          webAbsoluteUrl = `https://${hostname}/teams/${webName}`;
        }
        return webAbsoluteUrl;
      }
      return rootSiteUrl;
    },
    [],
  );

  const getFileServerRelativeUrlFromAbsoluteUrl = React.useCallback(
    (absoluteFileUrl: string): string => {
      let fileServerRelativeUrl = absoluteFileUrl.split(
        window.location.hostname,
      )[1];
      fileServerRelativeUrl = trimBeginDoubleSlash(fileServerRelativeUrl);
      return fileServerRelativeUrl;
    },
    [],
  );

  const encodeRestUrl = React.useCallback((query: string) => {
    return encodeURIComponent(query.replace(/[%]/g, '%25'))
      .replace(/[']/g, '%27%27')
      .replace(/[&]/g, '%26')
      .replace(/[#]/g, '%23')
      .replace(/[?]/g, '%3F')
      .replace(/[/]/g, '%2F')
      .replace(/[+]/g, '%2B');
  }, []);

  const checkValueBreakPoint = React.useCallback(
    <T>(value: string | T): boolean => {
      if (value === null || value === undefined) {
        return false;
      }
      return (
        Object.prototype.hasOwnProperty.call(value, 'extraSmall') ||
        Object.prototype.hasOwnProperty.call(value, 'small') ||
        Object.prototype.hasOwnProperty.call(value, 'medium') ||
        Object.prototype.hasOwnProperty.call(value, 'large') ||
        Object.prototype.hasOwnProperty.call(value, 'extraLarge')
      );
    },
    [],
  );

  const getProperty = React.useCallback(
    <T, K extends keyof T>(obj: T, key: K): T[K] => {
      return obj[key.toString().toLowerCase() as K];
    },
    [],
  );

  const getCurrentDevice = React.useCallback(
    (containerWidth: number): string => {
      if (containerWidth >= EBreakPoints.XXXLarge) return 'XXXLarge';
      if (containerWidth >= EBreakPoints.ExtraExtraLarge)
        return 'ExtraExtraLarge';
      if (containerWidth >= EBreakPoints.ExtraLarge) return 'ExtraLarge';
      if (containerWidth >= Number(EBreakPoints.Large)) return 'Large';
      if (containerWidth >= Number(EBreakPoints.Medium)) return 'Medium';
      if (containerWidth >= Number(EBreakPoints.Small)) return 'Small';
      return 'ExtraSmall';
    },
    [],
  );

  const getSpacingBreakPoint = React.useCallback(
    <T>(value: string | T, containerWidth: number): string => {
      const device = getCurrentDevice(containerWidth);
      const breakPoints: Record<string, string> = {
        ExtraSmall: 'xs',
        Small: 's',
        Medium: 'm',
        Large: 'l',
        ExtraLarge: 'xl',
        ExtraExtraLarge: 'xxl',
      };

      let newValue = value;
      if (checkValueBreakPoint<T>(value as string | T)) {
        newValue =
          (getProperty<T, keyof T>(
            value as T,
            ((device ?? 'Medium') as unknown) as keyof T,
          ) as unknown as string) || breakPoints[device];
      }
      return newValue as string;
    },
    [getCurrentDevice, checkValueBreakPoint, getProperty],
  );

  // "none" | "xxs" | "xs" | "sNudge" | "s" | "mNudge" | "m" | "l" | "xl" | "xxl" | "xxxl"
  const getSpacing = React.useCallback(
    <T>(
      value: string | T,
      containerWidth: number,
      type: 'vertical' | 'horizontal' | 'padding',
    ): string => {
      if (!value) return 'none';

      // Check if value is in pixel format like '20px' or percentage format like '20%'
      if (
        typeof value === 'string' &&
        (/^\d+px$/.test(value) || /^\d+%$/.test(value))
      ) {
        return value; // Return the same value for all sides
      }

      const newType = type;
      const spacingTokens: Record<string, string> = {
        padding: 'spacingHorizontal',
        vertical: 'spacingVertical',
        horizontal: 'spacingHorizontal',
      };

      const newValue = getSpacingBreakPoint<T>(value, containerWidth);

      switch (newValue) {
        case 'none':
          return tokens[`${spacingTokens[newType]}None` as keyof typeof tokens];
        case 'xxs':
          return tokens[`${spacingTokens[newType]}XXS` as keyof typeof tokens];
        case 'xs':
          return tokens[`${spacingTokens[newType]}XS` as keyof typeof tokens];
        case 'sNudge':
          return tokens[
            `${spacingTokens[newType]}SNudge` as keyof typeof tokens
          ];
        case 's':
          return tokens[`${spacingTokens[newType]}S` as keyof typeof tokens];
        case 'mNudge':
          return tokens[
            `${spacingTokens[newType]}MNudge` as keyof typeof tokens
          ];
        case 'm':
          return tokens[`${spacingTokens[newType]}M` as keyof typeof tokens];
        case 'l':
          return tokens[`${spacingTokens[newType]}L` as keyof typeof tokens];
        case 'xl':
          return tokens[`${spacingTokens[newType]}XL` as keyof typeof tokens];
        case 'xxl':
          return tokens[`${spacingTokens[newType]}XXL` as keyof typeof tokens];
        case 'xxxl':
          return tokens[`${spacingTokens[newType]}XXXL` as keyof typeof tokens];
        default:
          return tokens[`${spacingTokens[newType]}M` as keyof typeof tokens];
      }
    },
    [getSpacingBreakPoint],
  );

  const getBaseStyles = React.useCallback(
    (
      baseProps: IBaseProps & {
        verticalSpacing?: string | TVerticalSpacing;
        horizontalSpacing?: string | THorizontalSpacing;
        margin?: string | TPading;
        paddingLeft?: string;
        paddingRight?: string;
        paddingBottom?: string;
        paddingTop?: string;
        padding?: string;
        background?: string;
        width?: string;
        maxWidth?: string;
        height?: string;
        maxHeight?: string;
        marginLeft?: string;
        marginRight?: string;
        marginTop?: string;
        marginBottom?: string;
        styles?: React.CSSProperties;
      },
      containerWidth: number,
      _containerHeight: number,
    ): React.CSSProperties => {
      const {
        verticalSpacing,
        horizontalSpacing,
        paddingLeft,
        paddingRight,
        paddingBottom,
        background,
        width,
        maxWidth,
        height,
        maxHeight,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        paddingTop,
        padding,
        margin,
        styles,
      } = baseProps;

      let wpaddingTop = getSpacing<TPading>(
        paddingTop as string,
        containerWidth,
        'padding',
      );
      let wpaddingLeft = getSpacing<TPading>(
        paddingLeft as string,
        containerWidth,
        'padding',
      );
      let wpaddingRight = getSpacing<TPading>(
        paddingRight as string,
        containerWidth,
        'padding',
      );
      let wpaddingBottom = getSpacing<TPading>(
        paddingBottom as string,
        containerWidth,
        'padding',
      );
      const wpadding = getSpacing<TPading>(
        padding as string,
        containerWidth,
        'padding',
      );

      let wmarginLeft = getSpacing<TPading>(
        marginLeft as string,
        containerWidth,
        'padding',
      );
      let wmarginRight = getSpacing<TPading>(
        marginRight as string,
        containerWidth,
        'padding',
      );
      let wmarginTop = getSpacing<TPading>(
        marginTop as string,
        containerWidth,
        'padding',
      );
      let wmarginBottom = getSpacing<TPading>(
        marginBottom as string,
        containerWidth,
        'padding',
      );

      const wmargin = getSpacing<TPading>(
        margin as string,
        containerWidth,
        'padding',
      );

      if (wpadding) {
        wpaddingTop = wpaddingTop === 'none' ? wpadding : wpaddingTop;
        wpaddingLeft = wpaddingLeft === 'none' ? wpadding : wpaddingLeft;
        wpaddingRight = wpaddingRight === 'none' ? wpadding : wpaddingRight;
        wpaddingBottom = wpaddingBottom === 'none' ? wpadding : wpaddingBottom;
      }

      if (wmargin) {
        wmarginLeft = wmarginLeft === 'none' ? wmargin : wmarginLeft;
        wmarginRight = wmarginRight === 'none' ? wmargin : wmarginRight;
        wmarginTop = wmarginTop === 'none' ? wmargin : wmarginTop;
        wmarginBottom = wmarginBottom === 'none' ? wmargin : wmarginBottom;
      }

      const wgapRow = getSpacing<TVerticalSpacing>(
        verticalSpacing as string,
        containerWidth,
        'vertical',
      );
      const wgapCol = getSpacing<THorizontalSpacing>(
        horizontalSpacing as string,
        containerWidth,
        'horizontal',
      );

      const wgap = `${wgapRow} ${wgapCol}`;
      // Strip shorthand padding/margin from styles to avoid React warnings
      // about mixing shorthand and individual properties
      const {
        padding: _sPadding, // eslint-disable-line @typescript-eslint/no-unused-vars
        margin: _sMargin, // eslint-disable-line @typescript-eslint/no-unused-vars
        paddingTop: _sPt, // eslint-disable-line @typescript-eslint/no-unused-vars
        paddingLeft: _sPl, // eslint-disable-line @typescript-eslint/no-unused-vars
        paddingRight: _sPr, // eslint-disable-line @typescript-eslint/no-unused-vars
        paddingBottom: _sPb, // eslint-disable-line @typescript-eslint/no-unused-vars
        marginTop: _sMt, // eslint-disable-line @typescript-eslint/no-unused-vars
        marginLeft: _sMl, // eslint-disable-line @typescript-eslint/no-unused-vars
        marginRight: _sMr, // eslint-disable-line @typescript-eslint/no-unused-vars
        marginBottom: _sMb, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...safeStyles
      } = (styles ?? {}) as React.CSSProperties;
      return {
        ...safeStyles,
        gap: wgap,
        paddingTop: wpaddingTop,
        paddingLeft: wpaddingLeft,
        paddingRight: wpaddingRight,
        paddingBottom: wpaddingBottom,
        marginLeft: wmarginLeft,
        marginRight: wmarginRight,
        marginTop: wmarginTop,
        marginBottom: wmarginBottom,
        background: background,
        width: width ?? undefined,
        height: height ?? undefined,
        maxWidth: maxWidth ?? undefined,
        maxHeight: maxHeight ?? undefined,
        overflow: 'auto',
      };
    },
    [getSpacing],
  );

  const getLayoutBreakPoint = React.useCallback(
    <T>(value: string | T, containerWidth: number): string => {
      const device = getCurrentDevice(containerWidth);
      let newValue = value;
      if (checkValueBreakPoint<T>(value as string | T)) {
        newValue =
          (getProperty<T, keyof T>(
            value as T,
            ((device ?? 'Medium') as unknown as keyof T),
          ) as unknown as string) || '';
      }
      return newValue as string;
    },
    [getCurrentDevice, checkValueBreakPoint, getProperty],
  );

  return {
    getCacheKey,
    validateUrl,
    trimBeginDoubleSlash,
    isValidGUID,
    getPageNameFromUrl,
    getSPSiteAbsoluteUrl,
    getFileServerRelativeUrlFromAbsoluteUrl,
    encodeRestUrl,
    getSpacing,
    getCurrentDevice,
    getBaseStyles,
    getLayoutBreakPoint,
  };
}; // ... }

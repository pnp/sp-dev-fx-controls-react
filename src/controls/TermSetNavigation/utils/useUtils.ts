import * as React from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TermStore } from '@microsoft/microsoft-graph-types';

interface IUseUtils {
  getTermSetLocalizedNames: (termSet: TermStore.Set, language: string) => TermStore.LocalizedName[];
  getTermProperty: (term: TermStore.Term, property: string) => string;
  getTermSetProperty: (termSet: TermStore.Set, property: string) => string;
  getCacheKey: (key: string, uniqueId: string) => string;
  validateUrl: (url: string) => boolean;
  getTermLabel: (term: TermStore.Term, name: string) => string;
}

export const useUtils = (): IUseUtils => {
  const getCacheKey = React.useCallback((key: string, uniqueId: string) => {
    return `${key}${uniqueId}`;
  }, []);

  const getTermSetProperty = React.useCallback((termSet: TermStore.Set, property: string): string => {
    if (!termSet && !property) {
      return undefined;
    }
    return termSet.properties?.filter((prop) => prop.key === property)[0]?.value;
  }, []);

  const getTermSetLocalizedNames = React.useCallback(
    (termSet: TermStore.Set, language: string): TermStore.LocalizedName[] => {
      if (!termSet && !language) {
        return undefined;
      }
      return termSet.localizedNames?.filter((prop) => prop.languageTag === language);
    },
    []
  );

  const getTermProperty = React.useCallback((term: TermStore.Term, property: string): string => {
    if (!term && !property) {
      return undefined;
    }
    return term.properties?.filter((prop) => prop.key === property)[0]?.value;
  }, []);

  const getTermLabel = React.useCallback((term: TermStore.Term, name: string): string => {
    if (!term && !name) {
      return undefined;
    }
    return term.labels?.filter((prop) => prop.name === name)[0]?.name;
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

  return { getTermSetProperty, getCacheKey, getTermProperty, getTermSetLocalizedNames, getTermLabel, validateUrl };
};

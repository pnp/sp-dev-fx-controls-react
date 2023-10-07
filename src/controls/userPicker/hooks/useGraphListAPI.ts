/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { MSGraphClientV3 } from '@microsoft/sp-http';

import {
  ICategories,
  ICategoryItem,
} from '../models/ICategoryItem';
import { ILanguage } from '../models/ILanguage';
import { IUserInfo } from '../models/IUserInfo';
import { useGraphUserAPI } from './useGraphUserAPI';
import { useCache } from './useLocalStorage';

const NOMINATION_CATEGORY_LIST = "NominationCategories";
const NOMINATION_LIST = "UATNominations";

interface IuseGraphListAPI {
  getCategories: (language: string) => Promise<ICategoryItem[] | undefined>;
  addNomination: (
    language: ILanguage,
    category: ICategoryItem,
    nomineeId: IUserInfo,
    justifyNomination: string
  ) => Promise<void>;
  checkIfListExists: (listName: string) => Promise<boolean>;
  checkIfListsExists: () => Promise<boolean>;
}

export const useGraphListAPI = (context: BaseComponentContext): IuseGraphListAPI => {
  const { getCacheValue, setCacheValue } = useCache("local");
  const { getUserById } = useGraphUserAPI(context);

  const graphClient = React.useMemo(async (): Promise<MSGraphClientV3 | undefined> => {
    if (!context) return undefined;
    return await context.msGraphClientFactory.getClient("3");
  }, [context]);

  const selectCategoriesByLanguage = React.useCallback(
    (categories: ICategories[], language: string): ICategoryItem[] => {
      const selectedCategories: ICategoryItem[] = [];
      for (let i = 0; i < categories.length; i++) {
        const { fields } = categories[i];
        if (fields.field_5 === language) {
          selectedCategories.push(fields);
        }
      }
      return selectedCategories;
    },
    []
  );

  const getCategories = React.useCallback(
    async (language: string): Promise<ICategoryItem[] | undefined> => {
      if (!graphClient || !language) return undefined;

      try {
        const categoriesCached = getCacheValue("___nomination_categories___");
        if (categoriesCached) {
          const selectcategoriesByLanguage = selectCategoriesByLanguage(categoriesCached, language);
          return selectcategoriesByLanguage ?? undefined;
        }

        const response: any = await (await graphClient)
          ?.api(`https://graph.microsoft.com/v1.0/sites/root/lists/NominationCategories?expand=items(expand=fields)`)

          .get();
        if (response) {
          setCacheValue("___nomination_categories___", response?.items ?? undefined);
          const selectcategoriesByLanguage = selectCategoriesByLanguage(response?.items, language);
          return selectcategoriesByLanguage ?? undefined;
        }
      } catch (error) {
        console.log("[getCategories] error:", error);
        throw new Error("Something went wrong when fetching categories");
      }
      return undefined;
    },
    [graphClient]
  );

  const addNomination = React.useCallback(
    async (
      language: ILanguage,
      category: ICategoryItem,
      nomineeId: IUserInfo,
      justifyNomination: string
    ): Promise<void> => {
      if (!graphClient || !language || !category || !nomineeId) return Promise.reject();
      const nominee = await getUserById(nomineeId?.mail as string);
      const submitter = await getUserById(context.pageContext.user.loginName);
      const { Title } = category;
      const { language: languageName } = language;
      try {
        const postPayload = {
          fields: {
            Title: Title,
            field_1: languageName,
            field_2: nominee?.displayName,
            field_3: nominee?.country,
            field_4: nominee?.displayName,
            field_5: nominee?.department,
            field_6: submitter?.displayName,
            field_7: submitter?.department,
            field_8: nominee?.jobTitle,
            field_9: submitter?.jobTitle,
            field_10: justifyNomination,
            field_11: nominee?.mail,
            field_12: submitter?.mail,
            field_13: category?.id,
          },
        };

        const response: any = await (await graphClient)
          ?.api(`https://graph.microsoft.com/v1.0/sites/root/lists/UATNominations/items`)
          .post(postPayload);
        if (response) {
          return Promise.resolve();
        }
      } catch (error) {
        console.log("[addNomination] error:", error);
        throw new Error("Something went wrong when adding nomination");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    []
  );

  const checkIfListExists = React.useCallback(
    async (listName: string): Promise<boolean> => {
      if (!graphClient || !listName) return false;
      try {
        const response: any = await (await graphClient)
          ?.api(`https://graph.microsoft.com/v1.0/sites/root/lists/${listName}`)
          .get();
        if (response) {
          return true;
        }
      } catch (error) {
        console.log("[getCategories] error:", error);
        return false;
      }
      return false;
    },
    [graphClient]
  );

  const checkIfListsExists = React.useCallback(async (): Promise<boolean> => {
    const [nominationCategoriesExists, nominationExists] = await Promise.all([
      checkIfListExists(NOMINATION_CATEGORY_LIST),
      checkIfListExists(NOMINATION_LIST),
    ]);

    const listsExists = nominationCategoriesExists && nominationExists;
    return listsExists;
  }, [checkIfListExists]);

  return { getCategories, addNomination, checkIfListExists, checkIfListsExists };
};

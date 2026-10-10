export interface ITaxonomyProperty {
  key: string;
  value: string;
}

export interface ITermSortOrderInfo {
  setId: string;
  order: string[];
}

export interface ITermInfo {
  childrenCount: number;
  id: string;
  labels: { name: string; isDefault: boolean; languageTag: string }[];
  createdDateTime: string;
  customSortOrder: ITermSortOrderInfo[];
  lastModifiedDateTime: string;
  descriptions: { description: string; languageTag: string }[];
  properties: ITaxonomyProperty[];
  localProperties: ITaxonomyProperty[];
  isDeprecated: boolean;
  isAvailableForTagging: { setId: string; isAvailable: boolean }[];
  topicRequested: boolean;
  parent?: ITermInfo;
}

export interface ITermSetInfo {
  id: string;
  localizedNames: { name: string; languageTag: string }[];
  description: string;
  createdDateTime: string;
  customSortOrder: string[];
  properties?: ITaxonomyProperty[];
  childrenCount: number;
  groupId: string;
  isOpen: boolean;
  isAvailableForTagging: boolean;
  contact: string;
}

export interface ITermStoreInfo {
  id: string;
  name: string;
  defaultLanguageTag: string;
  languageTags: string[];
  administrators?: { user: { displayName: string; email: string; id: string } };
}

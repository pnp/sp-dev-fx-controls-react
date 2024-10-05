import { atom } from 'jotai';

import { IGlobalState } from '../../models/IGlobalState';

export const globalState = atom<IGlobalState>({
  files: [],
  selectedFiles: [],
  isLoading: false,
  containerWidth: 0,
  themeVariant: undefined,
  pageSize: 0,
});

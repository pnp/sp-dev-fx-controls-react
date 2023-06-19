import { atom } from 'jotai';

import { IGlobalState } from '../models/IGlobalState';

export const globalState = atom<IGlobalState>({

  isLoadingNavitionTree:true,
} as IGlobalState);

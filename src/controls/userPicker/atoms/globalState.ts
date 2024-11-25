import { IGlobalState } from "../models/IGlobalState";
import { IUserInfo } from "../models/IUserInfo";
/* eslint-disable @typescript-eslint/no-var-requires */
import { atom } from "jotai";

export const globalState = atom<IGlobalState>({
  selectedUsers: [] as IUserInfo[],
} as IGlobalState);

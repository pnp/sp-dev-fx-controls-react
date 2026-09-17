import { IGlobalState } from "../models/IGlobalState";
import { IUserInfo } from "../models/IUserInfo";
 
import { atom } from "jotai";

export const globalState = atom<IGlobalState>({
  selectedUsers: [] as IUserInfo[],
} as IGlobalState);

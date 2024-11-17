import { EMyTeamsTypes } from "./EMyTeamsTypes";
import { IMyTeamsState } from "./IMyTeamsState";
export const myTeamsReducer = ( // eslint-disable-line @typescript-eslint/explicit-function-return-type
  state: IMyTeamsState,
  action: { type: EMyTeamsTypes; payload: any } // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  switch (action.type) {
    case EMyTeamsTypes.SET_MYTEAMS:
      return { ...state, myTeams: action.payload };
    case EMyTeamsTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
    case EMyTeamsTypes.SET_HAS_ERROR:
      return { ...state, hasError: action.payload };
    case EMyTeamsTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

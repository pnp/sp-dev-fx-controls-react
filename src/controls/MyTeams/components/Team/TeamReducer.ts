import { ETeamTypes } from "./ETeamTypes";
import { ITeamState } from "./ITeamState";
export const teamsReducer = (
  state: ITeamState,
  action: { type: ETeamTypes; payload: any }
) => {
  switch (action.type) {
    case ETeamTypes.SET_TEAM_MEMBERS:
      return { ...state, teamMembers: action.payload };
    case ETeamTypes.SET_TEAM_OWNERS:
      return { ...state, teamsOwners: action.payload };
      case ETeamTypes.SET_TEAM_CHANNELS:
      return { ...state, channelsMenu: action.payload };
    case ETeamTypes.SET_HAS_ERROR:
      return { ...state, hasError: action.payload };
    case ETeamTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

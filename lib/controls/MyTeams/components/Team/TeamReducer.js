var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ETeamTypes } from './ETeamTypes';
export var teamsReducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case ETeamTypes.SET_TEAM_MEMBERS:
            return __assign(__assign({}, state), { teamMembers: action.payload });
        case ETeamTypes.SET_TEAM_OWNERS:
            return __assign(__assign({}, state), { teamsOwners: action.payload });
        case ETeamTypes.SET_TEAM_CHANNELS:
            return __assign(__assign({}, state), { channelsMenu: action.payload });
        case ETeamTypes.SET_HAS_ERROR:
            return __assign(__assign({}, state), { hasError: action.payload });
        case ETeamTypes.SET_IS_LOADING:
            return __assign(__assign({}, state), { isLoading: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=TeamReducer.js.map
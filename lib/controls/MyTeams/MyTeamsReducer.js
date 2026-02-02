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
import { EMyTeamsTypes } from './EMyTeamsTypes';
export var myTeamsReducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case EMyTeamsTypes.SET_MYTEAMS:
            return __assign(__assign({}, state), { myTeams: action.payload });
        case EMyTeamsTypes.SET_MESSAGE:
            return __assign(__assign({}, state), { message: action.payload });
        case EMyTeamsTypes.SET_HAS_ERROR:
            return __assign(__assign({}, state), { hasError: action.payload });
        case EMyTeamsTypes.SET_IS_LOADING:
            return __assign(__assign({}, state), { isLoading: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=MyTeamsReducer.js.map
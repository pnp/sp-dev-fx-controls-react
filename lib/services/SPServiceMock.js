var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SPServiceMock = /** @class */ (function () {
    function SPServiceMock(includeDelay, delayTimeout) {
        var _this = this;
        this.getField = function (listId, internalColumnName, webUrl) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        this._includeDelay = includeDelay;
        this._delayTimeout = delayTimeout || 500;
    }
    SPServiceMock.prototype.getListFormRenderInfo = function (listId) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getAdditionalListFormFieldInfo = function (listId, webUrl) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getFields = function (options) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getContentTypes = function (options) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getListItems = function (filterText, listId, internalColumnName, field, keyInternalColumnName, webUrl) {
        throw new Error("Method not implemented.");
    };
    SPServiceMock.prototype.getViews = function (listId, orderBy, filter) {
        return;
    };
    SPServiceMock.prototype.getLibs = function (options) {
        var _this = this;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._includeDelay === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sleep(this._delayTimeout)];
                    case 1:
                        _a.sent(); // Simulate network load
                        _a.label = 2;
                    case 2:
                        resolve(SPServiceMock._lists);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
    * Locks the thread for the specified amount of time
    * @param ms Milliseconds to wait
    */
    SPServiceMock.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    /**
    * The mock lists to present to the local workbench
    */
    SPServiceMock._lists = {
        value: [
            { Id: '8dc80f2e-0e01-43ee-b59e-fbbca2d1f35e', Title: 'Mock List One', BaseTemplate: '109' },
            { Id: '772a30d4-2d62-42da-aa48-c2a37971d693', Title: 'Mock List Two', BaseTemplate: '109' },
            { Id: '16c0d1c6-b467-4823-a37b-c308cf730366', Title: 'Mock List Three', BaseTemplate: '109' }
        ]
    };
    return SPServiceMock;
}());
export default SPServiceMock;
//# sourceMappingURL=SPServiceMock.js.map
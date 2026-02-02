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
import { SPComponentLoader } from '@microsoft/sp-loader';
var DEFAULT_PERSONA_IMG_HASH = '7ad602295f8386b7615b582d87bcc294';
var DEFAULT_IMAGE_PLACEHOLDER_HASH = '4a48f26592f4e1498d7a478a4c48609c';
var MD5_MODULE_ID = '8494e7d7-6b99-47b2-a741-59873e42f16f';
var PROFILE_IMAGE_URL = '/_layouts/15/userphoto.aspx?size=M&accountname=';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var getScrollPosition = function (_dataListContainerRef) {
    var scrollTop = _dataListContainerRef.scrollTop, scrollHeight = _dataListContainerRef.scrollHeight, clientHeight = _dataListContainerRef.clientHeight;
    var percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
    return percentNow;
};
export var b64toBlob = function (b64Data, contentType, sliceSize) { return __awaiter(void 0, void 0, void 0, function () {
    var byteCharacters, byteArrays, offset, slice, byteNumbers, i, byteArray, blob;
    return __generator(this, function (_a) {
        contentType = contentType || 'image/png';
        sliceSize = sliceSize || 512;
        byteCharacters = atob(b64Data);
        byteArrays = [];
        for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            slice = byteCharacters.slice(offset, offset + sliceSize);
            byteNumbers = new Array(slice.length);
            for (i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        blob = new Blob(byteArrays, { type: contentType });
        return [2 /*return*/, blob];
    });
}); };
export var blobToBase64 = function (blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function (_) {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
};
export var getImageBase64 = function (pictureUrl) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(pictureUrl);
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var image = new Image();
                image.addEventListener('load', function () {
                    var tempCanvas = document.createElement('canvas');
                    tempCanvas.width = image.width;
                    tempCanvas.height = image.height;
                    tempCanvas.getContext('2d').drawImage(image, 0, 0);
                    var base64Str;
                    try {
                        base64Str = tempCanvas.toDataURL('image/png');
                    }
                    catch (_a) {
                        return '';
                    }
                    base64Str = base64Str.replace(/^data:image\/png;base64,/, '');
                    resolve(base64Str);
                });
                image.src = pictureUrl;
            })];
    });
}); };
/**
 * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
 * @param componentId - componentId, guid of the component library
 */
export var loadSPComponentById = function (componentId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                SPComponentLoader.loadComponentById(componentId)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .then(function (component) {
                    resolve(component);
                })
                    .catch(function (error) {
                    // no-op;
                });
            })];
    });
}); };
/**
 * Get MD5Hash for the image url to verify whether user has default image or custom image
 * @param url
 */
export var getMd5HashForUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var library, md5Hash, convertedHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadSPComponentById(MD5_MODULE_ID)];
            case 1:
                library = _a.sent();
                try {
                    md5Hash = library.Md5Hash;
                    if (md5Hash) {
                        convertedHash = md5Hash(url);
                        return [2 /*return*/, convertedHash];
                    }
                }
                catch (_b) {
                    return [2 /*return*/, url];
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * Gets user photo
 * @param userId
 * @returns user photo
 */
export var getUserPhoto = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var personaImgUrl, url, newHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                personaImgUrl = PROFILE_IMAGE_URL + userId;
                return [4 /*yield*/, getImageBase64(personaImgUrl)];
            case 1:
                url = _a.sent();
                return [4 /*yield*/, getMd5HashForUrl(url)];
            case 2:
                newHash = _a.sent();
                if (newHash !== DEFAULT_PERSONA_IMG_HASH &&
                    newHash !== DEFAULT_IMAGE_PLACEHOLDER_HASH) {
                    return [2 /*return*/, 'data:image/png;base64,' + url];
                }
                else {
                    return [2 /*return*/, 'undefined'];
                }
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=utils.js.map
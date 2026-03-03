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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { EUploadLocations } from "../constants/EUploadLocations";
export var useUploadFile = function (context) {
    var _a = React.useState(false), showProgressBar = _a[0], setShowProgressBar = _a[1];
    var _b = React.useState(0), percentComplete = _b[0], setPercentComplete = _b[1];
    var _c = React.useState(null), uploadedFile = _c[0], setUploadedFile = _c[1];
    var _d = React.useState(false), isUploadFinished = _d[0], setIsUploadFinished = _d[1];
    var _e = React.useState(null), error = _e[0], setError = _e[1];
    React.useEffect(function () {
        setShowProgressBar(false);
        setPercentComplete(0);
        setUploadedFile(null);
        setIsUploadFinished(false);
    }, []);
    var uploadFile = React.useCallback(function (file, folderName, siteId, libraryId, uploadLocation) {
        if (folderName === void 0) { folderName = "Upload Images"; }
        return __awaiter(void 0, void 0, void 0, function () {
            var result, graphClient, payload, requestURL, uploadSessionRes, uploadEndpoint, fileBuffer, FILE_CHUNK_SIZE, NUM_CHUNKS, counter, uploadIndex, progressValue, endIndex, slice, headers, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //await delay(5000);
                        setShowProgressBar(true);
                        result = null;
                        return [4 /*yield*/, context.msGraphClientFactory.getClient("3")];
                    case 1:
                        graphClient = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        payload = {
                            "@microsoft.graph.conflictBehavior": "rename",
                            description: "description",
                            fileSize: file.size,
                            name: "".concat(file.name),
                        };
                        requestURL = "/sites/".concat(siteId, "/drives/").concat(libraryId, "/root:/").concat(folderName, "/").concat(file.name, ":/createUploadSession");
                        if (uploadLocation === EUploadLocations.OneDrive) {
                            requestURL = "/me/drive/root:/".concat(folderName, "/").concat(file.name, ":/createUploadSession");
                        }
                        return [4 /*yield*/, graphClient.api(requestURL).post(payload)];
                    case 3:
                        uploadSessionRes = _a.sent();
                        uploadEndpoint = uploadSessionRes.uploadUrl;
                        fileBuffer = file;
                        FILE_CHUNK_SIZE = 320 * 1024;
                        NUM_CHUNKS = Math.floor(fileBuffer.size / FILE_CHUNK_SIZE) + 1;
                        counter = 1;
                        uploadIndex = 0;
                        _a.label = 4;
                    case 4:
                        if (!(uploadIndex < fileBuffer.size)) return [3 /*break*/, 7];
                        progressValue = parseFloat((counter / NUM_CHUNKS).toFixed(2));
                        setPercentComplete(progressValue);
                        endIndex = uploadIndex + FILE_CHUNK_SIZE - 1;
                        slice = void 0;
                        if (endIndex >= fileBuffer.size) {
                            endIndex = fileBuffer.size - 1;
                            slice = fileBuffer.slice(uploadIndex);
                        }
                        else {
                            slice = fileBuffer.slice(uploadIndex, endIndex + 1);
                        }
                        headers = {
                            "Content-Length": "".concat(slice.size),
                            "Content-Range": "bytes ".concat(uploadIndex, "-").concat(endIndex, "/").concat(fileBuffer.size),
                        };
                        return [4 /*yield*/, graphClient.api(uploadEndpoint).headers(headers).put(slice)];
                    case 5:
                        response = _a.sent();
                        if (!response) {
                            return [3 /*break*/, 7];
                        }
                        if (response.nextExpectedRanges) {
                            //Get the next expected range of the slice
                            uploadIndex = parseFloat(response.nextExpectedRanges[0]);
                            counter++;
                        }
                        else {
                            //if there is no next range then break the loop
                            //Gets the upoaded file response
                            result = response;
                            setUploadedFile(result);
                            console.log("Upload finished", result);
                            return [3 /*break*/, 7];
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 4];
                    case 7:
                        setShowProgressBar(false);
                        setIsUploadFinished(true);
                        setUploadedFile(result);
                        setError(null);
                        return [2 /*return*/, result];
                    case 8:
                        error_1 = _a.sent();
                        console.log("Error in UploadLargeFileInChunks:", error_1);
                        setShowProgressBar(false);
                        setIsUploadFinished(true);
                        setError(error_1);
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    }, [context]);
    return [uploadFile, showProgressBar, percentComplete, uploadedFile, isUploadFinished, error];
};
//# sourceMappingURL=useUploadFile.js.map
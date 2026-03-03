var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
var RequestClientMock = /** @class */ (function (_super) {
    __extends(RequestClientMock, _super);
    function RequestClientMock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Requests = [];
        return _this;
    }
    RequestClientMock.prototype.fetch = function (url, configuration, options) {
        var mockedResponse = this.Requests.filter(function (req) { return req.method === options.method && req.url === url; })[0];
        var response;
        if (mockedResponse) {
            response = new Response(mockedResponse.resultString, {
                status: 200,
                statusText: "Ok"
            });
        }
        else {
            response = new Response(null, {
                status: 404,
                statusText: "Not fount",
            });
        }
        return Promise.resolve(new SPHttpClientResponse(response));
    };
    RequestClientMock.prototype.fetchRaw = function (url, configuration, options) {
        return this.fetch(url, configuration, options);
    };
    RequestClientMock.prototype.get = function (url, configuration, options) {
        options = options || {};
        options.method = "GET";
        return this.fetch(url, configuration, options);
    };
    RequestClientMock.prototype.post = function (url, configuration, options) {
        options = options || {};
        options.method = "POST";
        return this.fetch(url, configuration, options);
    };
    RequestClientMock.prototype.patch = function (url, configuration, options) {
        options = options || {};
        options.method = "PATCH";
        return this.fetch(url, configuration, options);
    };
    RequestClientMock.prototype.delete = function (url, configuration, options) {
        options = options || {};
        options.method = "DELETE";
        return this.fetch(url, configuration, options);
    };
    return RequestClientMock;
}(SPHttpClient));
export { RequestClientMock };
//# sourceMappingURL=RequestClientMock.js.map
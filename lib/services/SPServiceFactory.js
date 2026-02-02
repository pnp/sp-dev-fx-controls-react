import SPService from "./SPService";
var SPServiceFactory = /** @class */ (function () {
    function SPServiceFactory() {
    }
    SPServiceFactory.createService = function (context, includeDelay, delayTimeout, webAbsoluteUrl) {
        return new SPService(context, webAbsoluteUrl);
    };
    return SPServiceFactory;
}());
export { SPServiceFactory };
//# sourceMappingURL=SPServiceFactory.js.map
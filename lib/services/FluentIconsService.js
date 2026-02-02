import Icons from '@uifabric/icons/lib/data/AllIconNames.json';
var icons = Icons.slice(1);
var FluentIconsService = /** @class */ (function () {
    function FluentIconsService() {
        var _this = this;
        this.getAll = function () {
            return _this._iconNames;
        };
        this.search = function (query, startsWith) {
            var lowerCasedQuery = query.toLowerCase();
            return _this._iconNames.filter(function (name) { return !startsWith ? name.toLowerCase().indexOf(lowerCasedQuery) !== -1 : name.toLowerCase().indexOf(lowerCasedQuery) === 0; });
        };
        this._iconNames = icons.map(function (icon) { return icon.name; }).sort();
    }
    return FluentIconsService;
}());
export { FluentIconsService };
//# sourceMappingURL=FluentIconsService.js.map
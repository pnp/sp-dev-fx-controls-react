var DEFAULT = 0;
var counter = DEFAULT;
export function nextUuid() {
    var current = counter;
    counter = counter + 1;
    return "raa-".concat(current);
}
export function resetNextUuid() {
    counter = DEFAULT;
}
// HTML5 ids allow all unicode characters, except for ASCII whitespaces
// https://infra.spec.whatwg.org/#ascii-whitespace
// eslint-disable-next-line no-control-regex
var idRegex = /[\u0009\u000a\u000c\u000d\u0020]/g;
export function assertValidHtmlId(htmlId) {
    if (htmlId === '' || idRegex.test(htmlId)) {
        console.error("uuid must be a valid HTML5 id but was given \"".concat(htmlId, "\", ASCII whitespaces are forbidden"));
        return false;
    }
    return true;
}
//# sourceMappingURL=uuid.js.map
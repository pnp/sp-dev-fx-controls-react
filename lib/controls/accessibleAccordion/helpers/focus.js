export function getClosestAccordion(el) {
    return (el &&
        (el.matches('[data-accordion-component="Accordion"]')
            ? el
            : getClosestAccordion(el.parentElement)));
}
export function getSiblingButtons(item) {
    var parentAccordion = getClosestAccordion(item);
    return (parentAccordion &&
        Array.from(parentAccordion.querySelectorAll('[data-accordion-component="AccordionItemButton"]')));
}
export function focusFirstSiblingOf(item) {
    var siblings = getSiblingButtons(item) || [];
    var first = siblings[0];
    if (first) {
        first.focus();
    }
}
export function focusLastSiblingOf(item) {
    var siblings = getSiblingButtons(item) || [];
    var last = siblings[siblings.length - 1];
    if (last) {
        last.focus();
    }
}
export function focusNextSiblingOf(item) {
    var siblings = getSiblingButtons(item) || [];
    var currentIndex = siblings.indexOf(item);
    if (currentIndex !== -1) {
        var next = siblings[currentIndex + 1];
        if (next) {
            next.focus();
        }
    }
}
export function focusPreviousSiblingOf(item) {
    var siblings = getSiblingButtons(item) || [];
    var currentIndex = siblings.indexOf(item);
    if (currentIndex !== -1) {
        var previous = siblings[currentIndex - 1];
        if (previous) {
            previous.focus();
        }
    }
}
//# sourceMappingURL=focus.js.map
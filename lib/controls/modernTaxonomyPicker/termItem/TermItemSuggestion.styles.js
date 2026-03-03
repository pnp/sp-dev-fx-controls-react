import { getGlobalClassNames } from '@fluentui/react/lib/Styling';
var GlobalClassNames = {
    suggestionTextOverflow: 'ms-TagItem-TextOverflow',
};
export function getStyles(props) {
    var className = props.className, theme = props.theme;
    var classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        suggestionTextOverflow: [
            classNames.suggestionTextOverflow,
            {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '60vw',
                padding: '6px 12px 7px',
                whiteSpace: 'nowrap',
            },
            className,
        ],
    };
}
//# sourceMappingURL=TermItemSuggestion.styles.js.map
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
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
export var useUploadFilesStyles = makeStyles({
    baseStyle: __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, shorthands.flex('auto')), { display: 'flex', flexDirection: 'column', alignItems: 'center' }), shorthands.padding('20px')), shorthands.borderWidth('2px')), shorthands.borderRadius('2px')), shorthands.borderColor(tokens.colorNeutralBackground5)), shorthands.borderStyle('dashed')), shorthands.outline('none')), { '&:hover': __assign(__assign({}, shorthands.borderColor(tokens.colorNeutralBackground3Pressed)), { cursor: 'pointer' }) }),
    dragContainer: __assign({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }, shorthands.gap('10px')),
    imagesContainer: __assign(__assign({ display: 'grid', maxHeight: '500px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,150px), 1fr))' }, shorthands.gap('10px')), { paddingTop: '15px', paddingBottom: '15px', overflowY: 'auto', scrollbarWidth: 'thin' }),
    itemBody: {
        display: 'flex',
        flexDirection: 'column',
        /*   paddingBottom: "10px", */
    },
    headerTitle: __assign(__assign({ display: '-webkit-box', '-webkit-line-clamp': '1', '-webkit-box-orient': 'vertical' }, shorthands.overflow('hidden')), { breakWord: 'break-all', lineBreak: 'anywhere', textAlign: 'start', textOverflow: 'ellipsis' }),
    bottomContainer: {
        justifyContent: 'end',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: '15px',
        right: '5px',
        height: '20px',
    },
    card: __assign({ height: '210px' }, shorthands.borderRadius('6px')),
    deleteStyle: {
        width: '16px',
        height: '16px',
    },
    iconRefreshStyle: {
        width: '16px',
        height: '16px',
    },
    selectedImage: __assign(__assign({}, shorthands.border('3px', 'solid', tokens.colorBrandBackground)), shorthands.padding('3px')),
    dragDropIconStyles: {
        width: '28px',
        height: '28px',
        color: tokens.colorBrandBackground,
    },
    containerGlobalMarginTop: {
        marginTop: '10px',
    },
});
//# sourceMappingURL=useUploadFilesStyles.js.map
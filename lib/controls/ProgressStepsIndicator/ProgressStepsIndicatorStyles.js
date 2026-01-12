import { mergeStyleSets, } from '@fluentui/react/lib/Styling';
export var getProgressStepsIndicatorStyles = function (themeVariant, currentStep, totalSteps) {
    var _a, _b, _c, _d, _e, _f, _g;
    var labelStepTitleCurrentStyle = {
        root: {
            fontWeight: 700,
            width: 150,
            textAlign: "center",
        },
    };
    var labelStepTitleStyle = {
        root: {
            width: 150,
            textAlign: "center",
        },
    };
    var labelStepStyles = {
        root: {
            fontWeight: 400,
        },
    };
    var stackStepsStyles = {
        root: { marginLeft: 50, marginRight: 50 },
    };
    var componentClasses = mergeStyleSets({
        bulletCurrent: {
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themePrimary,
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            horizontalAlign: "center",
            zIndex: 111,
            backgroundColor: (_b = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _b === void 0 ? void 0 : _b.neutralLighter,
            fontSize: 16,
            alignItems: "center",
        },
        bulletCompleted: {
            cursor: "default",
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            horizontalAlign: "center",
            zIndex: 111,
            backgroundColor: (_c = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _c === void 0 ? void 0 : _c.themePrimary,
            color: (_d = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _d === void 0 ? void 0 : _d.themeLighter,
            fontSize: 16,
            alignItems: "center",
        },
        bullet: {
            borderColor: (_e = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _e === void 0 ? void 0 : _e.neutralTertiaryAlt,
            borderStyle: "solid",
            borderWidth: 2,
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            horizontalAlign: "center",
            verticalAlign: "center",
            backgroundColor: (_f = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _f === void 0 ? void 0 : _f.neutralLight,
            fontSize: 16,
            zIndex: 111,
        },
        line: {
            height: 2,
            backgroundColor: (_g = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _g === void 0 ? void 0 : _g.neutralQuaternaryAlt,
            width: "100%",
            position: "relative",
            top: 17,
            zIndex: 0,
        },
    });
    return { labelStepTitleCurrentStyle: labelStepTitleCurrentStyle, stackStepsStyles: stackStepsStyles, labelStepStyles: labelStepStyles, labelStepTitleStyle: labelStepTitleStyle, componentClasses: componentClasses };
};
//# sourceMappingURL=ProgressStepsIndicatorStyles.js.map
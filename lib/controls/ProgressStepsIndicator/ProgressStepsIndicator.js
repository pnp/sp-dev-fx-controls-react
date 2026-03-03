import * as React from 'react';
import * as strings from 'ControlStrings';
import { Customizer, } from '@fluentui/react/lib/Utilities';
import { Stack, } from '@fluentui/react/lib/Stack';
import { Icon, } from '@fluentui/react/lib/Icon';
import { Label, } from '@fluentui/react/lib/Label';
import { MessageBarType, MessageBar, } from '@fluentui/react/lib/MessageBar';
import { getProgressStepsIndicatorStyles, } from './ProgressStepsIndicatorStyles';
export var ProgressStepsIndicator = function (props) {
    var _a = React.useState([]), renderSteps = _a[0], setRenderSteps = _a[1];
    var _b = React.useState([]), renderStepsTitle = _b[0], setRenderStepsTitle = _b[1];
    var steps = props.steps, currentStep = props.currentStep, themeVariant = props.themeVariant;
    var _c = getProgressStepsIndicatorStyles(themeVariant, currentStep, steps.length), labelStepTitleCurrentStyle = _c.labelStepTitleCurrentStyle, labelStepTitleStyle = _c.labelStepTitleStyle, labelStepStyles = _c.labelStepStyles, stackStepsStyles = _c.stackStepsStyles, componentClasses = _c.componentClasses;
    React.useEffect(function () {
        (function () {
            var _renderSteps = [];
            var _renderStepTitle = [];
            var _currentStep = currentStep ? currentStep : 0;
            if (steps && steps.length) {
                steps.map(function (step, i) {
                    if (_currentStep > i) {
                        _renderSteps.push(React.createElement(Stack, { key: "".concat(i), horizontal: true },
                            React.createElement("div", { className: componentClasses.bulletCompleted },
                                React.createElement(Icon, { iconName: "CheckMark" }))));
                        _renderStepTitle.push(React.createElement(Label, { key: "".concat(i), styles: labelStepTitleStyle }, step.title));
                    }
                    if (_currentStep === i) {
                        _renderSteps.push(React.createElement(Stack, { key: "".concat(i), horizontal: true },
                            React.createElement("div", { key: "".concat(i), className: componentClasses.bulletCurrent },
                                React.createElement(Label, { styles: labelStepStyles }, i + 1))));
                        _renderStepTitle.push(React.createElement(Label, { key: "".concat(i), styles: labelStepTitleCurrentStyle }, step.title));
                    }
                    if (_currentStep < i) {
                        _renderSteps.push(React.createElement("div", { key: "".concat(i), className: componentClasses.bullet },
                            React.createElement(Label, { styles: labelStepStyles }, i + 1)));
                        _renderStepTitle.push(React.createElement(Label, { key: "".concat(i), styles: labelStepTitleStyle }, step.title));
                    }
                });
            }
            setRenderSteps(_renderSteps);
            setRenderStepsTitle(_renderStepTitle);
        })();
    }, [steps, currentStep]);
    if (steps && steps.length === 0) {
        return React.createElement(MessageBar, { messageBarType: MessageBarType.info }, strings.ProgressStepsIndicatorNoSteps);
    }
    return (React.createElement(Customizer, { settings: { theme: props.themeVariant } },
        React.createElement(Stack, { styles: stackStepsStyles },
            React.createElement("div", { className: componentClasses.line }),
            React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between" }, renderSteps)),
        React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between", styles: { root: { marginTop: "7px !important" } } }, renderStepsTitle)));
};
//# sourceMappingURL=ProgressStepsIndicator.js.map
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
import * as React from "react";
import { useEffect, useState } from 'react';
import styles from './AnimatedDialog.module.scss';
import { Dialog } from '@fluentui/react/lib/Dialog';
import { Icon } from '@fluentui/react/lib/Icon';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
require('animate.css/animate.min.css');
var animationPrefix = "animate__";
var mainAnimationClass = "".concat(animationPrefix, "animated");
var defaultDialogAnimationClass = "".concat(animationPrefix, "bounceIn");
var defaultIconAnimationClass = "".concat(animationPrefix, "zoomIn");
export function AnimatedDialog(props) {
    var _this = this;
    var _a = useState(props), dialogProps = _a[0], setDialogProps = _a[1];
    var _b = useState(props.dialogContentProps), animatedDialogContentProps = _b[0], setAnimatedDialogContentProps = _b[1];
    var _c = useState(null), animatedDialogFooter = _c[0], setAnimatedDialogFooter = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var dialogAnimationInType = props.dialogAnimationInType, dialogAnimationOutType = props.dialogAnimationOutType, iconName = props.iconName, iconAnimationType = props.iconAnimationType, modalProps = props.modalProps, dialogContentProps = props.dialogContentProps, showAnimatedDialogFooter = props.showAnimatedDialogFooter, okButtonText = props.okButtonText, cancelButtonText = props.cancelButtonText;
    var currentContainerClass = modalProps && modalProps.containerClassName;
    var containerAnimationClass = "".concat(currentContainerClass, " ").concat(mainAnimationClass, " ").concat(animationPrefix, "fast");
    var getAnimatedDialogFooter = function () {
        return showAnimatedDialogFooter ?
            React.createElement("div", { className: styles.animatedDialogFooter },
                React.createElement(PrimaryButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    setLoading(true);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, props.onOkClick()];
                                case 2:
                                    _b.sent();
                                    props.onSuccess();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _a = _b.sent();
                                    props.onError();
                                    return [3 /*break*/, 4];
                                case 4:
                                    setLoading(false);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, disabled: loading, text: !loading && (okButtonText ? okButtonText : "Ok"), iconProps: !loading && { iconName: 'CheckMark' } }, loading && React.createElement(Spinner, { size: SpinnerSize.medium })),
                React.createElement(DefaultButton, { onClick: props.onDismiss, text: cancelButtonText ? cancelButtonText : "Cancel", disabled: loading, iconProps: { iconName: 'Cancel' } })) : null;
    };
    useEffect(function () {
        var title = dialogContentProps && dialogContentProps.title;
        if (iconName) {
            title =
                React.createElement("div", { className: styles.animatedDialogTitleContainer },
                    React.createElement(Icon, { iconName: iconName, className: iconAnimationType ?
                            "".concat(mainAnimationClass, " ").concat(animationPrefix).concat(iconAnimationType) :
                            "".concat(mainAnimationClass, " ").concat(defaultIconAnimationClass) }),
                    React.createElement("br", null),
                    React.createElement("span", null, dialogContentProps && dialogContentProps.title));
        }
        setAnimatedDialogContentProps(__assign(__assign({}, dialogContentProps), { title: title }));
    }, []);
    useEffect(function () {
        setAnimatedDialogFooter(getAnimatedDialogFooter());
    }, [loading]);
    useEffect(function () {
        var containerClassName = "".concat(containerAnimationClass, " ").concat(defaultDialogAnimationClass);
        if (props.dialogAnimationInType) {
            containerClassName = "".concat(containerAnimationClass, " ").concat(animationPrefix).concat(dialogAnimationInType);
        }
        if (props.hidden) {
            containerClassName = "".concat(containerAnimationClass, " ");
            containerClassName += dialogAnimationOutType ?
                "".concat(animationPrefix).concat(dialogAnimationOutType) :
                "".concat(animationPrefix, "zoomOut");
        }
        setDialogProps(__assign(__assign({}, props), { dialogContentProps: animatedDialogContentProps, modalProps: __assign(__assign({}, modalProps), { containerClassName: containerClassName }) }));
    }, [props.hidden]);
    return (React.createElement(Dialog, __assign({}, dialogProps),
        props.children,
        animatedDialogFooter));
}
//# sourceMappingURL=AnimatedDialog.js.map
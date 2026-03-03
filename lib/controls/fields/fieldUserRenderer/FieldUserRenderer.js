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
import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import clone from 'lodash/clone';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { IconButton, Button, ButtonType } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Link } from '@fluentui/react/lib/Link';
import { Icon } from '@fluentui/react/lib/Icon';
import styles from './FieldUserRenderer.module.scss';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import FieldUserHoverCard from './FieldUserHoverCard';
import * as telemetry from '../../../common/telemetry';
import * as strings from 'ControlStrings';
import { SPHelper } from '../../../common/utilities';
/**
 * Field User Renderer.
 * Used for:
 *   - People and Groups
 */
var FieldUserRenderer = /** @class */ (function (_super) {
    __extends(FieldUserRenderer, _super);
    function FieldUserRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        // cached user profiles
        _this._loadedUserProfiles = {};
        telemetry.track('FieldUserRenderer', {});
        _this._userImageUrl = "".concat(GeneralHelper.trimSlash(props.context.pageContext.web.absoluteUrl), "/_layouts/15/userphoto.aspx?size=L&accountname={0}");
        var users = props.users ? props.users.map(function (user) {
            return _this._getUserFromPrincipalAndProps(user, {});
        }) : [];
        _this.state = {
            users: users
        };
        return _this;
    }
    FieldUserRenderer.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var currentPrincipals = this.props.users ? this.props.users.map(function (u) { return u.id; }) : [];
        var newPrincipals = nextProps.users ? nextProps.users.map(function (u) { return u.id; }) : [];
        if (currentPrincipals.length !== newPrincipals.length
            || currentPrincipals.filter(function (cp) { return newPrincipals.indexOf(cp) === -1; }).length
            || newPrincipals.filter(function (np) { return currentPrincipals.indexOf(np) === -1; }).length) {
            this.setState({
                users: nextProps.users.map(function (user) {
                    return _this._getUserFromPrincipalAndProps(user, {});
                })
            });
        }
    };
    FieldUserRenderer.prototype.render = function () {
        var _this = this;
        var userEls = this.state.users.map(function (user, index) {
            var expandingCardProps = {
                onRenderCompactCard: (user.email ? _this._onRenderCompactCard.bind(_this, index) : null),
                onRenderExpandedCard: (user.email ? _this._onRenderExpandedCard.bind(_this) : null),
                renderData: user,
                directionalHint: DirectionalHint.bottomLeftEdge,
                gapSpace: 1,
                expandedCardHeight: 150
            };
            var hoverCardProps = {
                expandingCardProps: expandingCardProps,
                displayName: user.displayName,
                cssProps: _this.props.cssProps
            };
            return React.createElement(FieldUserHoverCard, __assign({ key: user.id }, hoverCardProps));
        });
        return React.createElement("div", { style: this.props.cssProps, className: css(this.props.className) }, userEls);
    };
    /**
     * Renders compact part of user Hover Card
     * @param index user index in the list of users/groups in the People and Group field value
     * @param user IUser
     */
    FieldUserRenderer.prototype._onRenderCompactCard = function (index, user) {
        this._requestUserProfile(user, index).then(function () { }).catch(function () { });
        var sip = user.sip || user.email;
        var actionsEl;
        if (user.currentUser) {
            actionsEl = React.createElement("div", { className: styles.actions },
                React.createElement(Button, { buttonType: ButtonType.command, iconProps: { iconName: 'Edit' }, href: user.userUrl, target: '_blank' }, strings.UpdateProfile));
        }
        else {
            actionsEl = React.createElement("div", { className: styles.actions },
                React.createElement(IconButton, { iconProps: { iconName: 'Mail' }, title: strings.SendEmailTo.replace('{0}', user.email), href: "mailto:".concat(user.email) }),
                React.createElement(IconButton, { iconProps: { iconName: 'Chat' }, title: strings.StartChatWith.replace('{0}', sip), href: "sip:".concat(sip), className: styles.chat }));
        }
        return React.createElement("div", { className: styles.main },
            React.createElement(Persona, { imageUrl: user.imageUrl, primaryText: user.displayName, secondaryText: user.department, tertiaryText: user.jobTitle, size: PersonaSize.large }),
            actionsEl);
    };
    /**
     * Renders expanded part of user Hover Card
     * @param user IUser
     */
    FieldUserRenderer.prototype._onRenderExpandedCard = function (user) {
        if (this._loadedUserProfiles[user.id]) {
            return React.createElement("ul", { className: styles.sections },
                React.createElement("li", { className: styles.section },
                    React.createElement("div", { className: styles.header },
                        strings.Contact,
                        " ",
                        React.createElement(Icon, { iconName: "ChevronRight", className: styles.chevron })),
                    React.createElement("div", { className: styles.contactItem },
                        React.createElement(Icon, { iconName: 'Mail' }),
                        React.createElement(Link, { className: styles.content, title: user.email, href: "mailto:".concat(user.email), target: '_self' }, user.email)),
                    user.workPhone &&
                        React.createElement("div", { className: styles.contactItem },
                            React.createElement(Icon, { iconName: 'Phone' }),
                            React.createElement(Link, { className: styles.content, title: user.workPhone, href: "tel:".concat(user.workPhone), target: '_self' }, user.workPhone)),
                    user.cellPhone &&
                        React.createElement("div", { className: styles.contactItem },
                            React.createElement(Icon, { iconName: 'Phone' }),
                            React.createElement(Link, { className: styles.content, title: user.cellPhone, href: "tel:".concat(user.cellPhone), target: '_self' }, user.cellPhone))));
        }
        else {
            return React.createElement(Spinner, { size: SpinnerSize.large });
        }
    };
    /**
     * Merges data from IPrincipal object and IUserProfileProperties object to IUser object
     * @param principal IPrincipal
     * @param userProfileProperties IUserProfileProperties
     */
    FieldUserRenderer.prototype._getUserFromPrincipalAndProps = function (principal, userProfileProperties) {
        var imageUrl = userProfileProperties.pictureUrl || principal.picture;
        var mthumbStr = 'MThumb.jpg';
        if (imageUrl && imageUrl.indexOf(mthumbStr) === imageUrl.length - mthumbStr.length) {
            imageUrl = '';
        }
        return {
            displayName: userProfileProperties.displayName || principal.title,
            jobTitle: userProfileProperties.jobTitle || principal.jobTitle,
            department: userProfileProperties.department || principal.department,
            id: principal.id,
            imageUrl: imageUrl ? this._userImageUrl.replace('{0}', principal.email) : imageUrl,
            email: userProfileProperties.email || principal.email,
            sip: userProfileProperties.sip || principal.sip,
            workPhone: userProfileProperties.workPhone,
            cellPhone: userProfileProperties.cellPhone,
            userUrl: this._getUserUrlTemplate().replace('{0}', principal.email), //userProfileProperties.userUrl
            currentUser: principal.id === this.props.context.pageContext.legacyPageContext.userId
        };
    };
    /**
     * Get the template of url for editing user profile in Delve
     */
    FieldUserRenderer.prototype._getUserUrlTemplate = function () {
        if (!this._userUrlTemplate) {
            this._userUrlTemplate = "".concat(location.protocol, "//").concat(location.hostname.split('.sharepoint.com')[0], "-my.sharepoint.com/person.aspx?user={0}&v=editprofile");
        }
        return this._userUrlTemplate;
    };
    /**
     * Requests User Profile Properties
     */
    FieldUserRenderer.prototype._requestUserProfile = function (user, index) {
        return __awaiter(this, void 0, void 0, function () {
            var context, siteUser, value, mthumbStr, userProfileProps, props, foundPropsCount, i, len, prop;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._loadedUserProfiles[user.id]) {
                            return [2 /*return*/]; // we've already have the profile info
                        }
                        context = this.props.context;
                        return [4 /*yield*/, SPHelper.getUserById(parseInt(user.id), context)];
                    case 1:
                        siteUser = _a.sent();
                        return [4 /*yield*/, SPHelper.getUserProperties(siteUser.LoginName, context)];
                    case 2:
                        value = _a.sent();
                        mthumbStr = 'MThumb.jpg';
                        userProfileProps = {
                            displayName: value.DisplayName,
                            email: value.Email,
                            jobTitle: value.Title,
                            userUrl: value.UserUrl,
                            pictureUrl: value.PictureUrl && value.PictureUrl.toString().indexOf(mthumbStr) === value.PictureUrl.toString().length - mthumbStr.length ? '' : value.PictureUrl //this._userImageUrl.replace('{0}', user.email)
                        };
                        props = value.UserProfileProperties;
                        foundPropsCount = 0;
                        for (i = 0, len = props.length; i < len; i++) {
                            prop = props[i];
                            switch (prop.Key) {
                                case 'WorkPhone':
                                    userProfileProps.workPhone = prop.Value;
                                    foundPropsCount++;
                                    break;
                                case 'Department':
                                    userProfileProps.department = prop.Value;
                                    foundPropsCount++;
                                    break;
                                case 'SPS-SipAddress':
                                    userProfileProps.sip = prop.Value;
                                    foundPropsCount++;
                                    break;
                                case 'CellPhone':
                                    userProfileProps.cellPhone = prop.Value;
                                    foundPropsCount++;
                                    break;
                            }
                            if (foundPropsCount === 4) {
                                break;
                            }
                        }
                        this._loadedUserProfiles[user.id] = userProfileProps;
                        this.setState(function (prevState, componentProps) {
                            var newUsers = clone(prevState.users);
                            newUsers[index] = _this._getUserFromPrincipalAndProps(_this.props.users[index], userProfileProps);
                            return { users: newUsers };
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return FieldUserRenderer;
}(React.Component));
export { FieldUserRenderer };
//# sourceMappingURL=FieldUserRenderer.js.map
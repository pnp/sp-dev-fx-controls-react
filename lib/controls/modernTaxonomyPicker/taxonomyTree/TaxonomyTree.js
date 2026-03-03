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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { Checkbox, ChoiceGroup, css, FocusZone, FocusZoneDirection, FontIcon, getRTLSafeKeyCode, GroupedList, GroupHeader, KeyCodes, Label, Link, Spinner, } from "@fluentui/react";
import * as strings from "ControlStrings";
import { Guid } from "@microsoft/sp-core-library";
import styles from "./TaxonomyTree.module.scss";
export function TaxonomyTree(props) {
    var _a = React.useState([]), groupsLoading = _a[0], setGroupsLoading = _a[1];
    var _b = React.useState([]), groups = _b[0], setGroups = _b[1];
    var updateTaxonomyTreeViewWithNewTermItems = function (newTermItems, parentTerm) {
        var _a, _b;
        var _loop_1 = function (term) {
            var findGroupContainingTerm = function (currentGroup) {
                var _a;
                if (!term.parent || currentGroup.key === term.parent.id) {
                    return currentGroup;
                }
                if (((_a = currentGroup.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    for (var _i = 0, _b = currentGroup.children; _i < _b.length; _i++) {
                        var child = _b[_i];
                        var foundGroup = findGroupContainingTerm(child);
                        if (foundGroup) {
                            return foundGroup;
                        }
                    }
                }
                return null;
            };
            var findParentTermLevel = function (groups, parentTermId) {
                for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                    var group = groups_1[_i];
                    if (group.key === parentTermId) {
                        return group.level;
                    }
                    if (group.children && group.children.length > 0) {
                        var level = findParentTermLevel(group.children, parentTermId);
                        if (level !== null) {
                            return level;
                        }
                    }
                }
                return null;
            };
            var parentTermLevel = findParentTermLevel([groups[0]], parentTerm[0].id);
            var groupToAddTermTo = findGroupContainingTerm(groups[0]);
            var termNames = term.labels.filter(function (termLabel) {
                return termLabel.languageTag === props.languageTag &&
                    termLabel.isDefault === true;
            });
            if (termNames.length === 0) {
                termNames = term.labels.filter(function (termLabel) {
                    return termLabel.languageTag === props.termStoreInfo.defaultLanguageTag &&
                        termLabel.isDefault === true;
                });
            }
            var g = {
                name: (_a = termNames[0]) === null || _a === void 0 ? void 0 : _a.name,
                key: term.id,
                startIndex: -1,
                count: 50,
                level: parentTermLevel + 1,
                isCollapsed: true,
                data: { skiptoken: "", term: term },
                hasMoreData: term.childrenCount > 0,
            };
            if (g.hasMoreData) {
                g.children = [];
            }
            groupToAddTermTo.children = __spreadArray(__spreadArray([], ((_b = groupToAddTermTo.children) !== null && _b !== void 0 ? _b : []), true), [g], false);
            props.setTerms(function (prevTerms) {
                var nonExistingTerms = newTermItems.filter(function (newTerm) {
                    return prevTerms.every(function (prevTerm) { return prevTerm.id !== newTerm.id; });
                });
                return __spreadArray(__spreadArray([], prevTerms, true), nonExistingTerms, true);
            });
        };
        for (var _i = 0, newTermItems_1 = newTermItems; _i < newTermItems_1.length; _i++) {
            var term = newTermItems_1[_i];
            _loop_1(term);
        }
    };
    var updateTaxonomyTreeViewWithUpdatedTermItems = function (updatedTermItems) {
        var _a;
        var _loop_2 = function (term) {
            var findGroupForTerm = function (currentGroup) {
                var _a;
                if (currentGroup.key === term.id) {
                    return currentGroup;
                }
                if (((_a = currentGroup.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    for (var _i = 0, _b = currentGroup.children; _i < _b.length; _i++) {
                        var child = _b[_i];
                        var foundGroup = findGroupForTerm(child);
                        if (foundGroup) {
                            return foundGroup;
                        }
                    }
                }
                return null;
            };
            var groupForUpdatedTerm = findGroupForTerm(groups[0]);
            var termNames = term.labels.filter(function (termLabel) {
                return termLabel.languageTag === props.languageTag &&
                    termLabel.isDefault === true;
            });
            if (termNames.length === 0) {
                termNames = term.labels.filter(function (termLabel) {
                    return termLabel.languageTag === props.termStoreInfo.defaultLanguageTag &&
                        termLabel.isDefault === true;
                });
            }
            groupForUpdatedTerm.name = (_a = termNames[0]) === null || _a === void 0 ? void 0 : _a.name;
            groupForUpdatedTerm.data.term = term;
            if (term.childrenCount > 0 && !groupForUpdatedTerm.children) {
                groupForUpdatedTerm.children = [];
            }
            groupForUpdatedTerm.hasMoreData =
                groupForUpdatedTerm.children &&
                    term.childrenCount > groupForUpdatedTerm.children.length;
            props.setTerms(function (prevTerms) {
                return __spreadArray(__spreadArray([], prevTerms.filter(function (t) { return t.id !== term.id; }), true), [term], false);
            });
        };
        for (var _i = 0, updatedTermItems_1 = updatedTermItems; _i < updatedTermItems_1.length; _i++) {
            var term = updatedTermItems_1[_i];
            _loop_2(term);
        }
    };
    var updateTaxonomyTreeViewWithDeletedTermItems = function (deletedTermItems) {
        var _loop_3 = function (term) {
            var deleteGroupForTerm = function (currentGroup) {
                var _a, _b;
                if (((_a = currentGroup.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    for (var _i = 0, _c = currentGroup.children; _i < _c.length; _i++) {
                        var child = _c[_i];
                        deleteGroupForTerm(child);
                    }
                    if (currentGroup.children.some(function (t) { return t.key === term.id; })) {
                        currentGroup.children = currentGroup.children.filter(function (t) { return t.key !== term.id; });
                        if (((_b = currentGroup.children) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                            currentGroup.hasMoreData = false;
                            currentGroup.children = undefined;
                        }
                    }
                }
            };
            deleteGroupForTerm(groups[0]);
            props.setTerms(function (prevTerms) {
                return __spreadArray([], prevTerms.filter(function (t) { return t.id !== term.id; }), true);
            });
        };
        for (var _i = 0, deletedTermItems_1 = deletedTermItems; _i < deletedTermItems_1.length; _i++) {
            var term = deletedTermItems_1[_i];
            _loop_3(term);
        }
    };
    var updateTaxonomyTreeView = function (newTermItems, parentTerm, updatedTermItems, deletedTermItems) {
        if (newTermItems) {
            updateTaxonomyTreeViewWithNewTermItems(newTermItems, parentTerm);
        }
        if (updatedTermItems) {
            updateTaxonomyTreeViewWithUpdatedTermItems(updatedTermItems);
        }
        if (deletedTermItems) {
            updateTaxonomyTreeViewWithDeletedTermItems(deletedTermItems);
        }
    };
    React.useEffect(function () {
        var _a;
        var termRootName = "";
        if (!props.anchorTermInfo && !props.termSetInfo) {
            return;
        }
        if (props.anchorTermInfo) {
            var anchorTermNames = props.anchorTermInfo.labels.filter(function (name) { return name.languageTag === props.languageTag && name.isDefault; });
            if (anchorTermNames.length === 0) {
                anchorTermNames = props.anchorTermInfo.labels.filter(function (name) {
                    return name.languageTag === props.termStoreInfo.defaultLanguageTag &&
                        name.isDefault;
                });
            }
            termRootName = anchorTermNames[0].name;
        }
        else {
            var termSetNames = ((_a = props.termSetInfo) === null || _a === void 0 ? void 0 : _a.localizedNames.filter(function (name) { return name.languageTag === props.languageTag; })) || [];
            if (termSetNames.length === 0) {
                termSetNames = props.termSetInfo.localizedNames.filter(function (name) { return name.languageTag === props.termStoreInfo.defaultLanguageTag; }) || [];
            }
            termRootName = termSetNames[0].name || '';
        }
        var rootGroup = {
            name: termRootName,
            key: props.anchorTermInfo
                ? props.anchorTermInfo.id
                : props.termSetInfo.id,
            startIndex: -1,
            count: 50,
            level: 0,
            isCollapsed: false,
            data: { skiptoken: "" },
            hasMoreData: (props.anchorTermInfo
                ? props.anchorTermInfo.childrenCount
                : props.termSetInfo.childrenCount) > 0,
        };
        setGroups([rootGroup]);
        setGroupsLoading(function (prevGroupsLoading) { return __spreadArray(__spreadArray([], prevGroupsLoading, true), [
            props.termSetInfo.id,
        ], false); });
        if (props.termSetInfo.childrenCount > 0) {
            props
                .onLoadMoreData(Guid.parse(props.termSetInfo.id), props.anchorTermInfo
                ? Guid.parse(props.anchorTermInfo.id)
                : Guid.empty, "", props.hideDeprecatedTerms)
                .then(function (loadedTerms) {
                var grps = loadedTerms.value.map(function (term) {
                    var _a;
                    var termNames = term.labels.filter(function (termLabel) {
                        return termLabel.languageTag === props.languageTag &&
                            termLabel.isDefault === true;
                    });
                    if (termNames.length === 0) {
                        termNames = term.labels.filter(function (termLabel) {
                            return termLabel.languageTag ===
                                props.termStoreInfo.defaultLanguageTag &&
                                termLabel.isDefault === true;
                        });
                    }
                    var g = {
                        name: (_a = termNames[0]) === null || _a === void 0 ? void 0 : _a.name,
                        key: term.id,
                        startIndex: -1,
                        count: 50,
                        level: 1,
                        isCollapsed: true,
                        data: { skiptoken: "", term: term },
                        hasMoreData: props.allowSelectingChildren !== false &&
                            term.childrenCount > 0,
                    };
                    if (g.hasMoreData) {
                        g.children = [];
                    }
                    return g;
                });
                props.setTerms(function (prevTerms) {
                    var nonExistingTerms = loadedTerms.value.filter(function (newTerm) {
                        return prevTerms.every(function (prevTerm) { return prevTerm.id !== newTerm.id; });
                    });
                    return __spreadArray(__spreadArray([], prevTerms, true), nonExistingTerms, true);
                });
                rootGroup.children = grps;
                rootGroup.data.skiptoken = loadedTerms.skiptoken;
                rootGroup.hasMoreData = loadedTerms.skiptoken !== "";
                setGroupsLoading(function (prevGroupsLoading) {
                    return prevGroupsLoading.filter(function (value) { return value !== props.termSetInfo.id; });
                });
                setGroups([rootGroup]);
            })
                .catch(function () {
                // no-op;
            });
        }
    }, []);
    var onToggleCollapse = function (group) {
        if (group.isCollapsed === true) {
            setGroups(function (prevGroups) {
                var recurseGroups = function (currentGroup) {
                    var _a;
                    if (currentGroup.key === group.key) {
                        currentGroup.isCollapsed = false;
                    }
                    if (((_a = currentGroup.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        for (var _i = 0, _b = currentGroup.children; _i < _b.length; _i++) {
                            var child = _b[_i];
                            recurseGroups(child);
                        }
                    }
                };
                var newGroupsState = [];
                for (var _i = 0, prevGroups_1 = prevGroups; _i < prevGroups_1.length; _i++) {
                    var prevGroup = prevGroups_1[_i];
                    recurseGroups(prevGroup);
                    newGroupsState.push(prevGroup);
                }
                return newGroupsState;
            });
            if (group.children && group.children.length === 0) {
                setGroupsLoading(function (prevGroupsLoading) { return __spreadArray(__spreadArray([], prevGroupsLoading, true), [
                    group.key,
                ], false); });
                group.data.isLoading = true;
                props
                    .onLoadMoreData(Guid.parse(props.termSetInfo.id), Guid.parse(group.key), "", props.hideDeprecatedTerms)
                    .then(function (loadedTerms) {
                    var grps = loadedTerms.value.map(function (term) {
                        var _a;
                        var termNames = term.labels.filter(function (termLabel) {
                            return termLabel.languageTag === props.languageTag &&
                                termLabel.isDefault === true;
                        });
                        if (termNames.length === 0) {
                            termNames = term.labels.filter(function (termLabel) {
                                return termLabel.languageTag ===
                                    props.termStoreInfo.defaultLanguageTag &&
                                    termLabel.isDefault === true;
                            });
                        }
                        var g = {
                            name: (_a = termNames[0]) === null || _a === void 0 ? void 0 : _a.name,
                            key: term.id,
                            startIndex: -1,
                            count: 50,
                            level: group.level + 1,
                            isCollapsed: true,
                            data: { skiptoken: "", term: term },
                            hasMoreData: term.childrenCount > 0,
                        };
                        if (g.hasMoreData) {
                            g.children = [];
                        }
                        return g;
                    });
                    props.setTerms(function (prevTerms) {
                        var nonExistingTerms = loadedTerms.value.filter(function (newTerm) {
                            return prevTerms.every(function (prevTerm) { return prevTerm.id !== newTerm.id; });
                        });
                        return __spreadArray(__spreadArray([], prevTerms, true), nonExistingTerms, true);
                    });
                    var nonExistingChildren = grps.filter(function (grp) { var _a; return (_a = group.children) === null || _a === void 0 ? void 0 : _a.every(function (child) { return child.key !== grp.key; }); });
                    group.children = nonExistingChildren;
                    group.data.skiptoken = loadedTerms.skiptoken;
                    group.hasMoreData = loadedTerms.skiptoken !== "";
                    setGroupsLoading(function (prevGroupsLoading) {
                        return prevGroupsLoading.filter(function (value) { return value !== group.key; });
                    });
                })
                    .catch(function () {
                    // no-op;
                });
            }
        }
        else {
            setGroups(function (prevGroups) {
                var recurseGroups = function (currentGroup) {
                    var _a;
                    if (currentGroup.key === group.key) {
                        currentGroup.isCollapsed = true;
                    }
                    if (((_a = currentGroup.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        for (var _i = 0, _b = currentGroup.children; _i < _b.length; _i++) {
                            var child = _b[_i];
                            recurseGroups(child);
                        }
                    }
                };
                var newGroupsState = [];
                for (var _i = 0, prevGroups_2 = prevGroups; _i < prevGroups_2.length; _i++) {
                    var prevGroup = prevGroups_2[_i];
                    recurseGroups(prevGroup);
                    newGroupsState.push(prevGroup);
                }
                return newGroupsState;
            });
        }
    };
    var onRenderTitle = function (groupHeaderProps) {
        var isChildSelected = function (children) {
            var aChildIsSelected = children &&
                children.some(function (child) {
                    return (props.selection && props.selection.isKeySelected(child.key)) ||
                        isChildSelected(child.children);
                });
            return aChildIsSelected;
        };
        var childIsSelected = props.selection && isChildSelected(groupHeaderProps.group.children);
        if (groupHeaderProps.group.level === 0) {
            var labelStyles = {
                root: {
                    width: "100%",
                    fontWeight: childIsSelected ? "bold" : "normal",
                },
            };
            return (React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal, className: styles.taxonomyItemFocusZone },
                props.showIcons && (React.createElement(FontIcon, { iconName: "Tag", className: styles.taxonomyItemIcon })),
                React.createElement(Label, { styles: labelStyles }, groupHeaderProps.group.name),
                React.createElement("div", { className: styles.actionButtonContainer }, props.onRenderActionButton &&
                    props.onRenderActionButton(props.termStoreInfo, props.termSetInfo, props.anchorTermInfo, updateTaxonomyTreeView))));
        }
        if (!props.selection) {
            var labelStyles = {
                root: {
                    width: "100%",
                    fontWeight: childIsSelected ? "bold" : "normal",
                },
            };
            var taxonomyItemIconName = groupHeaderProps.group.data.term
                .isDeprecated
                ? "Blocked"
                : "Tag";
            return (React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal, className: styles.taxonomyItemFocusZone },
                props.showIcons && (React.createElement(FontIcon, { iconName: taxonomyItemIconName, className: styles.taxonomyItemIcon })),
                React.createElement(Label, { styles: labelStyles }, groupHeaderProps.group.name),
                React.createElement("div", { className: styles.actionButtonContainer }, props.onRenderActionButton &&
                    props.onRenderActionButton(props.termStoreInfo, props.termSetInfo, groupHeaderProps.group.data.term, updateTaxonomyTreeView))));
        }
        var isDisabled = groupHeaderProps.group.data.term.isAvailableForTagging.filter(function (t) { return t.setId === props.termSetInfo.id; })[0].isAvailable === false;
        var isSelected = props.selection &&
            props.selection.isKeySelected(groupHeaderProps.group.key);
        if (props.allowMultipleSelections) {
            var checkBoxStyles = { root: { flex: "1" } };
            if (isSelected || childIsSelected) {
                checkBoxStyles.label = { fontWeight: "bold" };
            }
            else {
                checkBoxStyles.label = { fontWeight: "normal" };
            }
            return (React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal, className: styles.taxonomyItemFocusZone },
                React.createElement(Checkbox, { key: groupHeaderProps.group.key, label: groupHeaderProps.group.name, checked: isSelected, styles: checkBoxStyles, disabled: isDisabled, onRenderLabel: function (p) { return (React.createElement("span", { className: css(!isDisabled && styles.checkbox, isDisabled && styles.disabledCheckbox, isSelected && styles.selectedCheckbox), title: p.title }, p.label)); }, onChange: function (ev, checked) {
                        if (props.selection) {
                            props.selection.setKeySelected(groupHeaderProps.group.key, checked, false);
                        }
                    } }),
                React.createElement("div", { className: styles.actionButtonContainer }, props.onRenderActionButton &&
                    props.onRenderActionButton(props.termStoreInfo, props.termSetInfo, groupHeaderProps.group.data.term, updateTaxonomyTreeView))));
        }
        else {
            var choiceGroupOptionStyles = isSelected || childIsSelected
                ? {
                    root: { marginTop: 0 },
                    choiceFieldWrapper: { fontWeight: "bold", flex: "1" },
                    field: { width: "100%" },
                }
                : {
                    root: { marginTop: 0 },
                    choiceFieldWrapper: { fontWeight: "normal", flex: "1" },
                    field: { width: "100%" },
                };
            var options = [
                {
                    key: groupHeaderProps.group.key,
                    text: groupHeaderProps.group.name,
                    styles: choiceGroupOptionStyles,
                    onRenderLabel: function (p) { return (React.createElement("span", { id: p.labelId, className: css(!isDisabled && styles.choiceOption, isDisabled && styles.disabledChoiceOption, isSelected && styles.selectedChoiceOption) }, p.text)); },
                    onClick: function () {
                        if (props.selection) {
                            props.selection.setAllSelected(false);
                            props.selection.setKeySelected(groupHeaderProps.group.key, true, false);
                        }
                    },
                },
            ];
            var choiceGroupStyles = { root: { flex: "1" }, flexContainer: { width: "100%" } };
            var getSelectedKey = function () {
                var _a, _b, _c;
                var selectedItems = (_a = props.selection) === null || _a === void 0 ? void 0 : _a.getSelection();
                return (_c = (_b = selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems[0]) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : null;
            };
            return (React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal, className: styles.taxonomyItemFocusZone },
                React.createElement(ChoiceGroup, { options: options, selectedKey: getSelectedKey(), disabled: isDisabled, styles: choiceGroupStyles }),
                React.createElement("div", { className: styles.actionButtonContainer }, props.onRenderActionButton &&
                    props.onRenderActionButton(props.termStoreInfo, props.termSetInfo, groupHeaderProps.group.data.term, updateTaxonomyTreeView))));
        }
    };
    var onRenderHeader = function (headerProps) {
        var _a;
        var groupHeaderStyles = {
            expand: {
                height: 42,
                visibility: !headerProps.group.children || headerProps.group.level === 0
                    ? "hidden"
                    : "visible",
                fontSize: 14,
            },
            expandIsCollapsed: {
                visibility: !headerProps.group.children || headerProps.group.level === 0
                    ? "hidden"
                    : "visible",
                fontSize: 14,
            },
            check: { display: "none" },
            headerCount: { display: "none" },
            groupHeaderContainer: {
                height: 36,
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 3,
                paddingRight: 3,
                alignItems: "center",
            },
            root: { height: 42 },
        };
        var isDisabled = headerProps.group.data.term &&
            headerProps.group.data.term.isAvailableForTagging.filter(function (t) { return t.setId === props.termSetInfo.id; })[0].isAvailable === false;
        return (React.createElement(GroupHeader, __assign({}, headerProps, { styles: groupHeaderStyles, className: styles.taxonomyItemHeader, onRenderTitle: onRenderTitle, onToggleCollapse: onToggleCollapse, indentWidth: 20, expandButtonProps: {
                style: { color: (_a = props.themeVariant) === null || _a === void 0 ? void 0 : _a.semanticColors.bodyText },
            }, onGroupHeaderKeyUp: function (ev, group) {
                if ((ev.key === " " || ev.key === "Enter") && !isDisabled) {
                    if (props.allowMultipleSelections) {
                        if (props.selection) {
                            props.selection.toggleKeySelected(headerProps.group.key);
                        }
                    }
                    else {
                        if (props.selection) {
                            props.selection.setAllSelected(false);
                            props.selection.setKeySelected(headerProps.group.key, true, false);
                        }
                    }
                }
            } })));
    };
    var onRenderFooter = function (footerProps) {
        if ((footerProps.group.hasMoreData ||
            (footerProps.group.children &&
                footerProps.group.children.length === 0)) &&
            !footerProps.group.isCollapsed) {
            if (groupsLoading.some(function (value) { return value === footerProps.group.key; })) {
                var spinnerStyles = { circle: { verticalAlign: "middle" } };
                return (React.createElement("div", { className: styles.spinnerContainer },
                    React.createElement(Spinner, { styles: spinnerStyles })));
            }
            var linkStyles = {
                root: {
                    fontSize: "14px",
                    paddingLeft: (footerProps.groupLevel + 1) * 20 + 62,
                },
            };
            return (React.createElement("div", { className: styles.loadMoreContainer },
                React.createElement(Link, { onClick: function () {
                        setGroupsLoading(function (prevGroupsLoading) { return __spreadArray(__spreadArray([], prevGroupsLoading, true), [
                            footerProps.group.key,
                        ], false); });
                        props
                            .onLoadMoreData(Guid.parse(props.termSetInfo.id), footerProps.group.key === props.termSetInfo.id
                            ? Guid.empty
                            : Guid.parse(footerProps.group.key), footerProps.group.data.skiptoken, props.hideDeprecatedTerms)
                            .then(function (loadedTerms) {
                            var grps = loadedTerms.value.map(function (term) {
                                var _a;
                                var termNames = term.labels.filter(function (termLabel) {
                                    return termLabel.languageTag === props.languageTag &&
                                        termLabel.isDefault === true;
                                });
                                if (termNames.length === 0) {
                                    termNames = term.labels.filter(function (termLabel) {
                                        return termLabel.languageTag ===
                                            props.termStoreInfo.defaultLanguageTag &&
                                            termLabel.isDefault === true;
                                    });
                                }
                                var g = {
                                    name: (_a = termNames[0]) === null || _a === void 0 ? void 0 : _a.name,
                                    key: term.id,
                                    startIndex: -1,
                                    count: 50,
                                    level: footerProps.group.level + 1,
                                    isCollapsed: true,
                                    data: { skiptoken: "", term: term },
                                    hasMoreData: term.childrenCount > 0,
                                };
                                if (g.hasMoreData) {
                                    g.children = [];
                                }
                                return g;
                            });
                            props.setTerms(function (prevTerms) {
                                var nonExistingTerms = loadedTerms.value.filter(function (newTerm) {
                                    return prevTerms.every(function (prevTerm) { return prevTerm.id !== newTerm.id; });
                                });
                                return __spreadArray(__spreadArray([], prevTerms, true), nonExistingTerms, true);
                            });
                            var nonExistingChildren = grps.filter(function (grp) {
                                var _a;
                                return (_a = footerProps.group.children) === null || _a === void 0 ? void 0 : _a.every(function (child) { return child.key !== grp.key; });
                            });
                            footerProps.group.children = __spreadArray(__spreadArray([], footerProps.group.children, true), nonExistingChildren, true);
                            footerProps.group.data.skiptoken = loadedTerms.skiptoken;
                            footerProps.group.hasMoreData = loadedTerms.skiptoken !== "";
                            setGroupsLoading(function (prevGroupsLoading) {
                                return prevGroupsLoading.filter(function (value) { return value !== footerProps.group.key; });
                            });
                        })
                            .catch(function () {
                            // no-op;
                        });
                    }, styles: linkStyles }, strings.ModernTaxonomyPickerLoadMoreText)));
        }
        return null;
    };
    var onRenderShowAll = function () {
        return null;
    };
    var groupProps = {
        onRenderFooter: onRenderFooter,
        onRenderHeader: onRenderHeader,
        showEmptyGroups: true,
        onRenderShowAll: onRenderShowAll,
    };
    var shouldEnterInnerZone = function (ev) {
        return ev.which === getRTLSafeKeyCode(KeyCodes.right);
    };
    if (!props.termSetInfo && !props.termStoreInfo) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", null,
        React.createElement(GroupedList, { items: [], onRenderCell: null, groups: groups, groupProps: groupProps, onShouldVirtualize: function (p) { return false; }, "data-is-focusable": true, focusZoneProps: {
                direction: FocusZoneDirection.vertical,
                shouldEnterInnerZone: shouldEnterInnerZone,
            } })));
}
//# sourceMappingURL=TaxonomyTree.js.map
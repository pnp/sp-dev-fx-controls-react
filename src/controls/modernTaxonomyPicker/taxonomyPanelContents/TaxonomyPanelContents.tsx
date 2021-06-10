import * as React from 'react';
import styles from './TaxonomyPanelContents.module.scss';
import { Checkbox, ChoiceGroup, GroupedList, GroupHeader, IBasePickerStyleProps, IBasePickerStyles, ICheckboxStyleProps, ICheckboxStyles, IChoiceGroupOption, IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles, IGroup, IGroupFooterProps, IGroupHeaderProps, IGroupHeaderStyleProps, IGroupHeaderStyles, IGroupRenderProps, IGroupShowAllProps, ILabelStyleProps, ILabelStyles, ILinkStyleProps, ILinkStyles, IListProps, IRenderFunction, ISpinnerStyleProps, ISpinnerStyles, IStyleFunctionOrObject, ITag, Label, Link, Selection, SelectionMode, SelectionZone, Spinner, TagPicker } from 'office-ui-fabric-react';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';
import { Guid } from '@microsoft/sp-core-library';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { css } from '@uifabric/utilities/lib/css';
import * as strings from 'ControlStrings';
import { useForceUpdate } from '@uifabric/react-hooks';

export interface ITaxonomyFormProps {
  context: BaseComponentContext;
  allowMultipleSelections: boolean;
  termSetId: Guid;
  pageSize: number;
  selectedPanelOptions: ITag[];
  setSelectedPanelOptions: React.Dispatch<React.SetStateAction<ITag[]>>;
  onResolveSuggestions: (filter: string, selectedItems?: ITag[]) => ITag[] | PromiseLike<ITag[]>;
  onLoadMoreData: (termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize?: number) => Promise<{ value: ITermInfo[], skiptoken: string }>;
  anchorTermInfo: ITermInfo;
  termSetInfo: ITermSetInfo;
  termStoreInfo: ITermStoreInfo;
  placeHolder: string;
}

export function TaxonomyPanelContents(props: ITaxonomyFormProps): React.ReactElement<ITaxonomyFormProps> {
  const [groupsLoading, setGroupsLoading] = React.useState<string[]>([]);
  const [groups, setGroups] = React.useState<IGroup[]>([]);
  const [terms, setTerms] = React.useState<ITag[]>(props.selectedPanelOptions?.length > 0 ? [...props.selectedPanelOptions] : []);

  const forceUpdate = useForceUpdate();

  const selection = React.useMemo(() => {
    const s = new Selection<ITag>({onSelectionChanged: () => {
      props.setSelectedPanelOptions((prevOptions) => [...selection.getSelection()]);
      forceUpdate();
    }});
    s.setItems(terms);
    for (const selectedOption of props.selectedPanelOptions) {
      if (s.canSelectItem) {
        s.setKeySelected(selectedOption.key.toString(), true, true);
      }
    }
    return s;
  }, [terms]);

  React.useEffect(() => {
    const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' ? props.context.pageContext.cultureInfo.currentUICultureName : props.termStoreInfo.defaultLanguageTag;
    let termRootName = "";
    if (props.anchorTermInfo) {
      let anchorTermNames = props.anchorTermInfo.labels.filter((name) => name.languageTag === languageTag && name.isDefault);
      if (anchorTermNames.length === 0) {
        anchorTermNames = props.anchorTermInfo.labels.filter((name) => name.languageTag === props.termStoreInfo.defaultLanguageTag && name.isDefault);
      }
      termRootName = anchorTermNames[0].name;
    }
    else {
      let termSetNames = props.termSetInfo.localizedNames.filter((name) => name.languageTag === languageTag);
      if (termSetNames.length === 0) {
        termSetNames = props.termSetInfo.localizedNames.filter((name) => name.languageTag === props.termStoreInfo.defaultLanguageTag);
      }
      termRootName = termSetNames[0].name;
    }
    const rootGroup: IGroup = {
      name: termRootName,
      key: props.anchorTermInfo ? props.anchorTermInfo.id : props.termSetInfo.id,
      startIndex: -1,
      count: 50,
      level: 0,
      isCollapsed: false,
      data: { skiptoken: '' },
      hasMoreData: (props.anchorTermInfo ? props.anchorTermInfo.childrenCount : props.termSetInfo.childrenCount) > 0
    };
    setGroups([rootGroup]);
    setGroupsLoading((prevGroupsLoading) => [...prevGroupsLoading, props.termSetInfo.id]);
    if (props.termSetInfo.childrenCount > 0) {
      props.onLoadMoreData(props.termSetId, props.anchorTermInfo ? Guid.parse(props.anchorTermInfo.id) : Guid.empty, '', true)
      .then((loadedTerms) => {
        const grps: IGroup[] = loadedTerms.value.map(term => {
          let termNames = term.labels.filter((termLabel) => (termLabel.languageTag === languageTag && termLabel.isDefault === true));
          if (termNames.length === 0) {
            termNames = term.labels.filter((termLabel) => (termLabel.languageTag === props.termStoreInfo.defaultLanguageTag && termLabel.isDefault === true));
          }
          const g: IGroup = {
            name: termNames[0]?.name,
            key: term.id,
            startIndex: -1,
            count: 50,
            level: 1,
            isCollapsed: true,
            data: { skiptoken: '', term: term },
            hasMoreData: term.childrenCount > 0,
          };
          if (g.hasMoreData) {
            g.children = [];
          }
          return g;
        });
        setTerms((prevTerms) => {
          const nonExistingTerms = grps.filter((grp) => prevTerms.every((prevTerm) => prevTerm.key !== grp.key));
          return [...prevTerms, ...nonExistingTerms];
        });
        rootGroup.children = grps;
        rootGroup.data.skiptoken = loadedTerms.skiptoken;
        rootGroup.hasMoreData = loadedTerms.skiptoken !== '';
        setGroupsLoading((prevGroupsLoading) => prevGroupsLoading.filter((value) => value !== props.termSetId.toString()));
        setGroups([rootGroup]);
      });
    }
  }, []);

  const onToggleCollapse = (group: IGroup): void => {
    const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' ? props.context.pageContext.cultureInfo.currentUICultureName : props.termStoreInfo.defaultLanguageTag;

    if (group.isCollapsed === true) {
      setGroups((prevGroups) => {
        const recurseGroups = (currentGroup) => {
          if (currentGroup.key === group.key) {
            currentGroup.isCollapsed = false;
          }
          if (currentGroup.children?.length > 0) {
            for (const child of currentGroup.children) {
              recurseGroups(child);
            }
          }
        };
        let newGroupsState: IGroup[] = [];
        for (const prevGroup of prevGroups) {
          recurseGroups(prevGroup);
          newGroupsState.push(prevGroup);
        }

        return newGroupsState;
      });

      if (group.children && group.children.length === 0) {
        setGroupsLoading((prevGroupsLoading) => [...prevGroupsLoading, group.key]);
        group.data.isLoading = true;

        props.onLoadMoreData(props.termSetId, Guid.parse(group.key), '', true)
          .then((loadedTerms) => {
            const grps: IGroup[] = loadedTerms.value.map(term => {
              let termNames = term.labels.filter((termLabel) => (termLabel.languageTag === languageTag && termLabel.isDefault === true));
              if (termNames.length === 0) {
                termNames = term.labels.filter((termLabel) => (termLabel.languageTag === props.termStoreInfo.defaultLanguageTag && termLabel.isDefault === true));
              }
              const g: IGroup = {
                name: termNames[0]?.name,
                key: term.id,
                startIndex: -1,
                count: 50,
                level: group.level + 1,
                isCollapsed: true,
                data: { skiptoken: '', term: term },
                hasMoreData: term.childrenCount > 0,
              };
              if (g.hasMoreData) {
                g.children = [];
              }
              return g;
            });
            setTerms((prevTerms) => {
              const nonExistingTerms = grps.filter((grp) => prevTerms.every((prevTerm) => prevTerm.key !== grp.key));
              return [...prevTerms, ...nonExistingTerms];
            });
            group.children = grps;
            group.data.skiptoken = loadedTerms.skiptoken;
            group.hasMoreData = loadedTerms.skiptoken !== '';
            setGroupsLoading((prevGroupsLoading) => prevGroupsLoading.filter((value) => value !== group.key));
          });
      }
    }
    else {
      setGroups((prevGroups) => {
        const recurseGroups = (currentGroup) => {
          if (currentGroup.key === group.key) {
            currentGroup.isCollapsed = true;
          }
          if (currentGroup.children?.length > 0) {
            for (const child of currentGroup.children) {
              recurseGroups(child);
            }
          }
        };
        let newGroupsState: IGroup[] = [];
        for (const prevGroup of prevGroups) {
          recurseGroups(prevGroup);
          newGroupsState.push(prevGroup);
        }

        return newGroupsState;
      });

    }
  };

  const onRenderTitle = (groupHeaderProps: IGroupHeaderProps) => {
    const isChildSelected = (children: IGroup[]): boolean => {
      let aChildIsSelected = children && children.some((child) => selection.isKeySelected(child.key) || isChildSelected(child.children));
      return aChildIsSelected;
    };

    const childIsSelected = isChildSelected(groupHeaderProps.group.children);

    if (groupHeaderProps.group.level === 0) {
      const labelStyles: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles> = {root: {fontWeight: childIsSelected ? "bold" : "normal"}};
      return (
        <Label styles={labelStyles}>{groupHeaderProps.group.name}</Label>
      );
    }

    const isDisabled = groupHeaderProps.group.data.term.isAvailableForTagging.filter((t) => t.setId === props.termSetId.toString())[0].isAvailable === false;
    const isSelected = selection.isKeySelected(groupHeaderProps.group.key);

    const selectionProps = {
      "data-selection-index": selection.getItems().findIndex((term) => term.key === groupHeaderProps.group.key)
    };

    if (props.allowMultipleSelections) {
      if (isDisabled) {
        selectionProps["data-selection-disabled"] = true;
      }
      else {
        selectionProps["data-selection-toggle"] = true;
      }

      const selectedStyles: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles> = { root: {pointerEvents: 'none'} };
      if (isSelected || childIsSelected) {
        selectedStyles.label = { fontWeight: 'bold' };
      }
      else {
        selectedStyles.label = { fontWeight: 'normal' };
      }

      return (
        <div {...selectionProps}>
          <Checkbox
            key={groupHeaderProps.group.key}
            label={groupHeaderProps.group.name}
            checked={isSelected}
            styles={selectedStyles}
            disabled={isDisabled}
            onRenderLabel={(p) => <span className={css(styles.checkbox, isSelected && styles.selectedCheckbox)} title={p.title}>
              {p.label}
            </span>}
          />
        </div>
      );
    }
    else {
      const selectedStyle: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles> = isSelected || childIsSelected ? { root: {marginTop: 0}, choiceFieldWrapper: { fontWeight: 'bold',  } } : { root: {marginTop: 0}, choiceFieldWrapper: { fontWeight: 'normal' } };
      const options: IChoiceGroupOption[] = [{
                                                key: groupHeaderProps.group.key,
                                                text: groupHeaderProps.group.name,
                                                styles: selectedStyle,
                                                onRenderLabel: (p) =>
                                                  <span id={p.labelId} className={css(styles.choiceOption, isSelected && styles.selectedChoiceOption)}>
                                                    {p.text}
                                                  </span>
                                              }];

      if (isDisabled) {
        selectionProps["data-selection-disabled"] = true;
      }
      else {
        selectionProps["data-selection-select"] = true;
      }

      return (
        <div {...selectionProps}>
          <ChoiceGroup
            options={options}
            selectedKey={selection.getSelection()[0]?.key}
            disabled={isDisabled}
          />
        </div>
      );
    }
  };

  const onRenderHeader = (headerProps: IGroupHeaderProps): JSX.Element => {
    const groupHeaderStyles: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles> = {
      expand: { height: 42, visibility: !headerProps.group.children || headerProps.group.level === 0 ? "hidden" : "visible" },
      expandIsCollapsed: { visibility: !headerProps.group.children || headerProps.group.level === 0 ? "hidden" : "visible" },
      check: { display: 'none' },
      headerCount: { display: 'none' },
      groupHeaderContainer: { height: 36, paddingTop: 3, paddingBottom: 3, paddingLeft: 3, paddingRight: 3, alignItems: 'center', },
      root: { height: 42 },
    };

    return (
      <GroupHeader
        {...headerProps}
        styles={groupHeaderStyles}
        onRenderTitle={onRenderTitle}
        onToggleCollapse={onToggleCollapse}
        indentWidth={20}
      />
    );
  };

  const onRenderFooter = (footerProps: IGroupFooterProps): JSX.Element => {
    if ((footerProps.group.hasMoreData || footerProps.group.children && footerProps.group.children.length === 0) && !footerProps.group.isCollapsed) {
      const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' ? props.context.pageContext.cultureInfo.currentUICultureName : props.termStoreInfo.defaultLanguageTag;

      if (groupsLoading.some(value => value === footerProps.group.key)) {
        const spinnerStyles: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles> = { circle: { verticalAlign: 'middle' } };
        return (
          <div style={{ height: '48px', lineHeight: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner styles={spinnerStyles} />
          </div>
        );
      }
      const linkStyles: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles> = { root: { fontSize: '14px', paddingLeft: (footerProps.groupLevel + 1) * 20 + 62 } };
      return (
        <div style={{ height: '48px', lineHeight: '48px' }}>
          <Link onClick={() => {
            setGroupsLoading((prevGroupsLoading) => [...prevGroupsLoading, footerProps.group.key]);
            props.onLoadMoreData(props.termSetId, footerProps.group.key === props.termSetId.toString() ? Guid.empty : Guid.parse(footerProps.group.key), footerProps.group.data.skiptoken, true)
              .then((loadedTerms) => {
                const grps: IGroup[] = loadedTerms.value.map(term => {
                  let termNames = term.labels.filter((termLabel) => (termLabel.languageTag === languageTag && termLabel.isDefault === true));
                  if (termNames.length === 0) {
                    termNames = term.labels.filter((termLabel) => (termLabel.languageTag === props.termStoreInfo.defaultLanguageTag && termLabel.isDefault === true));
                  }
                  const g: IGroup = {
                    name: termNames[0]?.name,
                    key: term.id,
                    startIndex: -1,
                    count: 50,
                    level: footerProps.group.level + 1,
                    isCollapsed: true,
                    data: { skiptoken: '', term: term },
                    hasMoreData: term.childrenCount > 0,
                  };
                  if (g.hasMoreData) {
                    g.children = [];
                  }
                  return g;
                });
                setTerms((prevTerms) => {
                  const nonExistingTerms = grps.filter((grp) => prevTerms.every((prevTerm) => prevTerm.key !== grp.key));
                  return [...prevTerms, ...nonExistingTerms];
                });
                footerProps.group.children = [...footerProps.group.children, ...grps];
                footerProps.group.data.skiptoken = loadedTerms.skiptoken;
                footerProps.group.hasMoreData = loadedTerms.skiptoken !== '';
                setGroupsLoading((prevGroupsLoading) => prevGroupsLoading.filter((value) => value !== footerProps.group.key));
              });
          }}
            styles={linkStyles}>
            {strings.ModernTaxonomyPickerLoadMoreText}
          </Link>
        </div>
      );
    }
    return null;
  };

  const onRenderShowAll: IRenderFunction<IGroupShowAllProps> = () => {
    return null;
  };

  const groupProps: IGroupRenderProps = {
    onRenderFooter: onRenderFooter,
    onRenderHeader: onRenderHeader,
    showEmptyGroups: true,
    onRenderShowAll: onRenderShowAll,
  };

  function getTagText(tag: ITag, currentValue?: string) {
    return tag.name;
  }

  const onPickerChange = (items?: ITag[]): void => {
    selection.setAllSelected(false);
    const itemsToAdd = items.filter((item) => terms.every((term) => term.key !== item.key));
    if (itemsToAdd.length > 0) {
      selection.setItems([...terms, ...itemsToAdd]);
      setTerms((prevTerms) => [...prevTerms, ...itemsToAdd]);
    }
    for (const item of items) {
      selection.setKeySelected(item.key.toString(), true, true);
    }
  };

  const tagPickerStyles: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles> = { root: {paddingTop: 4, paddingBottom: 4, paddingRight: 4, minheight: 34}, input: {minheight: 34}, text: { minheight: 34, borderStyle: 'none', borderWidth: '0px' } };

  return (
    <div className={styles.taxonomyPanelContents}>
      <div className={styles.taxonomyTreeSelector}>
        <div>
          <TagPicker
            removeButtonAriaLabel={strings.ModernTaxonomyPickerRemoveButtonText}
            onResolveSuggestions={props.onResolveSuggestions}
            itemLimit={props.allowMultipleSelections ? undefined : 1}
            selectedItems={selection.getSelection()}
            onChange={onPickerChange}
            getTextFromItem={getTagText}
            styles={tagPickerStyles}
            inputProps={{
              'aria-label': props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder,
              placeholder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder
            }}
          />
        </div>
      </div>
      <Label className={styles.taxonomyTreeLabel}>{strings.ModernTaxonomyPickerTreeTitle}</Label>
      <div>
        <SelectionZone
          selectionMode={props.allowMultipleSelections ? SelectionMode.multiple : SelectionMode.single}
          selection={selection}
        >
          <GroupedList
            items={[]}
            onRenderCell={null}
            groups={groups}
            groupProps={groupProps}
            onShouldVirtualize={(p: IListProps<any>) => false}
          />
        </SelectionZone>
      </div>
    </div>
  );
}


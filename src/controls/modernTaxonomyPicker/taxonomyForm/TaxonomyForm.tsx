import * as React from 'react';
import styles from './TaxonomyForm.module.scss';
import { Checkbox, ChoiceGroup, classNamesFunction, DetailsRow, GroupedList, GroupHeader, IBasePickerStyleProps, IBasePickerStyles, ICheckboxStyleProps, ICheckboxStyles, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles, IChoiceGroupStyleProps, IChoiceGroupStyles, IColumn, IGroup, IGroupedList, IGroupFooterProps, IGroupHeaderCheckboxProps, IGroupHeaderProps, IGroupHeaderStyleProps, IGroupHeaderStyles, IGroupRenderProps, IGroupShowAllProps, ILinkStyleProps, ILinkStyles, IListProps, IRenderFunction, ISpinnerStyleProps, ISpinnerStyles, IStyleFunctionOrObject, ITag, Label, Link, Spinner, TagPicker } from 'office-ui-fabric-react';
import { ITermInfo, ITermSetInfo } from '@pnp/sp/taxonomy';
import { Guid } from '@microsoft/sp-core-library';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { css } from '@uifabric/utilities/lib/css';

export interface ITaxonomyFormProps {
  context: BaseComponentContext;
  allowMultipleSelections: boolean;
  terms: ITermInfo[];
  termSetId: Guid;
  pageSize: number;
  selectedPanelOptions: ITag[];
  setSelectedPanelOptions: React.Dispatch<React.SetStateAction<ITag[]>>;
  onResolveSuggestions: (filter: string, selectedItems?: ITag[]) => ITag[] | PromiseLike<ITag[]>;
  onLoadMoreData: (termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize?: number) => Promise<{ value: ITermInfo[], skiptoken: string }>;
  getTermSetInfo: (termSetId: Guid) => Promise<ITermSetInfo | undefined>;
}

export function TaxonomyForm(props: ITaxonomyFormProps): React.ReactElement<ITaxonomyFormProps> {
  const groupedListRef = React.useRef<IGroupedList>();

  const [groupsLoading, setGroupsLoading] = React.useState<string[]>([]);
  const [groups, setGroups] = React.useState<IGroup[]>([]);


  React.useEffect(() => {
    setGroupsLoading((prevGroupsLoading) => [...prevGroupsLoading, props.termSetId.toString()]);

    props.getTermSetInfo(props.termSetId)
      .then((termSetInfo) => {
        const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' ? props.context.pageContext.cultureInfo.currentUICultureName : props.context.pageContext.web.languageName;

        const termSetName = termSetInfo.localizedNames.filter((name) => name.languageTag === languageTag)[0].name;
        const rootGroup: IGroup = { name: termSetName, key: termSetInfo.id, startIndex: -1, count: 50, level: 0, isCollapsed: false, data: { skiptoken: '' }, hasMoreData: false };
        setGroups([rootGroup]);
        props.onLoadMoreData(props.termSetId, Guid.empty, '', true)
          .then((terms) => {
            const grps: IGroup[] = terms.value.map(term => {
              const g: IGroup = {
                name: term.labels?.[0].name, // TODO: fix this by looking up correct language
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
            rootGroup.children = grps;
            rootGroup.data.skiptoken = terms.skiptoken;
            rootGroup.hasMoreData = terms.skiptoken !== '';
            setGroupsLoading((prevGroupsLoading) => prevGroupsLoading.filter((value) => value !== props.termSetId.toString()));
            setGroups([rootGroup]);
          });

      });
  }, []);

  const onToggleCollapse = (group: IGroup): void => {
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
          .then((terms) => {
            const grps: IGroup[] = terms.value.map(term => {
              const g: IGroup = {
                name: term.labels?.[0].name, // TODO: fix this by looking up correct language
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
            group.children = grps;
            group.data.skiptoken = terms.skiptoken;
            group.hasMoreData = terms.skiptoken !== '';
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

  const onChoiceChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
    props.setSelectedPanelOptions([{ key: option.key, name: option.text }]);
  };

  const onCheckboxChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean, tag?: ITag): void => {
    if (checked) {
      props.setSelectedPanelOptions((prevOptions) => [...prevOptions, tag]);
    }
    else {
      props.setSelectedPanelOptions((prevOptions) => prevOptions.filter((value) => value.key !== tag.key));
    }
  };

  const onRenderTitle = (groupHeaderProps: IGroupHeaderProps) => {
    if (groupHeaderProps.group.level === 0) {
      return (
        <Label>{groupHeaderProps.group.name}</Label>
      );
    }
    if (props.allowMultipleSelections) {
      const isSelected = props.selectedPanelOptions.some(value => value.key === groupHeaderProps.group.key);
      const selectedStyles: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles> = isSelected ? { label: { fontWeight: 'bold' } } : { label: { fontWeight: 'normal' } };

      return (
        <Checkbox
          key={groupHeaderProps.group.key}
          label={groupHeaderProps.group.name}
          onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) =>
            onCheckboxChange(ev, checked, { name: groupHeaderProps.group.name, key: groupHeaderProps.group.key })}
          checked={isSelected}
          styles={selectedStyles}
          disabled={groupHeaderProps.group.data.term.isAvailableForTagging.filter((t) => t.setId === props.termSetId.toString())[0].isAvailable === false}
          onRenderLabel={(p) => <span className={css(styles.checkbox, isSelected && styles.selectedCheckbox)} title={p.title}>
            {p.label}
          </span>}
        />
      );
    }
    else {
      const isSelected = props.selectedPanelOptions?.[0]?.key === groupHeaderProps.group.key;
      const selectedStyle: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles> = isSelected ? { choiceFieldWrapper: { fontWeight: 'bold' } } : { choiceFieldWrapper: { fontWeight: 'normal' } };
      const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>();

      const classNames = getClassNames(selectedStyle!, {
        theme: undefined,
        hasIcon: false,
        hasImage: false,
        checked: false,
        disabled: false,
        imageIsLarge: false,
        imageSize: undefined,
        focused: false,
      });
      const isDisabled = groupHeaderProps.group.data.term.isAvailableForTagging.filter((t) => t.setId === props.termSetId.toString())[0].isAvailable === false;
      const options: IChoiceGroupOption[] = [{ key: groupHeaderProps.group.key, text: groupHeaderProps.group.name, styles: selectedStyle, onRenderLabel: (p) => <Label htmlFor={p.id} className={classNames.field}><span id={p.labelId} className={css(styles.choiceOption, isSelected && styles.selectedChoiceOption)}>{p.text}</span></Label> }];
      return (
        <ChoiceGroup
          options={options}
          selectedKey={props.selectedPanelOptions?.[0]?.key}
          onChange={onChoiceChange}
          disabled={isDisabled}
        />
      );
    }
  };

  const onRenderHeader = (headerProps: IGroupHeaderProps): JSX.Element => {
    const headerCountStyle = { display: 'none' };
    const checkButtonStyle = { display: 'none' };
    const expandStyle = { visibility: 'hidden' };
    const groupHeaderStyles: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles> = {
      expand: !headerProps.group.children || headerProps.group.level === 0 ? expandStyle : null,
      expandIsCollapsed: !headerProps.group.children || headerProps.group.level === 0 ? expandStyle : null,
      check: checkButtonStyle,
      headerCount: headerCountStyle,
      groupHeaderContainer: { height: 36, paddingTop: 3, paddingBottom: 3, paddingLeft: 3, paddingRight: 3, alignItems: 'center', },
      root: { height: 42 }
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
            props.onLoadMoreData(props.termSetId, footerProps.group.key === props.termSetId.toString() ? Guid.empty : Guid.parse(footerProps.group.key), footerProps.group.data.skiptoken, true)
              .then((terms) => {
                const grps: IGroup[] = terms.value.map(term => {
                  const g: IGroup = {
                    name: term.labels?.[0].name, // TODO: fix this by looking up correct language
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
                footerProps.group.children = [...footerProps.group.children, ...grps];
                footerProps.group.data.skiptoken = terms.skiptoken;
                footerProps.group.hasMoreData = terms.skiptoken !== '';
                setGroupsLoading((prevGroupsLoading) => prevGroupsLoading.filter((value) => value !== footerProps.group.key));
              });
          }}
            styles={linkStyles}>
            Load more...
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

  const onPickerChange = (itms?: ITag[]): void => {
    props.setSelectedPanelOptions(itms || []);
  };

  const tagPickerStyles: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles> = { text: { borderStyle: 'none', borderWidth: '0px' } };

  return (
    <div className={styles.taxonomyForm}>
      <div className={styles.taxonomyTreeSelector}>
        <div>
          <TagPicker
            removeButtonAriaLabel="Remove"
            onResolveSuggestions={props.onResolveSuggestions}
            itemLimit={props.allowMultipleSelections ? undefined : 1}
            selectedItems={props.selectedPanelOptions}
            onChange={onPickerChange}
            getTextFromItem={getTagText}
            styles={tagPickerStyles}
            inputProps={{
              'aria-label': 'Tag Picker',
              placeholder: 'Ange en term som du vill tagga'
            }}
          />
        </div>
      </div>
      <Label className={styles.taxonomyTreeLabel}>Välj en tagg</Label>
      <div>
        <GroupedList
          componentRef={groupedListRef}
          items={[]}
          onRenderCell={null}
          groups={groups}
          groupProps={groupProps}
          onShouldVirtualize={(p: IListProps<any>) => false}
        />
      </div>
    </div>
  );
}


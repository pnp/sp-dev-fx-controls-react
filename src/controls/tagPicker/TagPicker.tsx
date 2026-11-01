import * as React from 'react';
import {
  Button,
  Field,
  FluentProvider,
  Tag,
  TagPicker as FluentTagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
  makeStyles,
  mergeClasses,
  tokens,
  useThemeClassName,
  webLightTheme,
  type TagPickerOnOpenChangeData,
  type TagPickerOnOptionSelectData,
  type Theme,
} from '@fluentui/react-components';
import { ChevronDownRegular, DismissRegular, SelectAllOnRegular } from '@fluentui/react-icons';
import * as controlStrings from 'ControlStrings';

import type {
  ITagPickerActionRenderContext,
  ITagPickerGroupDescriptor,
  ITagPickerHandle,
  ITagPickerOption,
  ITagPickerProps,
  ITagPickerStrings,
  TagPickerSelectionReason,
} from './ITagPicker';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  },
  control: {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    '--fui-TagPickerControl-aside-width': 'auto',
  },
  selectedGroup: {
    minWidth: 0,
    flexWrap: 'wrap',
  },
  selectedGroupScrollable: {
    overflowY: 'auto',
    alignContent: 'flex-start',
  },
  selectedTagContent: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  optionContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  optionSecondary: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  secondaryAction: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  noOptions: {
    color: tokens.colorNeutralForeground3,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
});

const DEFAULT_STRINGS: Required<ITagPickerStrings> = {
  placeholder: controlStrings.TagPickerPlaceholder,
  noOptionsText: controlStrings.TagPickerNoOptionsText,
  selectAllLabel: controlStrings.TagPickerSelectAllLabel,
  clearAllLabel: controlStrings.TagPickerClearAllLabel,
  selectedItemsAriaLabel: controlStrings.TagPickerSelectedValuesAriaLabel,
  selectionLimitReachedText: controlStrings.TagPickerSelectionLimitReachedText,
};
const DEFAULT_PASTE_DELIMITER = /[\n,;\t]+/;

interface IThemeBoundaryProps {
  theme?: Theme;
  children: React.ReactElement;
}

/**
 * Wraps the control in a FluentProvider only when a theme is supplied or no
 * ambient FluentProvider exists, so host themes are preserved.
 */
const TagPickerThemeBoundary = ({ theme, children }: IThemeBoundaryProps): React.ReactElement => {
  const ambientThemeClassName = useThemeClassName();

  if (!theme && ambientThemeClassName) {
    return children;
  }

  return (
    <FluentProvider theme={theme ?? webLightTheme} style={{ backgroundColor: 'transparent' }}>
      {children}
    </FluentProvider>
  );
};

const TagPickerInner = <TData,>(
  props: ITagPickerProps<TData>,
  ref: React.ForwardedRef<ITagPickerHandle>
): React.ReactElement => {
  const {
    options,
    groups,
    mode = 'multiple',
    selectedOptions,
    defaultSelectedOptions,
    onSelectionChange,
    theme,
    label,
    required,
    validationMessage,
    validationState,
    hint,
    fieldProps,
    strings,
    placeholder: placeholderProp,
    noOptionsText: noOptionsTextProp,
    selectAllLabel: selectAllLabelProp,
    clearAllLabel: clearAllLabelProp,
    selectedItemsAriaLabel: selectedItemsAriaLabelProp,
    selectionLimitReachedText: selectionLimitReachedTextProp,
    disabled = false,
    maxSelections,
    maxSelectedItemsHeight,
    clearable = true,
    enablePaste = true,
    pasteDelimiter = DEFAULT_PASTE_DELIMITER,
    allowFreeform = false,
    filterOption,
    renderOption,
    renderGroupHeader,
    renderTag,
    renderSelectAllButton,
    renderClearAllButton,
    renderSecondaryAction,
    renderExpandIcon,
    getPasteOption,
    onQueryChange,
    className,
    classNames,
    styles: styleOverrides,
    tagPickerProps,
    controlProps,
    inputProps,
    selectedGroupProps,
    listProps,
    optionGroupProps,
    optionProps,
  } = props;

  const styles = useStyles();
  // Individual string props win over the strings object, which wins over the English defaults.
  const placeholder = placeholderProp ?? strings?.placeholder ?? DEFAULT_STRINGS.placeholder;
  const noOptionsText = noOptionsTextProp ?? strings?.noOptionsText ?? DEFAULT_STRINGS.noOptionsText;
  const selectAllLabel = selectAllLabelProp ?? strings?.selectAllLabel ?? DEFAULT_STRINGS.selectAllLabel;
  const clearAllLabel = clearAllLabelProp ?? strings?.clearAllLabel ?? DEFAULT_STRINGS.clearAllLabel;
  const selectedItemsAriaLabel = selectedItemsAriaLabelProp ?? strings?.selectedItemsAriaLabel;
  const selectionLimitReachedText = selectionLimitReachedTextProp
    ?? strings?.selectionLimitReachedText
    ?? DEFAULT_STRINGS.selectionLimitReachedText;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = selectedOptions !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<string[]>(defaultSelectedOptions ?? []);
  const [query, setQuery] = React.useState('');
  const [internalOpen, setInternalOpen] = React.useState(Boolean(tagPickerProps?.defaultOpen));
  const [freeformOptions, setFreeformOptions] = React.useState<ITagPickerOption<TData>[]>([]);
  const activeSelected = isControlled ? selectedOptions : internalSelected;
  const activeOpen = tagPickerProps?.open ?? internalOpen;

  const allOptions = React.useMemo(() => {
    if (freeformOptions.length === 0) {
      return options;
    }
    const seen = new Set(options.map((option) => option.key));
    return [...options, ...freeformOptions.filter((option) => !seen.has(option.key))];
  }, [freeformOptions, options]);

  const optionMap = React.useMemo(() => {
    const map = new Map<string, ITagPickerOption<TData>>();
    allOptions.forEach((option) => map.set(option.key, option));
    return map;
  }, [allOptions]);

  const selectedKeySet = React.useMemo(() => new Set(activeSelected), [activeSelected]);

  const selectedItems = React.useMemo(
    () => activeSelected
      .map((key) => optionMap.get(key))
      .filter((option): option is ITagPickerOption<TData> => Boolean(option)),
    [activeSelected, optionMap]
  );

  const selectableOptions = React.useMemo(
    () => allOptions.filter((option) => !option.disabled),
    [allOptions]
  );

  const visibleOptions = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return selectableOptions.filter((option) => {
      if (selectedKeySet.has(option.key)) {
        return false;
      }
      if (filterOption) {
        return filterOption(option, query);
      }
      if (!normalizedQuery) {
        return true;
      }
      return `${option.text} ${option.secondaryText ?? ''}`.toLowerCase().includes(normalizedQuery);
    });
  }, [filterOption, query, selectableOptions, selectedKeySet]);

  const selectionCapped = typeof maxSelections === 'number' && activeSelected.length >= maxSelections;

  const updateQuery = React.useCallback((nextQuery: string): void => {
    setQuery(nextQuery);
    onQueryChange?.(nextQuery);
  }, [onQueryChange]);

  const commitSelection = React.useCallback((
    next: string[],
    reason: TagPickerSelectionReason,
    additionalOptions: ITagPickerOption<TData>[] = []
  ): void => {
    const deduped = Array.from(new Set(mode === 'single' ? next.slice(-1) : next));
    const capped = typeof maxSelections === 'number' ? deduped.slice(0, maxSelections) : deduped;
    const cappedSet = new Set(capped);
    const additionalMap = new Map(additionalOptions.map((option) => [option.key, option] as const));

    // Free-form options only live while they are selected.
    setFreeformOptions((prev) => {
      const kept = prev.filter((option) => cappedSet.has(option.key));
      const keptKeys = new Set(kept.map((option) => option.key));
      const added = additionalOptions.filter((option) => cappedSet.has(option.key) && !keptKeys.has(option.key));
      return kept.length === prev.length && added.length === 0 ? prev : [...kept, ...added];
    });

    const unchanged = capped.length === activeSelected.length
      && capped.every((key, index) => key === activeSelected[index]);
    if (unchanged) {
      return;
    }

    if (!isControlled) {
      setInternalSelected(capped);
    }

    onSelectionChange?.({
      selectedOptions: capped,
      selectedItems: capped
        .map((key) => additionalMap.get(key) ?? optionMap.get(key))
        .filter((option): option is ITagPickerOption<TData> => Boolean(option)),
      reason,
    });
  }, [activeSelected, isControlled, maxSelections, mode, onSelectionChange, optionMap]);

  const clearSelection = React.useCallback((): void => {
    commitSelection([], 'clear');
  }, [commitSelection]);

  const selectAll = React.useCallback((): void => {
    commitSelection(selectableOptions.map((option) => option.key), 'selectAll');
  }, [commitSelection, selectableOptions]);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: clearSelection,
    selectAll,
    setQuery: updateQuery,
  }), [clearSelection, selectAll, updateQuery]);

  const handleOptionSelect = React.useCallback(
    (_event: Event | React.SyntheticEvent<Element, Event>, data: TagPickerOnOptionSelectData): void => {
      commitSelection(data.selectedOptions, data.selectedOptions.length < activeSelected.length ? 'dismiss' : 'option');
      updateQuery('');
    },
    [activeSelected.length, commitSelection, updateQuery]
  );

  const onOpenChangeProp = tagPickerProps?.onOpenChange;
  const handleOpenChange = React.useCallback(
    (event: Event | React.SyntheticEvent<Element, Event>, data: TagPickerOnOpenChangeData): void => {
      setInternalOpen(data.open);
      onOpenChangeProp?.(event, data);
    },
    [onOpenChangeProp]
  );

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    updateQuery(event.currentTarget.value);
  }, [updateQuery]);

  const addPastedValues = React.useCallback((raw: string): void => {
    const values = raw.split(pasteDelimiter).map((part) => part.trim()).filter(Boolean);
    if (values.length === 0) {
      return;
    }

    const byKey = new Map<string, ITagPickerOption<TData>>();
    const byText = new Map<string, ITagPickerOption<TData>>();
    allOptions.forEach((option) => {
      byKey.set(option.key.toLowerCase(), option);
      const lowerText = option.text.toLowerCase();
      if (!byText.has(lowerText)) {
        byText.set(lowerText, option);
      }
    });

    const nextFreeform: ITagPickerOption<TData>[] = [];
    const nextKeys: string[] = [];
    const seenKeys = new Set<string>();

    values.forEach((value) => {
      const lowerValue = value.toLowerCase();
      const existing = byKey.get(lowerValue) ?? byText.get(lowerValue);
      if (existing) {
        if (!seenKeys.has(existing.key)) {
          seenKeys.add(existing.key);
          nextKeys.push(existing.key);
        }
        return;
      }

      if (!allowFreeform) {
        return;
      }

      const created = getPasteOption?.(value) ?? { key: value, text: value };
      if (seenKeys.has(created.key)) {
        return;
      }
      seenKeys.add(created.key);
      nextKeys.push(created.key);
      if (optionMap.has(created.key)) {
        // getPasteOption resolved to an existing option; select it instead of creating a duplicate.
        return;
      }
      // Register the new option so later duplicates in the same paste resolve to it.
      byKey.set(created.key.toLowerCase(), created);
      if (!byText.has(created.text.toLowerCase())) {
        byText.set(created.text.toLowerCase(), created);
      }
      nextFreeform.push(created);
    });

    if (nextKeys.length > 0) {
      commitSelection([...activeSelected, ...nextKeys], 'paste', nextFreeform);
    }
  }, [activeSelected, allOptions, allowFreeform, commitSelection, getPasteOption, optionMap, pasteDelimiter]);

  const handlePaste = React.useCallback((event: React.ClipboardEvent<HTMLInputElement>): void => {
    if (!enablePaste || disabled || (mode === 'multiple' && selectionCapped)) {
      return;
    }
    const text = event.clipboardData.getData('text');
    if (!text) {
      return;
    }
    event.preventDefault();
    addPastedValues(text);
    updateQuery('');
  }, [addPastedValues, disabled, enablePaste, mode, selectionCapped, updateQuery]);

  const renderOptionNode = React.useCallback((option: ITagPickerOption<TData>): React.ReactElement => (
    <TagPickerOption
      {...optionProps}
      key={option.key}
      value={option.key}
      text={option.text}
      media={option.media ? { children: option.media } : undefined}
      className={mergeClasses(optionProps?.className, classNames?.option)}
      style={{ ...optionProps?.style, ...styleOverrides?.option }}
    >
      {renderOption ? renderOption(option) : (
        <div className={mergeClasses(styles.optionContent, classNames?.optionContent)} style={styleOverrides?.optionContent}>
          <span>{option.text}</span>
          {option.secondaryText && (
            <span className={mergeClasses(styles.optionSecondary, classNames?.optionSecondary)} style={styleOverrides?.optionSecondary}>
              {option.secondaryText}
            </span>
          )}
        </div>
      )}
    </TagPickerOption>
  ), [
    classNames?.option,
    classNames?.optionContent,
    classNames?.optionSecondary,
    optionProps,
    renderOption,
    styleOverrides?.option,
    styleOverrides?.optionContent,
    styleOverrides?.optionSecondary,
    styles.optionContent,
    styles.optionSecondary,
  ]);

  const groupedOptionNodes = React.useMemo((): React.ReactNode[] => {
    if (!groups?.length) {
      return visibleOptions.map(renderOptionNode);
    }

    const optionsByGroup = new Map<string, ITagPickerOption<TData>[]>();
    groups.forEach((group) => optionsByGroup.set(group.key, []));
    const ungrouped: ITagPickerOption<TData>[] = [];

    visibleOptions.forEach((option) => {
      const bucket = option.groupKey ? optionsByGroup.get(option.groupKey) : undefined;
      if (bucket) {
        bucket.push(option);
      } else {
        ungrouped.push(option);
      }
    });

    const rendered: React.ReactNode[] = [];
    groups.forEach((group: ITagPickerGroupDescriptor) => {
      const groupOptions = optionsByGroup.get(group.key);
      if (!groupOptions || groupOptions.length === 0) {
        return;
      }
      rendered.push(
        <TagPickerOptionGroup
          {...optionGroupProps}
          key={group.key}
          label={{ children: renderGroupHeader ? renderGroupHeader(group) : group.label }}
          className={mergeClasses(optionGroupProps?.className, classNames?.optionGroup)}
          style={{ ...optionGroupProps?.style, ...styleOverrides?.optionGroup }}
        >
          {groupOptions.map(renderOptionNode)}
        </TagPickerOptionGroup>
      );
    });

    return ungrouped.length > 0 ? [...rendered, ...ungrouped.map(renderOptionNode)] : rendered;
  }, [classNames?.optionGroup, groups, optionGroupProps, renderGroupHeader, renderOptionNode, styleOverrides?.optionGroup, visibleOptions]);

  const isMultiple = mode === 'multiple';
  const limitReached = isMultiple && selectionCapped;
  let listPlaceholderText: string | undefined;
  if (limitReached) {
    listPlaceholderText = selectionLimitReachedText;
  } else if (visibleOptions.length === 0) {
    listPlaceholderText = noOptionsText;
  }
  const canSelectAll = isMultiple
    && !disabled
    && !selectionCapped
    && selectableOptions.some((option) => !selectedKeySet.has(option.key));
  const canClear = isMultiple && clearable && !disabled && activeSelected.length > 0;
  const actionContext: ITagPickerActionRenderContext<TData> = {
    selectedOptions: activeSelected,
    selectedItems,
    canSelectAll,
    canClear,
    selectAll,
    clear: clearSelection,
  };
  const { secondaryAction: controlSecondaryAction, expandIcon: controlExpandIcon, ...restControlProps } = controlProps ?? {};

  let defaultSecondaryAction: React.ReactNode = null;
  if (isMultiple && activeSelected.length > 0) {
    defaultSecondaryAction = renderClearAllButton?.(actionContext) ?? (
      <Button
        size="small"
        appearance="subtle"
        icon={<DismissRegular />}
        disabled={!canClear}
        aria-label={clearAllLabel}
        title={clearAllLabel}
        className={classNames?.clearAllButton}
        style={styleOverrides?.clearAllButton}
        onClick={clearSelection}
      />
    );
  } else if (isMultiple) {
    defaultSecondaryAction = renderSelectAllButton?.(actionContext) ?? (
      <Button
        size="small"
        appearance="subtle"
        icon={<SelectAllOnRegular />}
        disabled={!canSelectAll}
        aria-label={selectAllLabel}
        title={selectAllLabel}
        className={classNames?.selectAllButton}
        style={styleOverrides?.selectAllButton}
        onClick={selectAll}
      />
    );
  }

  const renderedSecondaryAction = renderSecondaryAction
    ? renderSecondaryAction(actionContext)
    : defaultSecondaryAction;
  const renderedExpandIcon = renderExpandIcon ? renderExpandIcon({ open: activeOpen, disabled }) : <ChevronDownRegular />;
  const hasSelectedGroupScroll = maxSelectedItemsHeight !== undefined;
  const selectedGroupScrollStyle: React.CSSProperties | undefined = hasSelectedGroupScroll ? {
    maxHeight: typeof maxSelectedItemsHeight === 'number' ? `${maxSelectedItemsHeight}px` : maxSelectedItemsHeight,
    overflowY: 'auto',
  } : undefined;
  const customizesExpandIcon = Boolean(renderExpandIcon || classNames?.expandIcon || styleOverrides?.expandIcon);
  // Only spread slot props objects; a React element passed as shorthand must not be spread.
  const controlExpandIconProps = typeof controlExpandIcon === 'object'
    && controlExpandIcon !== null
    && !React.isValidElement(controlExpandIcon)
    ? controlExpandIcon
    : undefined;
  const expandIcon = customizesExpandIcon ? {
    ...controlExpandIconProps,
    children: (
      <span className={classNames?.expandIcon} style={styleOverrides?.expandIcon}>
        {renderedExpandIcon}
      </span>
    ),
  } : controlExpandIcon;
  const secondaryAction = renderedSecondaryAction ? {
    children: (
      <span className={mergeClasses(styles.secondaryAction, classNames?.secondaryAction)} style={styleOverrides?.secondaryAction}>
        {renderedSecondaryAction}
      </span>
    ),
  } : controlSecondaryAction;
  const resolvedSelectedItemsAriaLabel = selectedItemsAriaLabel
    ?? (typeof label === 'string' ? `${label} ${DEFAULT_STRINGS.selectedItemsAriaLabel.toLowerCase()}` : DEFAULT_STRINGS.selectedItemsAriaLabel);

  return (
    <TagPickerThemeBoundary theme={theme}>
      <div className={mergeClasses(styles.root, className, classNames?.root)} style={styleOverrides?.root}>
        <Field
          {...fieldProps}
          label={label}
          required={required}
          validationMessage={validationMessage}
          validationState={validationState}
          hint={hint}
          className={mergeClasses(fieldProps?.className, classNames?.field)}
          style={{ ...fieldProps?.style, ...styleOverrides?.field }}
        >
          <FluentTagPicker
            {...tagPickerProps}
            disabled={disabled}
            selectedOptions={activeSelected}
            onOptionSelect={handleOptionSelect}
            onOpenChange={handleOpenChange}
          >
            <TagPickerControl
              {...restControlProps}
              expandIcon={expandIcon}
              secondaryAction={secondaryAction}
              className={mergeClasses(styles.control, restControlProps.className, classNames?.control)}
              style={{ ...restControlProps.style, ...styleOverrides?.control }}
            >
              <TagPickerGroup
                {...selectedGroupProps}
                aria-label={resolvedSelectedItemsAriaLabel}
                className={mergeClasses(
                  styles.selectedGroup,
                  hasSelectedGroupScroll && styles.selectedGroupScrollable,
                  selectedGroupProps?.className,
                  classNames?.selectedGroup
                )}
                style={{ ...selectedGroupProps?.style, ...styleOverrides?.selectedGroup, ...selectedGroupScrollStyle }}
              >
                {selectedItems.map((option) => (
                  <Tag
                    key={option.key}
                    value={option.key}
                    dismissible={!disabled}
                    className={classNames?.selectedTag}
                    style={styleOverrides?.selectedTag}
                    media={option.media ? { children: option.media } : undefined}
                  >
                    <span className={mergeClasses(styles.selectedTagContent, classNames?.selectedTagContent)} style={styleOverrides?.selectedTagContent}>
                      {renderTag ? renderTag(option) : option.text}
                    </span>
                  </Tag>
                ))}
              </TagPickerGroup>
              <TagPickerInput
                {...inputProps}
                ref={inputRef}
                disabled={disabled}
                // readOnly (not disabled) keeps focus and tag keyboard navigation available when the limit is reached.
                readOnly={inputProps?.readOnly || limitReached}
                value={query}
                placeholder={mode === 'single' && selectedItems.length > 0 ? '' : placeholder}
                onChange={handleInputChange}
                onPaste={handlePaste}
                className={mergeClasses(inputProps?.className, classNames?.input)}
                style={{ ...inputProps?.style, ...styleOverrides?.input }}
              />
            </TagPickerControl>

            <TagPickerList
              {...listProps}
              className={mergeClasses(listProps?.className, classNames?.list)}
              style={{ ...listProps?.style, ...styleOverrides?.list }}
            >
              {listPlaceholderText ? (
                // Non-interactive listbox child: Fluent only navigates elements carrying the fui-Option class.
                <div
                  role="option"
                  aria-disabled="true"
                  aria-selected={false}
                  className={mergeClasses(styles.noOptions, classNames?.noOptions)}
                  style={styleOverrides?.noOptions}
                >
                  {listPlaceholderText}
                </div>
              ) : groupedOptionNodes}
            </TagPickerList>
          </FluentTagPicker>
        </Field>
      </div>
    </TagPickerThemeBoundary>
  );
};

export const TagPicker = React.forwardRef(TagPickerInner) as <TData = unknown>(
  props: ITagPickerProps<TData> & React.RefAttributes<ITagPickerHandle>
) => React.ReactElement;

(TagPicker as { displayName?: string }).displayName = 'TagPicker';

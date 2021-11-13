import { ITermInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';
import { IBasePickerProps } from 'office-ui-fabric-react/lib/components/pickers/BasePicker.types';
import { IPickerItemProps } from 'office-ui-fabric-react/lib/components/pickers/PickerItem.types';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IModernTermPickerProps extends IBasePickerProps<ITermInfo> {
  themeVariant?: IReadonlyTheme;
}

export interface ITermItemProps extends IPickerItemProps<ITermInfo> {
  /** Additional CSS class(es) to apply to the TermItem root element. */
  className?: string;

  enableTermFocusInDisabledPicker?: boolean;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<ITermItemStyleProps, ITermItemStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
  termStoreInfo: ITermStoreInfo;
  languageTag: string;
}

export type ITermItemStyleProps = Required<Pick<ITermItemProps, 'theme'>> &
  Pick<ITermItemProps, 'className' | 'selected' | 'disabled'> & {};

export interface ITermItemStyles {
  /** Root element of picked TermItem */
  root: IStyle;

  /** Refers to the text element of the TermItem already picked. */
  text: IStyle;

  /** Refers to the cancel action button on a picked TermItem. */
  close: IStyle;
}

export interface ITermItemSuggestionElementProps extends React.AllHTMLAttributes<HTMLElement> {
  /** Additional CSS class(es) to apply to the TermItemSuggestion div element */
  className?: string;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<ITermItemSuggestionStyleProps, ITermItemSuggestionStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

export type ITermItemSuggestionStyleProps = Required<Pick<ITermItemSuggestionElementProps, 'theme'>> &
  Pick<ITermItemSuggestionElementProps, 'className'> & {};

export interface ITermItemSuggestionStyles {
  /** Refers to the text element of the TermItemSuggestion */
  suggestionTextOverflow?: IStyle;
}

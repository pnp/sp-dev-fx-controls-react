import { IComboBoxOptionStyles, IComboBoxStyles } from "@fluentui/react/lib/ComboBox";
import { IAutofillProps } from "@fluentui/react/lib/Autofill";
import { IKeytipProps } from "@fluentui/react/lib/Keytip";
import { SPHttpClient } from '@microsoft/sp-http';
export interface IComboBoxListItemPickerProps {
    autoComplete?: "on" | "off";
    autofill?: IAutofillProps;
    comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;
    allowFreeform?: boolean;
    /**
     * @deprecated
     */
    keytipProps?: IKeytipProps;
    multiSelect?: boolean;
    onMenuDismiss?: () => void;
    onMenuOpen?: () => void;
    text?: string;
    columnInternalName: string;
    keyColumnInternalName?: string;
    webUrl: string;
    spHttpClient: SPHttpClient;
    listId: string;
    itemLimit?: number;
    filter?: string;
    className?: string;
    defaultSelectedItems?: any[];
    disabled?: boolean;
    suggestionsHeaderText?: string;
    noResultsFoundText?: string;
    onInitialized?: () => void;
    onSelectedItem: (item: any) => void;
    label?: string;
    orderBy?: string;
    styles?: IComboBoxStyles;
}
//# sourceMappingURL=IComboBoxListItemPickerProps.d.ts.map
import { IComboBoxOptionStyles, IComboBoxStyles } from "@fluentui/react/lib/components/ComboBox";

import { IAutofillProps } from "@fluentui/react/lib/components/Autofill";
import { IKeytipProps } from "@fluentui/react/lib/components/Keytip";
import { SPHttpClient } from '@microsoft/sp-http';

export interface IComboBoxListItemPickerProps {
    ///onItemClick?:(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void
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
    defaultSelectedItems?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    disabled?: boolean;
    suggestionsHeaderText?: string;
    noResultsFoundText?: string;
    onInitialized?: () => void;
    onSelectedItem: (item: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    label?: string;
    orderBy?:string;
    styles?: IComboBoxStyles;
}

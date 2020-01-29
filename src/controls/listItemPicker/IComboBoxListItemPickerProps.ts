import { IComboBox, IComboBoxOption, IComboBoxOptionStyles } from "office-ui-fabric-react/lib/components/ComboBox";
import { IAutofillProps } from "office-ui-fabric-react/lib/components/Autofill";
import { IKeytipProps } from "office-ui-fabric-react/lib/components/Keytip";
import { RequestClient } from "@pnp/common/src/netutil";

export interface IComboBoxListItemPickerProps {
    ///onItemClick?:(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void
    autoComplete?: "on" | "off";
    autofill?: IAutofillProps;
    comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;
    allowFreeform?: boolean;
    keytipProps?: IKeytipProps;
    multiSelect?: boolean;
    onMenuDismiss?: () => void;
    onMenuOpen?: () => void;
    text?: string;
    columnInternalName: string;
    keyColumnInternalName?: string;
    webUrl: string;
    spHttpClient: RequestClient;
    listId: string;
    itemLimit: number;
    filter?: string;
    className?: string;
    defaultSelectedItems?: any[];
    disabled?: boolean;
    suggestionsHeaderText?: string;
    noResultsFoundText?: string;
    onInitialized?: () => void;

    onSelectedItem: (item: any) => void;
}
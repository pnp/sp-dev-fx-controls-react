import { ExtensionContext } from '@microsoft/sp-extension-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDynamicFormProps {
    context: WebPartContext | ExtensionContext;
    disabled?: boolean;
    listId: string;
    onSubmitted?: (ListItem: any) => void;
    onCancelled?: () => void;
    listItemId?: number;
    contentTypeId?: string;
}

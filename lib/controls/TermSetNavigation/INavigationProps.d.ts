import { IContextualMenuItem } from '@fluentui/react';
import { ITheme } from '@fluentui/react/lib/Styling';
import { TermStore } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext, IReadonlyTheme } from '@microsoft/sp-component-base';
export interface INavigationProps {
    context: BaseComponentContext;
    themeVariant: IReadonlyTheme | ITheme;
    termSetId: string;
    showContextMenu: boolean;
    contextMenuItems?: IContextualMenuItem[];
    onSelected?: (term: TermStore.Term) => void;
    onSelectedTermAction?: (term: TermStore.Term, option: string) => void;
}
//# sourceMappingURL=INavigationProps.d.ts.map
import * as Adaptive from "adaptivecards";
import { BaseSubmitActionPeer, PropertySheet, PropertySheetCategory, StringPropertyEditor, TypedActionPeer } from "adaptivecards-designer/lib/designer-peers";
import { FluentUIExecuteAction, FluentUIOpenUrlAction, FluentUIShowCardAction, FluentUISubmitAction, FluentUIToggleVisibilityAction } from "../../../adaptiveCardHost/fluentUI/Actions";

export class SubmitActionPeer extends BaseSubmitActionPeer<FluentUISubmitAction> {
}

export class ExecuteActionPeer extends BaseSubmitActionPeer<FluentUIExecuteAction> {
    public static readonly verbProperty = new StringPropertyEditor(Adaptive.Versions.v1_4, "verb", "Verb");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(defaultCategory, ExecuteActionPeer.verbProperty);
    }
}

export class OpenUrlActionPeer extends TypedActionPeer<FluentUIOpenUrlAction> {
    public static readonly urlProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "url", "Url");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            OpenUrlActionPeer.urlProperty);
    }
}

export class ShowCardActionPeer extends TypedActionPeer<FluentUIShowCardAction> {
    protected getToolTip(): string {
        return "Double click to open/close";
    }
}

export class ToggleVisibilityActionPeer extends TypedActionPeer<FluentUIToggleVisibilityAction> {
}

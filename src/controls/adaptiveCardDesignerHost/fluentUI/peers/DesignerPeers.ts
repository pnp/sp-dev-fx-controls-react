import { ActionPeerType, CardDesignerSurface, CardElementPeerType } from "adaptivecards-designer/lib/card-designer-surface";
import { ExecuteActionPeer, OpenUrlActionPeer, ShowCardActionPeer, SubmitActionPeer, ToggleVisibilityActionPeer } from "adaptivecards-designer/lib/designer-peers";
import { FluentUIExecuteAction, FluentUIOpenUrlAction, FluentUIShowCardAction, FluentUISubmitAction, FluentUIToggleVisibilityAction } from "../../../adaptiveCardHost/fluentUI/Actions";
import { FluentUIChoiceSetInput, FluentUIDateInput, FluentUINumberInput, FluentUITextInput, FluentUITimeInput, FluentUIToggleInput } from "../../../adaptiveCardHost/fluentUI/Elements";
import { ChoiceSetInputPeer, DateInputPeer, NumberInputPeer, TextInputPeer, TimeInputPeer, ToggleInputPeer } from "./InputPeers";
import { DesignerPeerCategory } from "./Shared";

export function initializeDesignerPeers(): void {
    //https://github.com/microsoft/AdaptiveCards/blob/87e44941433326a9238de2161124fc246f12a1b6/source/nodejs/adaptivecards-designer/src/card-designer-surface.ts
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUITextInput, TextInputPeer as unknown as CardElementPeerType, DesignerPeerCategory.Inputs, "acd-icon-inputText");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUINumberInput, NumberInputPeer as unknown as CardElementPeerType, DesignerPeerCategory.Inputs, "acd-icon-inputNumber");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUITimeInput, TimeInputPeer as unknown as CardElementPeerType, DesignerPeerCategory.Inputs, "acd-icon-inputTime");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUIDateInput, DateInputPeer as unknown as CardElementPeerType, DesignerPeerCategory.Inputs, "acd-icon-inputDate");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUIToggleInput, ToggleInputPeer as unknown as CardElementPeerType, DesignerPeerCategory.Inputs, "acd-icon-inputToggle");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUIChoiceSetInput, ChoiceSetInputPeer as unknown as CardElementPeerType, DesignerPeerCategory.Inputs, "acd-icon-inputChoiceSet");

    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUISubmitAction, SubmitActionPeer as unknown as ActionPeerType, DesignerPeerCategory.Actions, "acd-icon-actionSubmit");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIOpenUrlAction, OpenUrlActionPeer as unknown as ActionPeerType, DesignerPeerCategory.Actions, "acd-icon-actionOpenUrl");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIShowCardAction, ShowCardActionPeer as unknown as ActionPeerType, DesignerPeerCategory.Actions, "acd-icon-actionShowCard");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIToggleVisibilityAction, ToggleVisibilityActionPeer as unknown as ActionPeerType, DesignerPeerCategory.Actions, "acd-icon-actionToggleVisibility");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIExecuteAction, ExecuteActionPeer as unknown as ActionPeerType, DesignerPeerCategory.Actions, "acd-icon-actionSubmit");
}

import { CardDesignerSurface } from "adaptivecards-designer/lib/card-designer-surface";
import { ExecuteActionPeer, OpenUrlActionPeer, ShowCardActionPeer, SubmitActionPeer, ToggleVisibilityActionPeer } from "adaptivecards-designer/lib/designer-peers";
import { FluentUIExecuteAction, FluentUIOpenUrlAction, FluentUIShowCardAction, FluentUISubmitAction, FluentUIToggleVisibilityAction } from "../../../adaptiveCardHost/fluentUI/Actions";
import { FluentUIChoiceSetInput, FluentUIDateInput, FluentUINumberInput, FluentUITextInput, FluentUITimeInput, FluentUIToggleInput } from "../../../adaptiveCardHost/fluentUI/Elements";
import { ChoiceSetInputPeer, DateInputPeer, NumberInputPeer, TextInputPeer, TimeInputPeer, ToggleInputPeer } from "./InputPeers";
import { DesignerPeerCategory } from "./Shared";
export function initializeDesignerPeers() {
    //https://github.com/microsoft/AdaptiveCards/blob/87e44941433326a9238de2161124fc246f12a1b6/source/nodejs/adaptivecards-designer/src/card-designer-surface.ts
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUITextInput, TextInputPeer, DesignerPeerCategory.Inputs, "acd-icon-inputText");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUINumberInput, NumberInputPeer, DesignerPeerCategory.Inputs, "acd-icon-inputNumber");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUITimeInput, TimeInputPeer, DesignerPeerCategory.Inputs, "acd-icon-inputTime");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUIDateInput, DateInputPeer, DesignerPeerCategory.Inputs, "acd-icon-inputDate");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUIToggleInput, ToggleInputPeer, DesignerPeerCategory.Inputs, "acd-icon-inputToggle");
    CardDesignerSurface.cardElementPeerRegistry.registerPeer(FluentUIChoiceSetInput, ChoiceSetInputPeer, DesignerPeerCategory.Inputs, "acd-icon-inputChoiceSet");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUISubmitAction, SubmitActionPeer, DesignerPeerCategory.Actions, "acd-icon-actionSubmit");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIOpenUrlAction, OpenUrlActionPeer, DesignerPeerCategory.Actions, "acd-icon-actionOpenUrl");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIShowCardAction, ShowCardActionPeer, DesignerPeerCategory.Actions, "acd-icon-actionShowCard");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIToggleVisibilityAction, ToggleVisibilityActionPeer, DesignerPeerCategory.Actions, "acd-icon-actionToggleVisibility");
    CardDesignerSurface.actionPeerRegistry.registerPeer(FluentUIExecuteAction, ExecuteActionPeer, DesignerPeerCategory.Actions, "acd-icon-actionSubmit");
}
//# sourceMappingURL=DesignerPeers.js.map
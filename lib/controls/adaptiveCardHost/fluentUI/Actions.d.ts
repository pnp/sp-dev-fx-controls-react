import { Action, ExecuteAction, OpenUrlAction, ShowCardAction, SubmitAction, ToggleVisibilityAction } from "adaptivecards/lib/card-elements";
import { CardObjectRegistry } from "adaptivecards/lib/registry";
export declare class FluentUIExecuteAction extends ExecuteAction {
    protected updateCssClasses(): void;
    private actionClickHandler;
    render(baseCssClass?: string): void;
}
export declare class FluentUIOpenUrlAction extends OpenUrlAction {
    protected updateCssClasses(): void;
    private actionClickHandler;
    render(baseCssClass?: string): void;
}
export declare class FluentUIShowCardAction extends ShowCardAction {
    protected updateCssClasses(): void;
    private actionClickHandler;
    render(baseCssClass?: string): void;
}
export declare class FluentUISubmitAction extends SubmitAction {
    protected updateCssClasses(): void;
    private actionClickHandler;
    render(baseCssClass?: string): void;
}
export declare class FluentUIToggleVisibilityAction extends ToggleVisibilityAction {
    protected updateCssClasses(): void;
    private actionClickHandler;
    render(baseCssClass?: string): void;
}
export declare function registerFluentUIActions(registry: CardObjectRegistry<Action>): void;
//# sourceMappingURL=Actions.d.ts.map
import { BaseFormCustomizer } from '@microsoft/sp-listview-extensibility';
/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITestFormCustomizerProperties {
    sampleText?: string;
}
export default class TestFormCustomizer extends BaseFormCustomizer<ITestFormCustomizerProperties> {
    onInit(): Promise<void>;
    render(): void;
    onDispose(): void;
    private _onSave;
    private _onClose;
}
//# sourceMappingURL=TestFormCustomizer.d.ts.map
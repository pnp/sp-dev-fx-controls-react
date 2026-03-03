import { BaseFieldCustomizer, IFieldCustomizerCellEventParameters } from '@microsoft/sp-listview-extensibility';
/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IOotbFieldsFieldCustomizerProperties {
}
export default class OotbFieldsFieldCustomizer extends BaseFieldCustomizer<IOotbFieldsFieldCustomizerProperties> {
    private _shouldRenderUndefiend;
    onInit(): Promise<void>;
    onRenderCell(event: IFieldCustomizerCellEventParameters): void;
    onDisposeCell(event: IFieldCustomizerCellEventParameters): void;
}
//# sourceMappingURL=OotbFieldsFieldCustomizer.d.ts.map
import { ListItemAccessor } from '@microsoft/sp-listview-extensibility';
import { IContext } from '../Interfaces';
import { IFieldRendererProps } from '../../controls/fields/fieldCommon/IFieldRendererProps';
/**
 * Field Renderer Helper.
 * Helps to render fields similarly to OOTB SharePoint rendering
 */
export declare class FieldRendererHelper {
    /**
     * Returns JSX.Element with OOTB rendering and applied additional props
     * @param fieldValue Value of the field
     * @param props IFieldRendererProps (CSS classes and CSS styles)
     * @param listItem Current list item
     * @param context Customizer context
     */
    static getFieldRenderer(fieldValue: any, props: IFieldRendererProps, listItem: ListItemAccessor, context: IContext): Promise<JSX.Element>;
}
//# sourceMappingURL=FieldRendererHelper.d.ts.map
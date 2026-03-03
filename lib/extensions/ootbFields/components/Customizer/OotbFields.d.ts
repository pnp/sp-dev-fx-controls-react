import * as React from 'react';
import { ListItemAccessor } from '@microsoft/sp-listview-extensibility';
import { IProps } from '../../../../common/Interfaces';
import { IFieldRendererProps } from '../../../../controls/fields/fieldCommon/IFieldRendererProps';
export interface IOotbFieldsProps extends IProps, IFieldRendererProps {
    text: string;
    value: any;
    listItem: ListItemAccessor;
    fieldName: string;
}
export interface IOotbFieldsState {
    fieldRenderer?: JSX.Element;
}
/**
 * Field Customizer control to test fields' controls
 */
export default class OotbFields extends React.Component<IOotbFieldsProps, IOotbFieldsState> {
    constructor(props: IOotbFieldsProps, state: IOotbFieldsState);
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<{}>;
}
//# sourceMappingURL=OotbFields.d.ts.map
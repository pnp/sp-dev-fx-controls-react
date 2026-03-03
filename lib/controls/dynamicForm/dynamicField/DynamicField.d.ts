import '@pnp/sp/folders';
import '@pnp/sp/webs';
import * as React from 'react';
import { IDynamicFieldProps } from './IDynamicFieldProps';
import { IDynamicFieldState } from './IDynamicFieldState';
export declare class DynamicFieldBase extends React.Component<IDynamicFieldProps, IDynamicFieldState> {
    constructor(props: IDynamicFieldProps);
    private _classNames;
    render(): JSX.Element;
    private getFieldComponent;
    private onDeleteImage;
    private onURLChange;
    private onChange;
    private onBlur;
    private getRequiredErrorText;
    private getNumberErrorText;
    private isEmptyArray;
    private checkUserArrayIsEmpty;
    private MultiChoice_selection;
    private saveIntoSharePoint;
}
export declare const DynamicField: React.FunctionComponent<IDynamicFieldProps>;
//# sourceMappingURL=DynamicField.d.ts.map
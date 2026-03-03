import * as React from 'react';
import { IIconPickerProps } from './IIconPickerProps';
import { IIconPickerState } from './IIconPickerState';
export declare class IconPicker extends React.Component<IIconPickerProps, IIconPickerState> {
    private radioIdBase;
    private readonly _fluentIconsService;
    constructor(props: IIconPickerProps);
    render(): React.ReactElement<IIconPickerProps>;
    private closePanel;
    private iconPickerOnClick;
    private iconOnClick;
    private onAbort;
    private onChange;
    private confirmSelection;
    private renderPanelNav;
    private renderPanelContent;
    private renderPanelFooter;
    private renderIcons;
    private renderIcon;
}
//# sourceMappingURL=IconPicker.d.ts.map
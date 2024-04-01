import * as React from 'react';
import { ValidControls } from '../../IControlsTestWebPartProps';
import { TextField, Toggle } from '@fluentui/react';

export interface IControlTogglesProps {
    label: string;
    onChange: (controlName: string, enabled: boolean) => void;
    controlVisibility: {
        [K in ValidControls]: boolean;
    };
}

export interface IControlTogglesState {
    filter: string;
}

export class ControlToggles extends React.Component<IControlTogglesProps, IControlTogglesState> {
    private selectedKey: React.ReactText;

    constructor(props: IControlTogglesProps, state: IControlTogglesState) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                <TextField label="Search" placeholder="Search Controls" onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                    this.setState({ filter: newValue });
                }} />
                { this.getValidControls().map((control: string) => {
                    if (this.state && this.state.filter && this.state.filter.length > 0 && control.toLowerCase().indexOf(this.state.filter.toLowerCase()) === -1) {
                        return null;
                    }
                    return (
                        <Toggle 
                            key={control} 
                            label={this.getProperCase(control)} 
                            checked={this.props.controlVisibility && this.props.controlVisibility[control] || false}
                            onChange={(e, checked) => {
                                this.props.onChange(control, checked);
                            }} 
                        />
                    );
                }) }
            </div>
        );
    }

    private getValidControls(): string[] {
        const validControls: ValidControls[] = [
            "all", 
            "accessibleAccordion", "adaptiveCardDesignerHost", "adaptiveCardHost", 
            "animatedDialog", "Carousel", "ChartControl", 
            "ComboBoxListItemPicker", "Dashboard", "DateTimePicker", 
            "DragDropFiles", "DynamicForm", "EnhancedThemeProvider", 
            "FieldCollectionData", "FieldPicker", "FilePicker", 
            "FileTypeIcon", "FolderExplorer", "FolderPicker",
            "GridLayout", "IconPicker", "IFrameDialog",
            "IFramePanel", "ListPicker", "ListItemPicker",
            "ListItemComments", "ViewPicker", "ListView",
            "LocationPicker", "Map", "ModernAudio",
            "ModernTaxonomyPicker", "Pagination", "PeoplePicker",
            "Placeholder", "Progress", "RichText",
            "SecurityTrimmedControl", "SiteBreadcrumb", "SitePicker",
            "TaxonomyPicker", "TaxonomyTree", "Teams",
            "TestControl", "Toolbar", "TreeView",
            "UploadFiles", "VariantThemeProvider", "WebPartTitle"
        ];
        return validControls as string[];
    }

    private getProperCase(name: string): string {
        name = name.replace(/([A-Z])/g, ' $1');
        name = name.replace(/^([a-z])/, (match, p1) => p1.toUpperCase());
        return name;
    }
}
import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';
import { Spinner } from '@fluentui/react/lib/components/Spinner';
import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISPList } from '../../../../common/SPEntities';

export interface IListPickerProps {
    label: string;
    wpContext: WebPartContext;
    onChange: (option: IDropdownOption) => void;
    selectedKey: string | number;
    disabled: boolean;
   // stateKey: string;
}

export interface IListPickerState {
    loading: boolean;
    options: IDropdownOption[];
    error: string;
}

export class ListPicker extends React.Component<IListPickerProps, IListPickerState> {
    private selectedKey: React.ReactText;

    constructor(props: IListPickerProps, state: IListPickerState) {
        super(props);
        this.selectedKey = props.selectedKey;

        this.state = {
            loading: false,
            options: undefined,
            error: undefined
        };
    }

    public componentDidMount(): void {
        this.loadOptions();
    }

    public componentDidUpdate(prevProps: IListPickerProps, prevState: IListPickerState): void {
        if (this.props.disabled !== prevProps.disabled 
            // ||
            // this.props.stateKey !== prevProps.stateKey
            ) {
            this.loadOptions();
        }
    }

    private loadOptions(): void {
        this.setState({
            loading: true,
            error: undefined,
            options: undefined
        });
        let options: IDropdownOption[] = [];

        this.props.wpContext.spHttpClient.get(
            `${this.props.wpContext.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`, 
            SPHttpClient.configurations.v1
        ).then(async (response) => { 
            if (response.ok) {
                const lists = await response.json();
                options = lists.value.map((list: ISPList) => {
                    return {
                        key: list.Id,
                        text: list.Title
                    };
                });
                this.setState({
                    loading: false,
                    error: undefined,
                    options: options
                });
            } 
        }).catch((error) => {
            this.setState({
                loading: false,
                error: error.statusText,
                options: undefined
            });
        });
    }

    public render(): JSX.Element {
        const loading: JSX.Element = this.state.loading ? <div><Spinner label={'Loading options...'} /></div> : <div />;
        const error: JSX.Element = this.state.error !== undefined ? <div className={'ms-TextField-errorMessage ms-u-slideDownIn20'}>Error while loading items: {this.state.error}</div> : <div />;

        return (
            <div>
                <Dropdown label={this.props.label}
                    disabled={this.props.disabled || this.state.loading || this.state.error !== undefined}
                    onChange={this.onChange.bind(this)}
                    selectedKey={this.selectedKey}
                    options={this.state.options} />
                {loading}
                {error}
            </div>
        );
    }

    private onChange(e: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void {
        this.selectedKey = option.key;
        // reset previously selected options
        const options: IDropdownOption[] = this.state.options;
        options.forEach((o: IDropdownOption): void => {
            if (o.key !== option.key) {
                o.selected = false;
            }
        });
        this.setState((prevState: IListPickerState, props: IListPickerProps): IListPickerState => {
            prevState.options = options;
            return prevState;
        });
        if (this.props.onChange) {
            this.props.onChange(option);
        }
    }
}
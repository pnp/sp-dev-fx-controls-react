import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as telemetry from '../../common/telemetry';
import { ISPService } from '../../services/ISPService';
import { SPViewPickerService } from '../../services/SPViewPickerService';
import { IViewPickerProps, IViewPickerState } from './IViewPicker';
import { ISPView, ISPViews } from "../../common/SPEntities";


// Empty view value
const EMPTY_VIEW_KEY = 'NO_VIEW_SELECTED';

export class ViewPicker extends React.Component<IViewPickerProps, IViewPickerState> {
    private options: IDropdownOption[] = [];
    private selectedKey: string| string[] = null;
    private latestValidateValue: string;
    private async: Async;
    private delayedValidate: (value: string) => void;


    constructor(props: IViewPickerProps){
        super(props);

        telemetry.track('ViewPicker');
        this.state = {
            results: this.options
        }

        this.async = new Async(this);
        this.validate = this.validate.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
        this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
    }


    public componentDidMount(): void {
        // Start retrieving the list views
        this.loadViews();
    }

    public componentDidUpdate(prevProps: IViewPickerProps, _prevState: IViewPickerState): void {
        if (
            this.props.listId !== prevProps.listId || 
            this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl ||
            this.props.orderBy !== prevProps.orderBy 
            ) {
          this.loadViews();
        }
    }
    
    /**
     * Called when the component will unmount
    */
    public componentWillUnmount(): void {
        if (typeof this.async !== 'undefined') {
            this.async.dispose();
        }
    }

    private loadViews(): void {

        const viewService: SPViewPickerService = new SPViewPickerService(this.props, this.props.context);
        const viewsToExclude: string[] = this.props.viewsToExclude || [];
        this.options = [];
        viewService.getViews().then((response: ISPViews) => {
          // Start mapping the views that are selected
          response.value.forEach((view: ISPView) => {
            if (this.props.selectedView === view.Id) {
              this.selectedKey = view.Id;
            }
    
             // Make sure that the current view is NOT in the 'viewsToExclude' array
             if (viewsToExclude.indexOf(view.Title) === -1 && viewsToExclude.indexOf(view.Id) === -1) {
              this.options.push({
                key: view.Id,
                text: view.Title
              });
            }
          });
    
          // Option to unselect the view
          this.options.unshift({
            key: EMPTY_VIEW_KEY,
            text: EMPTY_VIEW_KEY
          });
    
          // Update the current component state
          this.setState({
            results: this.options,
            selectedKey: this.selectedKey
          });
        }).catch(() => { /* no-op; */ });
    }

    private onChanged(event: React.FormEvent<HTMLDivElement>,option: IDropdownOption, _index?: number): void {
        const newValue: string = option.key as string;
        this.delayedValidate(newValue);
    } 

    /**
     * Validates the new custom field value
     */
    private validate(value: string): void {
        this.notifyAfterValidate(this.props.selectedView, value);
        if (this.latestValidateValue === value) {
            return;
        }
    }


    /**
     * Notifies the parent Web Part of a property value change
     */
    private notifyAfterValidate(oldValue: string, newValue: string): void {
        // Check if the user wanted to unselect the view
        const propValue = newValue === EMPTY_VIEW_KEY ? '' : newValue;

        // Deselect all options
        this.options = this.state.results.map(option => {
        if (option.selected) {
            option.selected = false;
        }
        return option;
        });
        // Set the current selected key
        this.selectedKey = newValue;
        console.log('Selected View key :'+this.selectedKey);
        // Update the state
        this.setState({
            selectedKey: this.selectedKey,
            results: this.options
        });

        //Callback to the parent webpart
        this.props.onViewPickerPropertyChange(this.selectedKey);
    }

    /**
     * Renders the SPViewPicker controls with Office UI Fabric
     */
    public render(): JSX.Element {
        const { results, selectedKey } = this.state;
        const {className, disabled, label, placeholder, showBlankOption} = this.props;

        const options : IDropdownOption[] = results.map(v => ({
            key : v.key,
            text: v.text
        }));

        if (showBlankOption) {
            // Provide empty option
            options.unshift({
              key: EMPTY_VIEW_KEY,
              text: '',
            });
        }

        const dropdownProps: IDropdownProps = {
            className,
            options,
            disabled: disabled,
            label,
            placeholder,
            onChange: this.onChanged,
          };

        // Renders content
        return (
            <>
            <Dropdown {...dropdownProps} />
          </>
        );
    }

}
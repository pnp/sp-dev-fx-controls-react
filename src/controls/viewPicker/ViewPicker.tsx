import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as telemetry from '../../common/telemetry';
import { ISPService } from '../../services/ISPService';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import { IViewPickerProps, IViewPickerState } from './IViewPicker';
import { ISPView, ISPViews } from "../../common/SPEntities";
import styles from './ViewPicker.module.scss';

// Empty view value
const EMPTY_VIEW_KEY = 'NO_VIEW_SELECTED';

export class ViewPicker extends React.Component<IViewPickerProps, IViewPickerState> {

    private selectedKey: string | string[] = null;
    private async: Async;
    private _selectedView: string | string[] = null;

    constructor(props: IViewPickerProps){
        super(props);

        telemetry.track('ViewPicker');
        this.state = {
            results: [],
            loading: false
        }

        this.async = new Async(this);
    }


    public componentDidMount(): void {
        // Start retrieving the list views
        this.loadViews();
    }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
    public componentDidUpdate(prevProps: IViewPickerProps, _prevState: IViewPickerState): void {
        if (
            this.props.listId !== prevProps.listId || 
            this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl ||
            this.props.orderBy !== prevProps.orderBy 
            ) {
          this.loadViews();
        }

        if(prevProps.selectedView !== this.props.selectedView){
          this.setSelectedViews();
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

    private async loadViews(): Promise<void> {

        // Show the loading indicator and disable the dropdown
        this.setState({ loading: true });

        const viewsToExclude: string[] = this.props.viewsToExclude || [];
        let options: IDropdownOption[] = [];
        const service: ISPService = SPServiceFactory.createService(this.props.context, true, 5000, this.props.webAbsoluteUrl);
        let results = await service.getViews(
          this.props.listId,
          this.props.webAbsoluteUrl,
          this.props.orderBy,
          this.props.filter
        );

        // Start mapping the views that are selected
        results.value.forEach((view: ISPView) => {
          if (this.props.selectedView === view.Id) {
            this.selectedKey = view.Id;
          }
           // Make sure that the current view is NOT in the 'viewsToExclude' array
           if (viewsToExclude.indexOf(view.Title) === -1 && viewsToExclude.indexOf(view.Id) === -1) {
            options.push({
              key: view.Id,
              text: view.Title
            });
          }
        });

        if (this.props.showBlankOption) {
          // Provide empty option
          options.unshift({
            key: EMPTY_VIEW_KEY,
            text: '',
          });
        } else{
          // Option to unselect the view
          options.unshift({
            key: EMPTY_VIEW_KEY,
            text: EMPTY_VIEW_KEY
          });
        }

        this.setSelectedViews();
        // Update the current component state
        this.setState({
          loading: false,
          results: options
        });
        
    }

    /**
     * Set the currently selected views(s);
     */
    private setSelectedViews(): void {
      this._selectedView = cloneDeep(this.props.selectedView);

      this.setState({
        selectedView: this._selectedView,
      });
    }


  /**
   * Fires when a view has been selected from the dropdown.
   * @param option The new selection.
   * @param index Index of the selection.
   */
  private onChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): void => {
    const { multiSelect, onSelectionChanged } = this.props;

    if (multiSelect) {
      let selectedViews = this._selectedView ? cloneDeep(this._selectedView) as string[] : [];

      if (option.selected) {
        selectedViews.push(option.key.toString());
      }
      else {
        selectedViews = selectedViews.filter(view => view !== option.key);
      }
      this._selectedView = selectedViews;
    }
    else {
      this._selectedView = option.key.toString();
    }
    if (onSelectionChanged) {
      onSelectionChanged(cloneDeep(this._selectedView));
    }
  }

   

    /**
     * Renders the ViewPicker controls with Office UI Fabric
     */
    public render(): JSX.Element {
        const { loading, results, selectedView } = this.state;
        const {className, disabled,multiSelect, label, placeholder} = this.props;

        const options : IDropdownOption[] = results.map(v => ({
            key : v.key,
            text: v.text
        }));



        const dropdownProps: IDropdownProps = {
            className,
            options,
            disabled: disabled,
            label,
            placeholder,
            onChange: this.onChange,
          };
        
        if(multiSelect){
          dropdownProps.multiSelect = true;
          dropdownProps.selectedKeys = selectedView as string [];
        }else {
          dropdownProps.selectedKey = selectedView as string;
        }
        // Renders content
        return (
          <div className={styles.viewPicker}>
            {loading && <Spinner className={styles.spinner} size={SpinnerSize.xSmall}/>}
            <Dropdown {...dropdownProps} />
          </div>
        );
    }

}
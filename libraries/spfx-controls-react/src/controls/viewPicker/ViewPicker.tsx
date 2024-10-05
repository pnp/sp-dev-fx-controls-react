import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { Async } from '@fluentui/react/lib/Utilities';
import * as telemetry from '../../common/telemetry';
import { ISPService } from '../../services/ISPService';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import { IViewPickerProps, IViewPickerState } from './IViewPicker';
import { ISPView } from "../../common/SPEntities";
import styles from './ViewPicker.module.scss';

// Empty view value
const EMPTY_VIEW_KEY = 'NO_VIEW_SELECTED';

export class ViewPicker extends React.Component<IViewPickerProps, IViewPickerState> {

    private selectedKey: string | string[] = null;
    private async: Async;

    constructor(props: IViewPickerProps){
        super(props);

        telemetry.track('ViewPicker');
        this.state = {
            results: []
        }

        this.async = new Async(this);
    }

    public async componentDidMount(): Promise<void> {
        // Start retrieving the list views
        await this.loadViews();
    }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
    public async componentDidUpdate(prevProps: IViewPickerProps, _prevState: IViewPickerState): Promise<void> {
        if (
            this.props.listId !== prevProps.listId ||
            this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl ||
            this.props.orderBy !== prevProps.orderBy
            ) {
          await this.loadViews();
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


        const viewsToExclude: string[] = this.props.viewsToExclude || [];
        const options: IDropdownOption[] = [];
        const service: ISPService = SPServiceFactory.createService(this.props.context, true, 5000, this.props.webAbsoluteUrl);
        const results = await service.getViews(
          this.props.listId,
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
          results: options
        });

    }

    /**
     * Set the currently selected views(s);
     */
    private setSelectedViews(): void {
      const _selectedView = cloneDeep(this.props.selectedView);

      this.setState({
        selectedView:_selectedView
      });
    }


  /**
   * Fires when a view has been selected from the dropdown.
   * @param option The new selection.
   * @param index Index of the selection.
   */
  private onChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): void => {
    const { multiSelect, onSelectionChanged } = this.props;
    let selectedViews : string | string[] = null;
    if (multiSelect) {
      selectedViews = this.state.selectedView ? cloneDeep(this.state.selectedView) as string[] : [];

      if (option.selected) {
        selectedViews.push(option.key.toString());
      }
      else {
        selectedViews = selectedViews.filter(view => view !== option.key);
      }

    }
    else {
      selectedViews = option.key.toString();
    }

    this.setState({
      selectedView:selectedViews
    });

    if (onSelectionChanged) {
      onSelectionChanged(cloneDeep(selectedViews));
    }
  }



    /**
     * Renders the ViewPicker controls with Office UI Fabric
     */
    public render(): JSX.Element {
        const { results, selectedView } = this.state;
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
            <Dropdown {...dropdownProps} />
          </div>
        );
    }

}

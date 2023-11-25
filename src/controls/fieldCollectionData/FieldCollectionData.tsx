import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { DefaultButton } from '@fluentui/react/lib/components/Button';
import { Panel, PanelType } from '@fluentui/react/lib/components/Panel';
import { Label } from '@fluentui/react/lib/components/Label';
import { CollectionDataViewer } from './collectionDataViewer';
import { IFieldCollectionDataProps, IFieldCollectionDataState } from "./IFieldCollectionData";
import * as strings from 'ControlStrings';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';

export class FieldCollectionData extends React.Component<IFieldCollectionDataProps, IFieldCollectionDataState> {
  constructor(props: IFieldCollectionDataProps) {
    super(props);

    this.state = {
      panelOpen: false
    };

    telemetry.track('FieldCollectionData', {});
  }

  /**
   * Open the panel
   */
  private openPanel = (): void => {
    this.setState({
      panelOpen: true
    });
  }

  /**
   * Closes the panel
   */
  private closePanel = (): void => {
    this.setState({
      panelOpen: false
    });
  }

  /**
   * On save action
   */
  private onSave = (items: any[]): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.props.onChanged(items);
    this.setState({
      panelOpen: false
    });
  }

  public render(): JSX.Element {
    const _element: JSX.Element = this.getElement()
    return (
      _element
    );
  }

  private getElement(): JSX.Element {
    const _element: JSX.Element = typeof this.props.usePanel === "boolean" && this.props.usePanel === false
      ?
      <CollectionDataViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />
      :
      <div>
        <Label>{this.props.label}</Label>

        <DefaultButton text={this.props.manageBtnLabel}
                      onClick={this.openPanel}
                      disabled={this.props.fields.length === 0 || this.props.disabled} />

        {
          (!this.props.fields || this.props.fields.length === 0) && //<FieldErrorMessage errorMessage={strings.CollectionDataEmptyFields} />
          <MessageBar messageBarType={MessageBarType.error}>{strings.CollectionDataItemMissingFields}</MessageBar>
        }

        <Panel isOpen={this.state.panelOpen}
              onDismiss={this.closePanel}
              type={PanelType.large}
              headerText={this.props.panelHeader}
              onOuterClick={()=>{ /* no-op; */}}
              className={`FieldCollectionData__panel ${this.props.panelClassName || ""}`}
              { ...this.props.panelProps ?? {}} >
          {
            this.props.panelDescription && (
              <p className="FieldCollectionData__panel__description">{this.props.panelDescription}</p>
            )
          }

          <CollectionDataViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />
        </Panel>
      </div>

  return _element;
  }
}

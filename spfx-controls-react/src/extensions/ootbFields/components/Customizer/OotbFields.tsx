import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './OotbFields.module.scss';
import { ListItemAccessor } from '@microsoft/sp-listview-extensibility';
import { FieldRendererHelper } from '../../../../common/utilities/FieldRendererHelper';
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

const LOG_SOURCE: string = 'OotbFields';

/**
 * Field Customizer control to test fields' controls
 */
export default class OotbFields extends React.Component<IOotbFieldsProps, IOotbFieldsState> {
  public constructor(props: IOotbFieldsProps, state: IOotbFieldsState) {
    super(props, state);

    this.state = {};
  }

  public UNSAFE_componentWillMount() {
    FieldRendererHelper.getFieldRenderer(this.props.value, {
      className: this.props.className,
      cssProps: this.props.cssProps
    }, this.props.listItem, this.props.context).then(fieldRenderer => {
      this.setState({
        fieldRenderer: fieldRenderer
      });
    });
  }

  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: OotbFields mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: OotbFields unmounted');
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        {this.state.fieldRenderer}
      </div>
    );
  }
}

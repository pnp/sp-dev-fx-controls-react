import * as React from 'react';
import styles from '../FieldCollectionData.module.scss';
import { ICollectionIconFieldProps } from '.';
import { TextField } from '@fluentui/react/lib/components/TextField';
import { Icon } from '@fluentui/react/lib/components/Icon';

export class CollectionIconField extends React.Component<ICollectionIconFieldProps, {}> {

  public render(): React.ReactElement<ICollectionIconFieldProps> {
    const { field, item } = this.props;
    return (
      <div className={`FieldCollectionData__panel__icon-field ${styles.iconField}`}>
        <TextField placeholder={field.placeholder || field.title}
                   className={styles.collectionDataField}
                   value={item[field.id] ? item[field.id] : ""}
                   required={field.required}
                   onChange={(e, value) => this.props.fOnValueChange(field.id, value)}
                   deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
                   onGetErrorMessage={(value) => this.props.fValidation(this.props.field, value)}
                   disabled={this.props.disableEdit} />
        <Icon iconName={item[field.id] ? item[field.id] : ""} />
      </div>
    );
  }
}

import * as React from 'react';
import * as strings from 'ControlStrings';
import { DisplayMode } from '@microsoft/sp-core-library';
import styles from './WebPartTitle.module.scss';

export interface IWebPartTitleProps {
  displayMode: DisplayMode;
  title: string;
  updateProperty: (value: string) => void;
  className?: string;
}

/**
 * Web Part Title component
 */
export class WebPartTitle extends React.Component<IWebPartTitleProps, {}> {
  /**
   * Constructor
   */
  constructor(props: IWebPartTitleProps) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  /**
   * Process the text area change
   */
  private _onChange(event) {
    this.props.updateProperty(event.target.value);
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IWebPartTitleProps> {
    return (
      <div className={`${styles.webPartTitle} ${this.props.className}` }>
        {
          this.props.displayMode === DisplayMode.Edit && <textarea placeholder={strings.WebPartTitlePlaceholder} aria-label={strings.WebPartTitleLabel} onChange={this._onChange} defaultValue={this.props.title}></textarea>
        }

        {
          this.props.displayMode !== DisplayMode.Edit && this.props.title && <span>{this.props.title}</span>
        }
      </div>
    );
  }
}






/*

*/

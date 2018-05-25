import * as React from 'react';
import { IPlaceholderProps } from './IPlaceholderComponent';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import styles from './PlaceholderComponent.module.scss';
import * as appInsights from '../../common/appInsights';
import { IPlaceholderState } from '.';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

/**
 * Placeholder component
 */
export class Placeholder extends React.Component<IPlaceholderProps, IPlaceholderState> {
  private _crntElm: HTMLDivElement = null;

  /**
   * Constructor
   */
  constructor(props: IPlaceholderProps) {
    super(props);

    this.state = {
      width: null
    };

    appInsights.track('ReactPlaceholder', {
      description: !!props.description,
      iconName: !!props.iconName,
      iconText: !!props.iconText,
      buttonLabel: !!props.buttonLabel,
      onConfigure: !!props.onConfigure,
      contentClassName: !!props.contentClassName
    });
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._setZoneWidth();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IPlaceholderProps, prevState: IPlaceholderState): void {
    this._setZoneWidth();
  }

  /**
   * shouldComponentUpdate lifecycle hook
   * @param nextProps
   * @param nextState
   */
  public shouldComponentUpdate(nextProps: IPlaceholderProps, nextState: IPlaceholderState): boolean {
    return this.state.width !== nextState.width;
  }

  /**
   * Execute the onConfigure function
   */
  private _handleBtnClick = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    this.props.onConfigure();
  }

  /**
   * Set the current zone width
   */
  private _setZoneWidth = () => {
    this.setState({
      width: this._crntElm.clientWidth
    });
  }

  /**
   * Stores the current element
   */
  private _linkElm = (e: HTMLDivElement) => {
    this._crntElm = e;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPlaceholderProps> {
    return (
      <div className={`${styles.placeholder} ${this.props.contentClassName ? this.props.contentClassName : ''}`} ref={this._linkElm}>
        <div className={styles.placeholderContainer}>
          <div className={styles.placeholderHead}>
            <div className={styles.placeholderHeadContainer}>
              {
                this.props.iconName && <Icon iconName={this.props.iconName} className={`${styles.placeholderIcon} ms-fontSize-su ms-Icon`} />
              }
              <span className={`${styles.placeholderText} ms-fontWeight-light ms-fontSize-xxl ${(this.state.width && this.state.width <= 380) ? styles.hide : "" }`}>{this.props.iconText}</span>
            </div>
          </div>
          <div className={styles.placeholderDescription}>
            <span className={styles.placeholderDescriptionText}>{this.props.description}</span>
          </div>
          {this.props.children}
          <div className={styles.placeholderDescription}>
            {
              this.props.buttonLabel &&
              <PrimaryButton
                text={this.props.buttonLabel}
                ariaLabel={this.props.buttonLabel}
                ariaDescription={this.props.description}
                onClick={this._handleBtnClick} />
            }
          </div>
        </div>
      </div>
    );
  }
}




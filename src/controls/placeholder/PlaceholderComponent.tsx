import { ThemeContext } from '@fluentui/react-theme-provider/lib/ThemeContext';
import { Theme } from '@fluentui/react-theme-provider/lib/types';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/components/Icon';
import * as React from 'react';
import { IPlaceholderState } from '.';
import * as telemetry from '../../common/telemetry';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';
import { IPlaceholderProps } from './IPlaceholderComponent';
import { getClassNames } from './PlaceholderComponent.styles';

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

    telemetry.track('ReactPlaceholder', {
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
    /*
    * compare the props object for changes in primative values
    * Return/re-render, bexeting the function, if the props change
    */
    for (const property in nextProps) {
      if (property !== '_onConfigure') {
        if (nextProps[property] !== this.props[property]) {
          return true;
        }
      }
    }
    return this.state.width !== nextState.width || this.props.hideButton !== nextProps.hideButton;
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
  private _setZoneWidth = (): void => {
    this.setState({
      width: this._crntElm.clientWidth
    });
  }

  /**
   * Stores the current element
   */
  private _linkElm = (e: HTMLDivElement): void => {
    this._crntElm = e;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPlaceholderProps> {

    const {
      iconName,
      iconText,
      description,
      children,
      buttonLabel,
      hideButton,
      theme
    } = this.props;


    return (
      <ThemeContext.Consumer>
        {(contextTheme: Theme | undefined) => {

          const themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
          const styles = getClassNames(themeToApply);

          const iconTextClassNames = `${styles.placeholderText} ${(this.state.width && this.state.width <= 380) ? styles.hide : ""}`;
          const iconTextEl = typeof iconText === 'string' ? <span className={iconTextClassNames}>{this.props.iconText}</span> : iconText(iconTextClassNames);
          const descriptionEl = typeof description === 'string' ? <span className={styles.placeholderDescriptionText}>{this.props.description}</span> : description(styles.placeholderDescriptionText);

          return (
            <div className={`${styles.placeholder} ${this.props.contentClassName ? this.props.contentClassName : ''}`} ref={this._linkElm}>
              <div className={styles.placeholderContainer}>
                <div className={styles.placeholderHead}>
                  <div className={styles.placeholderHeadContainer}>
                    {
                      iconName && <Icon iconName={iconName} className={styles.placeholderIcon} />
                    }
                    {iconTextEl}
                  </div>
                </div>
                <div className={styles.placeholderDescription}>
                  {descriptionEl}
                </div>
                {children}
                <div className={styles.placeholderDescription}>
                  {
                    (buttonLabel && !hideButton) &&
                    <PrimaryButton
                      text={buttonLabel}
                      ariaLabel={buttonLabel}
                      ariaDescription={typeof description === 'string' ? description : ''}
                      onClick={this._handleBtnClick}
                      theme={themeToApply} />
                  }
                </div>
              </div>
            </div>);
        }}
      </ThemeContext.Consumer>
    );
  }
}

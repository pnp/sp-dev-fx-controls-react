import * as React from "react";
import { IPlaceholderProps } from "./IPlaceholderComponent";
import { Button, ButtonType } from 'office-ui-fabric-react/lib/components/Button';
import styles from './PlaceholderComponent.module.scss';

/**
 * Placeholder component
 */
export class Placeholder extends React.Component<IPlaceholderProps, {}> {
    /**
     * Constructor
     */
    constructor(props: IPlaceholderProps) {
        super(props);

        this._handleBtnClick = this._handleBtnClick.bind(this);
    }

    /**
     * Execute the onConfigure function
     */
    private _handleBtnClick(event?: React.MouseEvent<HTMLButtonElement>) {
        this.props.onConfigure();
    }

    /**
     * Default React component render method
     */
    public render(): React.ReactElement<IPlaceholderProps> {
        const iconName = typeof this.props.iconName !== "undefined" && this.props.iconName !== null ? `ms-Icon--${this.props.iconName}` : '';

        return (
            <div className={`${styles.placeholder} ${this.props.contentClassName}`}>
                <div className={styles.placeholderContainer}>
                    <div className={styles.placeholderHead}>
                        <div className={styles.placeholderHeadContainer}>
                            <i className={`${styles.placeholderIcon} ms-fontSize-su ms-Icon ${iconName}`}></i>
                            <span className={`${styles.placeholderText} ms-fontWeight-light ms-fontSize-xxl`}>{this.props.iconText}</span>
                        </div>
                    </div>
                    <div className={styles.placeholderDescription}>
                        <span className={styles.placeholderDescriptionText}>{this.props.description}</span>
                    </div>
                    {this.props.children}
                    <div className={styles.placeholderDescription}>
                        {
                            this.props.buttonLabel &&
                            <Button
                                buttonType={ButtonType.primary}
                                ariaLabel={this.props.buttonLabel}
                                ariaDescription={this.props.description}
                                onClick={this._handleBtnClick}>
                                {this.props.buttonLabel}
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
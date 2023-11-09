import * as React from 'react';
import styles from './Accordion.module.scss';
import { IAccordionProps, IAccordionState } from './index';
import { css } from "@uifabric/utilities/lib/css";
import { DefaultButton } from '@fluentui/react/lib/components/Button';
import { IIconProps } from '@fluentui/react/lib/Icon';
import * as telemetry from '../../common/telemetry';

/**
 * Icon styles. Feel free to change them
 */
const collapsedIcon: IIconProps = { iconName: 'ChevronRight', className: styles.accordionChevron };
const expandedIcon: IIconProps = { iconName: 'ChevronDown', className: styles.accordionChevron };

export class Accordion extends React.Component<IAccordionProps, IAccordionState> {
  private _drawerDiv: HTMLDivElement = undefined;
  constructor(props: IAccordionProps) {
    super(props);

    this.state = {
      expanded: !props.defaultCollapsed
    };

    collapsedIcon.iconName = props.collapsedIcon || 'CheveronRight';
    expandedIcon.iconName = props.expandedIcon || 'CheveronDown';

    telemetry.track('ReactAccordion', {});
  }

  public render(): React.ReactElement<IAccordionProps> {
    return (
      <div className={css(styles.accordion, this.props.className)}>
        <DefaultButton
          toggled={true}
          checked={this.state.expanded}
          text={this.props.title}
          iconProps={this.state.expanded ? expandedIcon : collapsedIcon}
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded
            });
          }}
          aria-expanded={this.state.expanded}
          aria-controls={this._drawerDiv && this._drawerDiv.id}
        />
        {this.state.expanded &&
          <div className={styles.drawer} ref={(el) => { this._drawerDiv = el; }}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}


import * as React from 'react';
import styles from './RteColorPicker.module.scss';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ISwatchColorPickerGroupState, ISwatchColorPickerGroupProps, ISwatchColor } from './SwatchColorPickerGroup.types';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from 'office-ui-fabric-react/lib/FocusZone';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { chunk } from '@microsoft/sp-lodash-subset';

export default class SwatchColorPickerGroup extends React.Component<ISwatchColorPickerGroupProps, ISwatchColorPickerGroupState> {
  public render(): React.ReactElement<ISwatchColorPickerGroupProps> {
    const colorRows = chunk(this.props.groupColors, 5);
    return (
      <div>
        <Label htmlFor={this.props.groupText}
               className={styles.pickerLabel}>{this.props.groupText}</Label>
        <div key={this.props.groupText}>
          <FocusZone direction={FocusZoneDirection.horizontal}
                     handleTabKey={FocusZoneTabbableElements.all}
                     isCircularNavigation={true}
                     className={styles.focusedContainer}>
            <table className={styles.tableRoot}>
              <tbody>
                {
                  colorRows.map((cr: ISwatchColor[], rowIndex: number) => {
                    return (
                      <tr role="row">
                        {
                          cr.map((gc: ISwatchColor, index: number) => {
                            return (
                              <td role="presentation" className={styles.tableCell}>
                                <ActionButton className={styles.colorCell}
                                              role="gridCell"
                                              title={gc.label}
                                              aria-label={gc.label}
                                              aria-selected={this.props.selectedColor === gc.color}
                                              data-index={index}
                                              data-is-focusable={true}
                                              id={`${this.props.groupText}-${gc.id}-${index}`}
                                              onClick={() => this.handleColorChanged(gc.color)}>
                                  <svg className={`${styles.svg} ${this.props.selectedColor!.toUpperCase() === gc.color.toUpperCase() ? styles.selected : ""}`}
                                      viewBox="0 0 20 20"
                                      fill={gc.color} focusable="false">
                                    <rect width="100%" height="100%"></rect>
                                  </svg>
                                </ActionButton>
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }

              </tbody>
            </table>
          </FocusZone>

        </div>
      </div>
    );
  }

  private handleColorChanged(color: string) {
    this.props.onColorChanged(color);
  }
}

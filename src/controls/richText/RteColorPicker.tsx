import * as React from 'react';
import styles from './RteColorPicker.module.scss';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { IRteColorPickerProps, IRteColorPickerState } from './RteColorPicker.types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import SwatchColorPickerGroup from './SwatchColorPickerGroup';
import { ISwatchColor } from './SwatchColorPickerGroup.types';
import * as strings from 'ControlStrings';
import { ThemeColorHelper } from '../../common/utilities/ThemeColorHelper';

export default class RteColorPicker extends React.Component<IRteColorPickerProps, IRteColorPickerState> {
  private _wrapperRef: any = undefined;

  constructor(props: IRteColorPickerProps) {
    super(props);

    this.state = {
      isCalloutVisible: false
    };
  }

  public render(): React.ReactElement<IRteColorPickerProps> {
    const {
      buttonLabel,
      defaultButtonLabel,
      fillThemeColor,
      id,
      previewColor
    } = this.props;
    return (
      <div>
        <div ref={this._linkWrapper}>
          <TooltipHost
            content={buttonLabel}
            id={id}
            calloutProps={{ gapSpace: 0 }}>
            <DefaultButton
              className={styles.colorPickerButton}
              aria-describedby={id}
              onClick={() => this._handleColorChanged(previewColor)}
            >
              <svg
                className={css(styles.previewSvg,
                  previewColor === "rgba(0, 0, 0, 0)"
                    ? styles.border
                    : undefined)}
                fill={previewColor}
                viewBox="0 0 20 20">
                <rect
                  className={styles.previewRectangle}
                  width="100%"
                  height="100%"></rect>
              </svg>
              <div className={styles.buttonLabel}>{buttonLabel}</div>
              <Icon
                iconName="CaretDownSolid8"
                className={styles.previewIcon} />
            </DefaultButton>
          </TooltipHost>
        </div>
        <Callout
          isBeakVisible={false}
          directionalHint={4}
          className={styles.pickerCallout}
          setInitialFocus={true}
          gapSpace={0}
          role={"alertdialog"}
          hidden={!this.state.isCalloutVisible}
          target={this._wrapperRef}
          onDismiss={() => this.setState({ isCalloutVisible: false })}
        >
          <TooltipHost
            content={defaultButtonLabel}
            id={`${id}DefaultButton`}
            calloutProps={{ gapSpace: 0 }}>
            <DefaultButton
              className={styles.colorPickerButton}
              aria-describedby={`${id}DefaultButton`}
              onClick={() => this._handleSwitchToDefault()}
            >
              <svg
                className={css(styles.previewSvg,
                  styles.defaultSvg,
                  fillThemeColor
                    ? styles.fillThemeColor
                    : styles.fillDefaultColor,
                  fillThemeColor
                    ? undefined
                    : styles.border)}
                viewBox="0 0 20 20">
                <rect
                  className={styles.previewRectangle}
                  width="100%"
                  height="100%"></rect>
              </svg>
              <div className={styles.buttonLabel}>{defaultButtonLabel}</div>
            </DefaultButton>
          </TooltipHost>
          {this.props.colorPickerGroups.map(cpg => {
            return (this._getSwatchColorPickerGroup(cpg));
          })}
        </Callout>
      </div>
    );
  }

  private _handleSwitchToDefault = () => {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
    this.props.switchToDefaultColor();
  }
  private _handleColorChanged = (color: string) => {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
    this.props.onColorChanged(color);
  }

  private _getSwatchColorPickerGroup = (pickerGroup: string) => {
    let groupName: string = undefined;
    switch (pickerGroup) {
      case "themeColors":
        groupName = strings.ThemeColorsGroupName;
        break;
      case "highlightColors":
        groupName = strings.HighlightColorsGroupName;
        break;
      default:
        groupName = strings.HighlightColorsGroupName;
        break;
    }

    let groupColors: ISwatchColor[] = [];
    switch (pickerGroup) {
      case "themeColors":
        groupColors = [
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorDarker),
            id: "#1c561c",
            label: strings.ThemeColorDarker
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorDark),
            id: "#267426",
            label: strings.ThemeColorDark
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorDarkAlt),
            id: "#2d8a2d",
            label: strings.ThemeColorDarkAlt
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorPrimary),
            id: "#339933",
            label: strings.ThemeColorPrimary
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorSecondary),
            id: "#44a544",
            label: strings.ThemeColorSecondary
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorTertiary),
            id: "#a6a6a6",
            label: strings.ThemeColorTertiary
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralSecondary),
            id: "#666666",
            label: strings.ThemeColorNeutralSecondary
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralPrimaryAlt),
            id: "#3c3c3c",
            label: strings.ThemeColorNeutralPrimaryAlt
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralPrimary),
            id: "#333333",
            label: strings.ThemeColorNeutralPrimary
          },
          {
            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralDark),
            id: "#212121",
            label: strings.ThemeColorNeutralDark
          }
        ];
        break;
      case "highlightColors":
        groupColors = [
          {
            color:
              "#FFFF00",
            id:
              "#FFFF00",
            label:
              strings.HighlightColorYellow
          },
          {
            color:
              "#00FF00",
            id:
              "#00FF00",
            label:
              strings.HighlightColorGreen
          },
          {
            color:
              "#00FFFF",
            id:
              "#00FFFF",
            label:
              strings.HighlightColorAqua
          },
          {
            color:
              "#FF00FF",
            id:
              "#FF00FF",
            label:
              strings.HighlightColorMagenta
          },
          {
            color:
              "#0000FF",
            id:
              "#0000FF",
            label:
              strings.HighlightColorBlue
          },
          {
            color:
              "#FF0000",
            id:
              "#FF0000",
            label:
              strings.HighlightColorRed
          },
          {
            color:
              "#000080",
            id:
              "#000080",
            label:
              strings.HighlightColorDarkblue
          },
          {
            color:
              "#008080",
            id:
              "#008080",
            label:
              strings.HighlightColorTeal
          },
          {
            color:
              "#008000",
            id:
              "#008000",
            label:
              strings.HighlightColorDarkgreen
          },
          {
            color:
              "#800080",
            id:
              "#800080",
            label:
              strings.HighlightColorPurple
          },
          {
            color:
              "#800000",
            id:
              "#800000",
            label:
              strings.HighlightColorMaroon
          },
          {
            color:
              "#808000",
            id:
              "#808000",
            label:
              strings.HighlightColorGold
          },
          {
            color:
              "#808080",
            id:
              "#808080",
            label:
              strings.HighlightColorDarkgrey
          },
          {
            color:
              "#C0C0C0",
            id:
              "#C0C0C0",
            label:
              strings.HighlightColorGrey
          },
          {
            color:
              "#000000",
            id:
              "#000000",
            label:
              strings.HighlightColorBlack
          }
        ];
        break;
      default:
        groupColors = [
          {
            color:
              "#a80000",
            id:
              "#a80000",
            label:
              strings.StandardColorDarkred
          },
          {
            color:
              "#e81123",
            id:
              "#e81123",
            label:
              strings.StandardColorRed
          },
          {
            color:
              "#ffb900",
            id:
              "#ffb900",
            label:
              strings.StandardColorOrange
          },
          {
            color:
              "#fff100",
            id:
              "#fff100",
            label:
              strings.StandardColorYellow
          },
          {
            color:
              "#bad80a",
            id:
              "#bad80a",
            label:
              strings.StandardColorLightgreen
          },
          {
            color:
              "#107c10",
            id:
              "#107c10",
            label:
              strings.StandardColorGreen
          },
          {
            color:
              "#00bcf2",
            id:
              "#00bcf2",
            label:
              strings.StandardColorLightblue
          },
          {
            color:
              "#0078d4",
            id:
              "#0078d4",
            label:
              strings.StandardColorBlue
          },
          {
            color:
              "#002050",
            id:
              "#002050",
            label:
              strings.StandardColorDarkblue
          },
          {
            color:
              "#5c2d91",
            id:
              "#5c2d91",
            label:
              strings.StandardColorPurple
          }
        ];
        break;
    }

    return (<SwatchColorPickerGroup
      key={pickerGroup}
      groupText={groupName}
      onColorChanged={(color) => this._handleColorChanged(color)}
      groupColors={groupColors}
      selectedColor={this.props.selectedColor}
    />);
  }

  private _linkWrapper = (e: any) => {
    this._wrapperRef = e;
  }
}




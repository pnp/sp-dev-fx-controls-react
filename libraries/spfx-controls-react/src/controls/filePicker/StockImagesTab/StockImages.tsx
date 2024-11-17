import * as React from 'react';
import styles from './StockImages.module.scss';
import { IStockImagesProps } from './IStockImagesProps';
import { StockImagesEvent, SubmitValue } from './StockImagesModel';
import { GeneralHelper } from '../../../Utilities';
import { IFilePickerResult } from '../FilePicker.types';

export class StockImages extends React.Component<IStockImagesProps> {
  public componentDidMount(): void {
    window.addEventListener("message", this._handleImageIframeEvent);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("message", this._handleImageIframeEvent);
  }

  public render(): React.ReactElement<IStockImagesProps> {
    const { language } = this.props;

    const themesColor = `&themecolors=${encodeURIComponent(this.getCurrentThemeConfiguration())}`;
    const contentPickerUrl = `https://hubblecontent.osi.office.net/contentsvc/m365contentpicker/index.html?p=3&app=1001&aud=prod&channel=devmain&setlang=${language}&msel=0&env=prod&premium=1${themesColor}`;

    return (
      <div className={styles.tabContainer}>
        <div className={styles.tab}>
          <div className={styles.stockImagesPickerContainer}>
            <iframe className={styles.stockImagesPicker} role={"application"} id={"stockImagesIFrame"}
            src={contentPickerUrl} />
          </div>
        </div>
      </div>
    );
  }

  private _handleImageIframeEvent = (event): void => {
    if (!event || !event.origin || event.origin.indexOf("https://hubblecontent.osi.office.net") !== 0) {
      return;
    }

    const eventData: StockImagesEvent = JSON.parse(event.data);

    if (eventData.MessageId === "AddItem") {
      this._handleSave(eventData);
    } else if (eventData.MessageId === "CancelDialog") {
      this._handleClose();
    }
  }

  /**
   * Called when user saves
   */
  private _handleSave = (event: StockImagesEvent): void => {
    let filePickerResult: IFilePickerResult = null;
    const cdnFileInfo: SubmitValue = event.Values && (event.Values as SubmitValue[]).length > 0 ? (event.Values as SubmitValue[])[0] : null;
    if (cdnFileInfo) {
      filePickerResult = {
        downloadFileContent: () => { return this.props.fileSearchService.downloadBingContent(cdnFileInfo.sourceUrl, GeneralHelper.getFileNameFromUrl(GeneralHelper.getFileNameFromUrl(cdnFileInfo.sourceUrl))); },
        fileAbsoluteUrl: cdnFileInfo.sourceUrl,
        fileName: GeneralHelper.getFileNameFromUrl(cdnFileInfo.sourceUrl),
        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(cdnFileInfo.sourceUrl)
      };
    }

    this.props.onSave([filePickerResult]);
  }

  /**
   * Called when user closes tab
   */
  private _handleClose = (): void => {
    this.props.onClose();
  }

  private getCurrentThemeConfiguration(): string {
    if (!window["__themeState__"] || !window["__themeState__"].theme) {
      return "";
    }

    const primaryColor = window["__themeState__"].theme.themePrimary;
    const textColor = window["__themeState__"].theme.primaryText;
    const primaryBackground = window["__themeState__"].theme.bodyBackground;
    const neutralLighter = window["__themeState__"].theme.neutralLighter;

    const theme = `{"primaryColor":"${primaryColor}","textColor":"${textColor}","backgroundColor":"${primaryBackground}","neutralLighterColor":"${neutralLighter}"}`;
    return theme;
  }
}

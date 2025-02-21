import * as React from 'react';
import styles from './FolderTile.module.scss';
import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import * as strings from 'ControlStrings';
import { ScreenWidthMinLarge  } from '@fluentui/react/lib/Styling';
import { IFolderTileProps } from './IFolderTileProps';

export class FolderTile extends React.Component<IFolderTileProps> {
  public render(): React.ReactElement<IFolderTileProps> {
    const { isSelected, index, item, pageWidth } = this.props;
    const isLarge: boolean = pageWidth >= ScreenWidthMinLarge;
    //{item.name}, Folder, Modified {item.modified}, edited by {item.modifiedBy}, {item.totalFileCount} items, Private
    const itemLabel: string = strings.FolderLabelTemplate
      .replace('{0}', item.name)
      .replace('{1}', item.modified)
      .replace('{2}', item.modifiedBy)
      .replace('{3}', `${item.totalFileCount}`);
    return (
      <div
        aria-selected={isSelected}
        data-is-draggable={false}
        role="listitem"
        aria-labelledby={`Tile-label${index}`}
        aria-describedby={`Tile-activity${index}`}
        className={css(styles.tile, isLarge ? styles.isLarge : styles.isSmall, styles.invokable, isSelected ? styles.selected : undefined)}
        data-is-focusable={true}
        data-is-sub-focuszone={true}
        data-disable-click-on-enter={true}
        data-selection-index={index}
        onClick={(_event)=>this.props.onItemInvoked(item)}
      >
        <div
          className={styles.link}
          role="link"
        >
          <span
            id={`Tile-label${index}`}
            className={styles.label}>{itemLabel}</span>
          <span role="presentation" className={styles.aboveNameplate}>
            <span role="presentation" className={styles.content}>
              <span role="presentation" className={styles.foreground}>
                <span className={styles.odItemTile2FolderCover}>
                  <div
                    className={css(styles.folderCover, styles.isLarge)}>
                    <Icon
                      className={styles.folderCoverBack}
                      imageProps={{
                        src: strings.FolderBackPlate
                      }} />
                    {item.totalFileCount > 0 &&
                      <span className={styles.folderCoverContent}>
                        <span className={styles.folderCoverFrame}>
                          <span className={styles.itemTileBlankCover} style={{ width: 104, height: 72 }} />
                        </span>
                      </span>
                    }
                    <Icon
                      className={styles.folderCoverFront}
                      imageProps={{
                        src: strings.FolderFrontPlate
                      }} />
                    {item.totalFileCount > 0 &&
                      <span className={styles.metadata}>{item.totalFileCount}</span>
                    }
                  </div>
                </span>
              </span>
            </span>
          </span>
          <span className={styles.namePlate}>
            <span className={styles.name}>
              <span className={css(styles.signalField, styles.compact)}>
                <span className={styles.signalFieldValue}>{item.name}</span>
              </span>
            </span>
            <span className={styles.activity} id={`Tile-activity${index}`}>
              <span className={css(styles.signalField, styles.compact)}>
                <span className={styles.signalFieldValue}>{item.modified}</span>
              </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

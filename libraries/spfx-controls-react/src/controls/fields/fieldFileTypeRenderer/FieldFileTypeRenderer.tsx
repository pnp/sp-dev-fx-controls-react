import * as React from 'react';
import { css, ISerializableObject } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import { FileTypeIcon, IconType } from '../../fileTypeIcon';
import * as telemetry from '../../../common/telemetry';

import styles from './FieldFileTypeRenderer.module.scss';

export interface IFieldFileTypeRendererProps extends IFieldRendererProps {
  /**
   * file/document path
   */
  path: string;
  /**
   * true if the icon should be rendered for a folder, not file
   */
  isFolder?: boolean;
}

/**
 * For future
 */
export interface IFieldFileTypeRendererState {

}

/**
 * File Type Renderer.
 * Used for:
 *   - File/Document Type
 */
export class FieldFileTypeRenderer extends React.Component<IFieldFileTypeRendererProps, IFieldFileTypeRendererState> {
  public constructor(props: IFieldFileTypeRendererProps, state: IFieldFileTypeRendererState) {
    super(props, state);

    telemetry.track('FieldFileTypeRenderer', {});

    this.state = {};
  }

  public render(): JSX.Element {
    const optionalStyles: ISerializableObject = {
    };
    optionalStyles[styles.folder] = this.props.isFolder;
    return (
      <div className={css(this.props.className, styles.container, styles.fabricIcon, optionalStyles)} style={this.props.cssProps}>
        {this.props.isFolder ? <Icon iconName={'FabricFolderFill'} /> : <FileTypeIcon type={IconType.font} path={this.props.path} />}
      </div>
    );
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';

import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import {
  CommandBar,
  ICommandBarItemProps,
} from '@fluentui/react/lib/CommandBar';
import { Stack } from '@fluentui/react/lib/Stack';
import { IComponentAs } from '@fluentui/react/lib/Utilities';

import { globalState } from '../../jotai/atoms';
import { UploadButton } from '../UploadButton/UploadButton';
import { IFileCommandBarProps } from './IFileCommandBarProps';
import { useFileCommandBarStyles } from './useFileCommandBarStyles';

export const FileCommandBar: React.FunctionComponent<IFileCommandBarProps> = (
  props: React.PropsWithChildren<IFileCommandBarProps>
) => {
  const {
    stackContainerStyles,
    commandBarStyles,
    controlStyles,
    commandbarButtonStyles,
    checkBoxStyles,
    buttonIconStyles
  } = useFileCommandBarStyles();
  const [appGlobalState, setGlobalState] = useAtom(globalState);
  const { selectedFiles, files } = appGlobalState;
  const [commandbarItems, setCOmmandBarItems] = React.useState<ICommandBarItemProps[]>([]);

  const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
  const { onUpload, onDelete, onSelectedAll } = props;


  const commandDeleteButton: IComponentAs<ICommandBarItemProps> = React.useCallback(
    (props) => {
      return (
        <ActionButton
          iconProps={{ iconName: "Delete" , styles: buttonIconStyles}}
          styles={commandbarButtonStyles}
          onClick={() => {
            setIsAllSelected(false);
            onDelete();
          }}
          text={strings.UpLoadFilesDeleteButtonLabel}
        />
      );
    },
    [selectedFiles,   commandbarButtonStyles]
  );

   React.useEffect(() => {
    if (isAllSelected) {
      setGlobalState((prevState) => {
        return {
          ...prevState,
          selectedFiles: files,
        };
      });
    } else {
      setGlobalState((prevState) => {
        return {
          ...prevState,
          selectedFiles: [],
        };
      });
    }
  }, [isAllSelected, files]);

  const commanbarSelectAllButton: IComponentAs<ICommandBarItemProps> = React.useCallback(
    (props) => {
      const selectedAll  =  files.length > 0 && files.length === selectedFiles.length;
      return (
        <Stack horizontal verticalAlign="center" horizontalAlign="start" tokens={{ childrenGap: 15 }}>
          {files.length > 0 ? ( <Checkbox styles={checkBoxStyles} label={strings.UpLoadFilesSelectAllLabel} checked={selectedAll} onChange={
            (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean)=>{
              setIsAllSelected(checked);
              onSelectedAll(checked);
            }
           } />) : null}
          {selectedFiles.length ? <div className={controlStyles.separatorVertrical} /> : null}
        </Stack>
      );
    },
    [files.length, selectedFiles.length, checkBoxStyles, controlStyles.separatorVertrical, onSelectedAll]
  );

  React.useEffect(() => {
    const items: ICommandBarItemProps[] = [];
    items.push({
      key: "selectedFiles",
      commandBarButtonAs: commanbarSelectAllButton,
    });

    items.push({
      key: "delete",
      commandBarButtonAs: commandDeleteButton,
    });

    setCOmmandBarItems(items);
  }, [commanbarSelectAllButton, commandDeleteButton]);

  return (
    <>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={stackContainerStyles}>
        <CommandBar items={commandbarItems} styles={commandBarStyles} />
        <UploadButton
          text={strings.UploadFilesButtonLabel}
          onUpload={ onUpload  }
          iconName="Add"
        />
      </Stack>
      <div className={controlStyles.separator} />
    </>
  );
};

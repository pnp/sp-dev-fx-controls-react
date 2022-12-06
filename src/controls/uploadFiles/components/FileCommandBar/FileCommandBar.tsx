/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';

import strings from 'ControlStrings';
import { useAtom } from 'jotai';
/* import {
  isEqual,
  pullAllWith,
} from 'lodash'; */
import {
  ActionButton,
  Checkbox,
  CommandBar,
  ICommandBarItemProps,
  IComponentAs,
  Stack,
} from 'office-ui-fabric-react';

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
  } = useFileCommandBarStyles();
  const [appGlobalState, setGlobalState] = useAtom(globalState);
  const { selectedFiles, files } = appGlobalState;
  const [commandbarItems, setCOmmandBarItems] = React.useState<ICommandBarItemProps[]>([]);

  const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
  const { onUpload, onDelete, onSelectedAll } = props;
  /* const [isDelete, setIsDelete] = React.useState<boolean>(false); */

/*   const onSelectedAll = React.useCallback((ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    setIsAllSelected(checked );
  }, []); */

/*   const onDelete = React.useCallback(() => {
    const newFiles = pullAllWith(files, selectedFiles, isEqual);
    setGlobalState((prevState) => {
      return { ...prevState, files: newFiles, selectedFiles: [] };
    });
    if (!newFiles.length) {
      setIsAllSelected(false);
    }
  }, [selectedFiles, files]); */


/*   const onUpload = React.useCallback((file:File) => {
    const newFiles = [...files, file];
    setGlobalState((prevState) => {
      return { ...prevState, files:  newFiles };
    });
  }, [files]); */

  const commandDeleteButton: IComponentAs<ICommandBarItemProps> = React.useCallback(
    (props) => {
      return (
        <ActionButton
          iconProps={{ iconName: "Delete" }}
          styles={commandbarButtonStyles()}
          onClick={() => {
            setIsAllSelected(false);
            onDelete();
          }}
          text="Delete"
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
      return (
        <Stack horizontal verticalAlign="center" horizontalAlign="start" tokens={{ childrenGap: 15 }}>
          {files.length > 0 ? ( <Checkbox styles={checkBoxStyles} label="Select all" checked={isAllSelected} onChange={
            (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean)=>{
              setIsAllSelected(checked);
              onSelectedAll(checked);
            }
           } />) : null}
          {selectedFiles.length ? <div className={controlStyles.separatorVertrical} /> : null}
        </Stack>
      );
    },
    [checkBoxStyles, selectedFiles]
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

import * as React from 'react';

import { FluentProvider, Theme } from '@fluentui/react-components';
import { IFilePickerResult, ImagePicker } from '../../../ImagePicker';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

interface ITestImagePickerProps {
  context: BaseComponentContext;
  themeVariant:any
}

export const TestImagePickerControl: React.FC<ITestImagePickerProps> = ({ context, themeVariant }) => {
  const [selectedFileUrl, setSelectedFileUrl] = React.useState<string>('');


  const setTheme = React.useCallback((): Partial<Theme> => {
    return createV9Theme(themeVariant);
  }, [themeVariant]);


  const handleFileSelected = (file: IFilePickerResult) => {
    console.log('File selected:', file);
    setSelectedFileUrl(file.previewDataUrl);
  };

  const handleDeleteFile = () => {
    console.log('File deleted');
    setSelectedFileUrl('');
  };

  return (
     <FluentProvider theme={setTheme()}>
    <div>
      <h2>Test ImagePicker Component</h2>
      <ImagePicker
        onFileSelected={handleFileSelected}
        onDeleteFile={handleDeleteFile}
        selectedFileUrl={selectedFileUrl}
        context={context}
      />
    </div>
    </FluentProvider>
  );
};

export default TestImagePickerControl;

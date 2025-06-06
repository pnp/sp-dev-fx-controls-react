/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { FileTypeIcon } from './FileTypeIcon';
import { IconType, ApplicationType, ImageSize } from './IFileTypeIcon';

describe('<FileTypeIcon />', () => {
  let fileTypeIcon: ReactWrapper;

  afterEach(() => {
    fileTypeIcon.unmount();
  });

  /**
   * Font icon tests
   */
  it('Font icon test with application', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.font} application={ApplicationType.SASS} />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('i.ms-Icon--FileSass')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('div')).to.have.length(0);
    done();
  });

  it('Font icon test with path', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.doc" />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('i.ms-Icon--WordDocument')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('div')).to.have.length(0);
    done();
  });

  it('Font icon test with path that contains querystring params', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.vsd?param1=prop1&param2=prop2" />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('i.ms-Icon--VisioDocument')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('div')).to.have.length(0);
    done();
  });

  it('Font icon test with path of unknown extension', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.font} path="https://contoso.sharepoint.com/documents/filename.unknown" />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('i.ms-Icon--Page')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('div')).to.have.length(0);
    done();
  });

  it('Font icon test without application or path, should render the generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.font} />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('i.ms-Icon--Page')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('div')).to.have.length(0);
    done();
  });

  it('Font icon test with both the application and path, should take the path into account', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.font} application={ApplicationType.SASS} path="https://contoso.sharepoint.com/documents/filename.doc" />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('i.ms-Icon--WordDocument')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('div')).to.have.length(0);
    done();
  });

  /**
   * Image icon tests
   */
  it('Image icon test with application', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} application={ApplicationType.Word} />);
    // Check if "i" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--docx')).to.have.length(1);
    // Check if no "div" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon test with path', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.doc" />);
    // Check if "div" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--docx')).to.have.length(1);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon test with path that contains querystring params', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.vsd?param1=prop1&param2=prop2" />);
    // Check if "div" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--vsdx')).to.have.length(1);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon test with path of unknown extension', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} path="https://contoso.sharepoint.com/documents/filename.unknown" />);
    // Check if "img" element exists
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    // Check if it did not create a brand icon element
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(0);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon test without application or path, should render the generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} />);
    // Check if "img" element exists
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    // Check if it did not create a brand icon element
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(0);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon test without application or path, should render the generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} application={ApplicationType.SASS} path="https://contoso.sharepoint.com/documents/filename.docx" />);
    // Check if "div" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--docx')).to.have.length(1);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size SMALL test', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} application={ApplicationType.Word} size={ImageSize.small} />);
    // Check if "div" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(1);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size MEDIUM test', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} application={ApplicationType.Word} size={ImageSize.medium} />);
    // Check if "div" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon48')).to.have.length(1);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size LARGE test', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} application={ApplicationType.Word} size={ImageSize.large} />);
    // Check if "div" element exists
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon96')).to.have.length(1);
    // Check if no "i" element has been rendered
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size SMALL test for generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} size={ImageSize.small} />);
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(0);
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size MEDIUM test for generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} size={ImageSize.medium} />);
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon48')).to.have.length(0);
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size LARGE test for generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} size={ImageSize.large} />);
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon96')).to.have.length(0);
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size test with unkown size', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} size={ImageSize.small} application={ApplicationType.Word} />);
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(1);
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon size test with unkown size for generic icon', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} size={ImageSize.small} />);
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(0);
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });

  it('Image icon test with unkown application', (done) => {
    fileTypeIcon = mount(<FileTypeIcon type={IconType.image} application={90 as unknown as ApplicationType} />);
    expect(fileTypeIcon.find('div img')).to.have.length(1);
    expect(fileTypeIcon.find('div.ms-BrandIcon--icon16')).to.have.length(0);
    expect(fileTypeIcon.find('i')).to.have.length(0);
    done();
  });
});

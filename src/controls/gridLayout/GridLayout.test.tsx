/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { GridLayout } from './GridLayout';

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  //DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { ISize } from '@fluentui/react/lib/Utilities';

interface IDummyItem {
  thumbnail: string;
  title: string;
  name: string;
  profileImageSrc: string;
  location: string;
  activity: string;
}

describe('<GridLayout />', () => {
  let gridLayout: ReactWrapper;
  const dummyItems: IDummyItem[] = [{
    thumbnail: "https://pixabay.com/get/57e9dd474952a414f1dc8460825668204022dfe05555754d742e7bd6/hot-air-balloons-1984308_640.jpg",
    title: "Adventures in SPFx",
    name: "Perry Losselyong",
    profileImageSrc: "https://robohash.org/blanditiisadlabore.png?size=50x50&set=set1",
    location: "SharePoint",
    activity: "3/13/2019"
  }, {
    thumbnail: "https://pixabay.com/get/55e8d5474a52ad14f1dc8460825668204022dfe05555754d742d79d0/autumn-3804001_640.jpg",
    title: "The Wild, Untold Story of SharePoint!",
    name: "Ebonee Gallyhaock",
    profileImageSrc: "https://robohash.org/delectusetcorporis.bmp?size=50x50&set=set1",
    location: "SharePoint",
    activity: "6/29/2019"
  }, {
    thumbnail: "https://pixabay.com/get/57e8dd454c50ac14f1dc8460825668204022dfe05555754d742c72d7/log-cabin-1886620_640.jpg",
    title: "Low Code Solutions: PowerApps",
    name: "Seward Keith",
    profileImageSrc: "https://robohash.org/asperioresautquasi.jpg?size=50x50&set=set1",
    location: "PowerApps",
    activity: "12/31/2018"
  }, {
    thumbnail: "https://pixabay.com/get/55e3d445495aa514f1dc8460825668204022dfe05555754d742b7dd5/portrait-3316389_640.jpg",
    title: "Not Your Grandpa's SharePoint",
    name: "Sharona Selkirk",
    profileImageSrc: "https://robohash.org/velnammolestiae.png?size=50x50&set=set1",
    location: "SharePoint",
    activity: "11/20/2018"
  }, {
    thumbnail: "https://pixabay.com/get/57e6dd474352ae14f1dc8460825668204022dfe05555754d742a7ed1/faucet-1684902_640.jpg",
    title: "Get with the Flow",
    name: "Boyce Batstone",
    profileImageSrc: "https://robohash.org/nulladistinctiomollitia.jpg?size=50x50&set=set1",
    location: "Flow",
    activity: "5/26/2019"
  }];

  const dummyOnRenderGridItem = (item: IDummyItem, _finalSize: ISize, isCompact: boolean): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.cover,
          height: 130
        }
      ]
    };

    return <div
      //className={styles.documentTile}
      data-is-focusable={true}
      role="listitem"
      aria-label={item.title}
    >
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}
        onClick={(ev: React.SyntheticEvent<HTMLElement>) => alert("You clicked on a grid item")}

      >
        <DocumentCardPreview {...previewProps} />
        {!isCompact && <DocumentCardLocation location={item.location} />}
        <div>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity={item.activity}
            people={[{ name: item.name, profileImageSrc: item.profileImageSrc }]}
          />
        </div>
      </DocumentCard>
    </div>;
  };

  afterEach(() => {
    gridLayout.unmount();
  });

  it('Test grid layout', (done) => {
    gridLayout = mount(<GridLayout items={dummyItems} onRenderGridItem={(item: IDummyItem, finalSize: ISize, isCompact: boolean) => dummyOnRenderGridItem(item, finalSize, isCompact)} />);
    expect(gridLayout.find('.ms-List-surface')).to.have.length(1);
    done();
  });
});

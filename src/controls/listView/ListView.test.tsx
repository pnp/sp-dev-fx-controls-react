/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { ListView } from './ListView';
import { IViewField } from './IListView';

class Wrapper extends React.Component {
  public render(): React.ReactNode {
    return React.Children.only(this.props.children);
  }
}

/* tslint:disable */
describe('<ListView />', () => {
  let listView: ReactWrapper;

  const dummyItems = [{
    id: 0,
    title: 'Dummy item 1',
    path: 'https://contoso.sharepoint.com/documents/word.docx',
    prop: {
      sub: 1
    }
  }, {
    id: 1,
    title: 'Dummy item 2',
    path: 'https://contoso.sharepoint.com/documents/powerpoint.pptx',
    prop: {
      sub: 2
    }
  }];

  const dummyViewFields: IViewField[] = [
    {
      name: "id",
      displayName: "ID",
      sorting: true
    },
    {
      name: "title",
      displayName: "Document title",
      linkPropertyName: "path",
      sorting: false
    },
    {
      name: "path",
      render: (item: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        return <a href={item.ServerRelativeUrl}>Link</a>;
      }
    }
  ];

  afterEach(() => {
    listView.unmount();
  });

  beforeEach(() => { });

  it('Test view with an empty array of items', (done) => {
    listView = mount(<ListView items={[]} />).update();

    expect(listView.state('items')).to.have.length(0);
    expect(listView.state('columns')).to.be.null; // eslint-disable-line @typescript-eslint/no-unused-expressions, no-unused-expressions
    done();
  });

  it('Test view with two items', (done) => {
    listView = mount(<ListView items={dummyItems} />).update();

    expect(listView.state('items')).to.have.length(2);
    expect(listView.state('columns')).to.be.null; // eslint-disable-line @typescript-eslint/no-unused-expressions, no-unused-expressions
    done();
  });

  it('Test view by updating the items porperty', (done) => {
    listView = mount(<ListView items={[]} />).update();
    expect(listView.state('items')).to.have.length(0);
    // Update the items property, now two items should be available
    listView.setProps({ items: dummyItems }).update();
    expect(listView.state('items')).to.have.length(2);
    done();
  });

  it('Test view with iconFieldName', (done) => {
    listView = mount(<ListView items={dummyItems} iconFieldName="path" />).update();

    expect(listView.state('items')).to.have.length(2);
    expect(listView.state('columns')).to.have.length(1);
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('key', 'fileType'); // eslint-disable-line @typescript-eslint/no-explicit-any
    done();
  });

  it('Test view with iconFieldName render method', (done) => {
    listView = mount(<ListView items={dummyItems} iconFieldName="path" />).update();
    const iconField = mount(React.createElement(Wrapper, {}, (listView.state('columns') as Array<any>)[0].onRender(dummyItems[0]))); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Check if Word icon gets rendered (CDN-based image)
    expect(iconField.find('img[src*="docx.png"]')).to.have.length(1);
    done();
  });

  it('Test view with _flattenItems function', (done) => {
    listView = mount(<ListView items={dummyItems} />).update();

    expect(listView.state('items')).to.have.length(2);
    expect((listView.state('items') as Array<any>)[0]).to.have.property('prop.sub', 1); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('items') as Array<any>)[1]).to.have.property('prop.sub', 2); // eslint-disable-line @typescript-eslint/no-explicit-any
    done();
  });

  it('Test view with viewFields', (done) => {
    listView = mount(<ListView items={dummyItems} viewFields={dummyViewFields} />).update();

    expect(listView.state('columns')).to.have.length(3);

    expect((listView.state('columns') as Array<any>)[0]).to.have.property('key', 'id'); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('name', 'ID'); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('onRender', undefined); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect((listView.state('columns') as Array<any>)[1]).to.have.property('key', 'title'); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[1]).to.have.property('name', 'Document title'); // eslint-disable-line @typescript-eslint/no-explicit-any
    // onRender binded function because it is linked to path
    expect((listView.state('columns') as Array<any>)[1]).to.have.property('onRender'); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect((listView.state('columns') as Array<any>)[2]).to.have.property('key', 'path'); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[2]).to.have.property('name', 'path'); // eslint-disable-line @typescript-eslint/no-explicit-any
    // onRender binded function because a custom render function got specified
    expect((listView.state('columns') as Array<any>)[2]).to.have.property('onRender'); // eslint-disable-line @typescript-eslint/no-explicit-any
    done();
  });

  it('Test out the sorting method', (done) => {
    listView = mount(<ListView items={dummyItems} viewFields={dummyViewFields} />).update();

    // Check if the ID column is not yet sorted
    expect((listView.state('columns') as Array<any>)[0]).not.to.have.property('isSorted'); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Test the column click event, this will trigger to sort the items
    (listView.instance() as any)["_columnClick"](null, (listView.state('columns') as Array<any>)[0]); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Check if the column is set to sorted
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('isSorted', true); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('isSortedDescending', false); // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if the first item has ID 0 (ascending order)
    expect((listView.state('items') as Array<any>)[0]).to.have.property('id', 0); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Do another sorting test, this should sort the items in descending order
    (listView.instance() as any)["_columnClick"](null, (listView.state('columns') as Array<any>)[0]); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('isSorted', true); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect((listView.state('columns') as Array<any>)[0]).to.have.property('isSortedDescending', true); // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if the first item has ID 0 (ascending order)
    expect((listView.state('items') as Array<any>)[0]).to.have.property('id', 1); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Just to be sure, we should go back to ascending order
    (listView.instance() as any)["_columnClick"](null, (listView.state('columns') as Array<any>)[0]); // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if the first item has ID 0 (ascending order)
    expect((listView.state('items') as Array<any>)[0]).to.have.property('id', 0); // eslint-disable-line @typescript-eslint/no-explicit-any

    done();
  });
});
/* tslint:enable */

/// <reference types="sinon" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ListView } from './ListView';
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    return Wrapper;
}(React.Component));
/* tslint:disable */
describe('<ListView />', function () {
    var listView;
    var dummyItems = [{
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
    var dummyViewFields = [
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
            render: function (item) {
                return React.createElement("a", { href: item.ServerRelativeUrl }, "Link");
            }
        }
    ];
    afterEach(function () {
        listView.unmount();
    });
    beforeEach(function () { });
    it('Test view with an empty array of items', function (done) {
        listView = mount(React.createElement(ListView, { items: [] })).update();
        expect(listView.state('items')).to.have.length(0);
        expect(listView.state('columns')).to.be.null; // eslint-disable-line @typescript-eslint/no-unused-expressions, no-unused-expressions
        done();
    });
    it('Test view with two items', function (done) {
        listView = mount(React.createElement(ListView, { items: dummyItems })).update();
        expect(listView.state('items')).to.have.length(2);
        expect(listView.state('columns')).to.be.null; // eslint-disable-line @typescript-eslint/no-unused-expressions, no-unused-expressions
        done();
    });
    it('Test view by updating the items porperty', function (done) {
        listView = mount(React.createElement(ListView, { items: [] })).update();
        expect(listView.state('items')).to.have.length(0);
        // Update the items property, now two items should be available
        listView.setProps({ items: dummyItems }).update();
        expect(listView.state('items')).to.have.length(2);
        done();
    });
    it('Test view with iconFieldName', function (done) {
        listView = mount(React.createElement(ListView, { items: dummyItems, iconFieldName: "path" })).update();
        expect(listView.state('items')).to.have.length(2);
        expect(listView.state('columns')).to.have.length(1);
        expect(listView.state('columns')[0]).to.have.property('key', 'fileType');
        done();
    });
    it('Test view with iconFieldName render method', function (done) {
        listView = mount(React.createElement(ListView, { items: dummyItems, iconFieldName: "path" })).update();
        var iconField = mount(React.createElement(Wrapper, {}, listView.state('columns')[0].onRender(dummyItems[0])));
        // Check if Word icon gets rendered
        expect(iconField.find('.ms-BrandIcon--docx')).to.have.length(1);
        done();
    });
    it('Test view with _flattenItems function', function (done) {
        listView = mount(React.createElement(ListView, { items: dummyItems })).update();
        expect(listView.state('items')).to.have.length(2);
        expect(listView.state('items')[0]).to.have.property('prop.sub', 1);
        expect(listView.state('items')[1]).to.have.property('prop.sub', 2);
        done();
    });
    it('Test view with viewFields', function (done) {
        listView = mount(React.createElement(ListView, { items: dummyItems, viewFields: dummyViewFields })).update();
        expect(listView.state('columns')).to.have.length(3);
        expect(listView.state('columns')[0]).to.have.property('key', 'id');
        expect(listView.state('columns')[0]).to.have.property('name', 'ID');
        expect(listView.state('columns')[0]).to.have.property('onRender', undefined);
        expect(listView.state('columns')[1]).to.have.property('key', 'title');
        expect(listView.state('columns')[1]).to.have.property('name', 'Document title');
        // onRender binded function because it is linked to path
        expect(listView.state('columns')[1]).to.have.property('onRender');
        expect(listView.state('columns')[2]).to.have.property('key', 'path');
        expect(listView.state('columns')[2]).to.have.property('name', 'path');
        // onRender binded function because a custom render function got specified
        expect(listView.state('columns')[2]).to.have.property('onRender');
        done();
    });
    it('Test out the sorting method', function (done) {
        listView = mount(React.createElement(ListView, { items: dummyItems, viewFields: dummyViewFields })).update();
        // Check if the ID column is not yet sorted
        expect(listView.state('columns')[0]).not.to.have.property('isSorted');
        // Test the column click event, this will trigger to sort the items
        listView.instance()["_columnClick"](null, listView.state('columns')[0]);
        // Check if the column is set to sorted
        expect(listView.state('columns')[0]).to.have.property('isSorted', true);
        expect(listView.state('columns')[0]).to.have.property('isSortedDescending', false);
        // Check if the first item has ID 0 (ascending order)
        expect(listView.state('items')[0]).to.have.property('id', 0);
        // Do another sorting test, this should sort the items in descending order
        listView.instance()["_columnClick"](null, listView.state('columns')[0]);
        expect(listView.state('columns')[0]).to.have.property('isSorted', true);
        expect(listView.state('columns')[0]).to.have.property('isSortedDescending', true);
        // Check if the first item has ID 0 (ascending order)
        expect(listView.state('items')[0]).to.have.property('id', 1);
        // Just to be sure, we should go back to ascending order
        listView.instance()["_columnClick"](null, listView.state('columns')[0]);
        // Check if the first item has ID 0 (ascending order)
        expect(listView.state('items')[0]).to.have.property('id', 0);
        done();
    });
});
/* tslint:enable */
//# sourceMappingURL=ListView.test.js.map
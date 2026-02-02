/// <reference types="sinon" />
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ComboBoxListItemPicker } from './ComboBoxListItemPicker';
import { RequestClientMock } from '../../common/mocks/RequestClientMock';
var mockHttpClient = new RequestClientMock(null);
mockHttpClient.Requests.push({
    url: "/sites/test-site/_api/web/lists('TestId')/items?$select=Id,Title&$filter=Id gt 0",
    method: "GET",
    resultString: JSON.stringify({ "odata.metadata": "", "value": [{ "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "9624204a-c049-49a1-8a18-a417872f8883", "odata.etag": "\"2\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(1)", "Id": 1, "ID": 1, "Title": "Test 1" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "8b0e4ce8-f1e4-4b17-8f95-1ea7d63fefd6", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(2)", "Id": 2, "ID": 2, "Title": "Test 2" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "62aea125-e442-44cf-ab08-c555ffdd2798", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(3)", "Id": 3, "ID": 3, "Title": "Test 3" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "a25c55b2-9a4f-4976-8a12-f77393abe437", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(4)", "Id": 4, "ID": 4, "Title": "Test 4" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "8c57be67-a9a8-46c8-8954-6e51d3464be2", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(5)", "Id": 5, "ID": 5, "Title": "Test 5" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "d130664b-4e28-4ae5-b567-a3189f887922", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(6)", "Id": 6, "ID": 6, "Title": "Test 6" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "6e333b93-3f19-40ee-943c-19817193a3de", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(7)", "Id": 7, "ID": 7, "Title": "Test 7" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "a0063d1f-66ab-461b-8032-7dd38d7b8749", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(8)", "Id": 8, "ID": 8, "Title": "Test 8" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "8aca4c7c-4922-45e9-9f03-7d4a4bb6f926", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(9)", "Id": 9, "ID": 9, "Title": "Test 9" }, { "odata.type": "SP.Data.Test_x0020_listListItem", "odata.id": "f352a0c8-711b-47e4-9990-2a7121f961c3", "odata.etag": "\"1\"", "odata.editLink": "Web/Lists(guid'490fae3c-f8cb-4b50-9737-f2c94f6b6727')/Items(10)", "Id": 10, "ID": 10, "Title": "Test 10" }] })
});
describe('<ComboBoxListItemPicker />', function () {
    it("Should render initial data", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", filter: "Id gt 0", listId: "TestId", onInitialized: function () {
                    expect(comboBox.state('availableOptions')).to.have.length(10);
                    resolve();
                }, onSelectedItem: function (item) { } }));
        });
    });
    it("Should call onSelectedItem", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", filter: "Id gt 0", listId: "TestId", onInitialized: function () {
                    var ddBtn = comboBox.find('.ms-Button-flexContainer').first();
                    ddBtn.simulate('click');
                    //actual list is not part of the component
                    var checkBoxBtn = document.querySelectorAll('.ms-ComboBox-option')[3];
                    checkBoxBtn.click();
                    //ddBtn.simulate('click');
                }, onSelectedItem: function (item) {
                    expect(item.Id).to.equal(4);
                    resolve();
                } }));
        });
    });
    it("Should initialize with default selection (id)", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", defaultSelectedItems: [1], filter: "Id gt 0", listId: "TestId", onInitialized: function () {
                    var ddInput = comboBox.find('.ms-ComboBox-Input').first();
                    expect(ddInput.getNode().value).to.be.equal("Test 1"); // eslint-disable-line @typescript-eslint/no-explicit-any
                    resolve();
                }, onSelectedItem: function (item) {
                } }));
        });
    });
    it("Should initialize with default selection (object)", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", defaultSelectedItems: [{ Id: 1, Title: "Test 1" }], filter: "Id gt 0", listId: "TestId", onInitialized: function () {
                    var ddInput = comboBox.find('.ms-ComboBox-Input').first();
                    expect(ddInput.getNode().value).to.be.equal("Test 1"); // eslint-disable-line @typescript-eslint/no-explicit-any
                    resolve();
                }, onSelectedItem: function (item) {
                } }));
        });
    });
    it("Should call onSelectedItem (multi)", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", filter: "Id gt 0", listId: "TestId", multiSelect: true, onInitialized: function () {
                    var ddBtn = comboBox.find('.ms-Button-flexContainer').first();
                    ddBtn.simulate('click');
                    //actual list is not part of the component
                    var checkBoxBtn = document.querySelectorAll('.ms-ComboBox-option')[3];
                    checkBoxBtn.click();
                    //ddBtn.simulate('click');
                }, onSelectedItem: function (item) {
                    expect(item.Id).to.equal(4);
                    expect(item.selected).to.be.equal(true);
                    var ddBtn = comboBox.find('.ms-Button-flexContainer').first();
                    ddBtn.simulate('click');
                    resolve();
                } }));
        });
    });
    it("Should initialize with default selection (multi) (object)", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", defaultSelectedItems: [{ Id: 1, Title: "Test 1" }, { Id: 2, Title: "Test 2" }], filter: "Id gt 0", listId: "TestId", multiSelect: true, onInitialized: function () {
                    var ddBtn = comboBox.find('.ms-Button-flexContainer').first();
                    ddBtn.simulate('click');
                    var checkBoxBtn = document.querySelectorAll('.ms-ComboBox-option')[0];
                    expect(checkBoxBtn.classList.contains("is-checked")).to.be.equal(true);
                    var ddInput = comboBox.find('.ms-ComboBox-Input').first();
                    expect(ddInput.getNode().value).to.be.equal("Test 1, Test 2"); // eslint-disable-line @typescript-eslint/no-explicit-any
                    ddBtn.simulate('click');
                    resolve();
                }, onSelectedItem: function (item) {
                } }));
        });
    });
    it("Should initialize with default selection (multi) (id)", function () {
        return new Promise(function (resolve, reject) {
            var comboBox = mount(React.createElement(ComboBoxListItemPicker, { columnInternalName: "Title", spHttpClient: mockHttpClient, webUrl: "/sites/test-site", defaultSelectedItems: [1, 2], filter: "Id gt 0", listId: "TestId", multiSelect: true, onInitialized: function () {
                    var ddBtn = comboBox.find('.ms-Button-flexContainer').first();
                    ddBtn.simulate('click');
                    var checkBoxBtn = document.querySelectorAll('.ms-ComboBox-option')[0];
                    expect(checkBoxBtn.classList.contains("is-checked")).to.be.equal(true);
                    var ddInput = comboBox.find('.ms-ComboBox-Input').first();
                    expect(ddInput.getNode().value).to.be.equal("Test 1, Test 2"); // eslint-disable-line @typescript-eslint/no-explicit-any
                    ddBtn.simulate('click');
                    resolve();
                }, onSelectedItem: function (item) {
                } }));
        });
    });
});
//# sourceMappingURL=ComboBoxListItemPicker.test.js.map
///<reference types="jest" />
import * as React from "react";
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { MockFileBrowserService } from "../../mock/services/MockFileBrowserService";
import SiteFilePickerTab from "../../../src/controls/filePicker/SiteFilePickerTab/SiteFilePickerTab";
import { assert } from "chai";

configure({ adapter: new Adapter() });

describe("<SiteFilePickerTab />", ()=>{
    test("should load initial data", async ()=>{
        let browserService = new MockFileBrowserService();
        browserService.getSiteMediaLibrariesResult = [{
            title: "Test library title",
            absoluteUrl: "https://test.sharepoint.com/sites/test-site/TestLibrary",
            serverRelativeUrl: "/sites/test-site/TestLibrary",
            webRelativeUrl: "/sites/test-site/TestLibrary",
            iconPath: "/sites/test-site/Assets/icon.png"
        }];
        let spContext = {
            pageContext:{
                web:{
                    title: "Test Web",
                    id: "test-web-id",
                    serverRelativeUrl: "/sites/test-web"
                }
            }
        }
        let siteFilePicker = mount(<SiteFilePickerTab
            fileBrowserService={browserService as any}
            context={spContext as any}
            accepts={["docx","xlsx"]}
            onSave={()=>{}}
            onClose={()=>{}}
            />)

        assert.isOk(siteFilePicker);
    });
});
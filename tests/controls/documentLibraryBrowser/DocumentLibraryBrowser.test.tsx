///<reference types="jest" />

import * as React from "react";
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { DocumentLibraryBrowser } from "../../../src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser";
import { MockFileBrowserService } from "../../mock/services/MockFileBrowserService";
import { assert } from "chai";
import { ILibrary } from "../../../src/services/FileBrowserService.types";

configure({ adapter: new Adapter() });

describe("<DocumentLibraryBrowser />", ()=>{
    test("should load initial data", async ()=>{
        let browserService = new MockFileBrowserService();
        browserService.getSiteMediaLibrariesResult = [{
            title: "Test library title",
            absoluteUrl: "https://test.sharepoint.com/sites/test-site/TestLibrary",
            serverRelativeUrl: "/sites/test-site/TestLibrary",
            webRelativeUrl: "/sites/test-site/TestLibrary",
            iconPath: "/sites/test-site/Assets/icon.png"
        }]
        let documentLibraryBrowser = mount(<DocumentLibraryBrowser
            fileBrowserService={browserService as any}
            onOpenLibrary={()=>{

            }}
            />);
        assert.equal(documentLibraryBrowser.getDOMNode().tagName, "DIV");

        await documentLibraryBrowser.instance().componentDidMount();
        documentLibraryBrowser.update();

        assert.equal(documentLibraryBrowser.getDOMNode().tagName, "DIV");
        assert.deepEqual(documentLibraryBrowser.instance().state.lists,browserService.getSiteMediaLibrariesResult);
    });
    test("should render library title", async ()=>{
        let browserService = new MockFileBrowserService();
        browserService.getSiteMediaLibrariesResult = [{
            title: "Test library title",
            absoluteUrl: "https://test.sharepoint.com/sites/test-site/TestLibrary",
            serverRelativeUrl: "/sites/test-site/TestLibrary",
            webRelativeUrl: "/sites/test-site/TestLibrary",
            iconPath: "/sites/test-site/Assets/icon.png"
        }]
        let documentLibraryBrowser = mount(<DocumentLibraryBrowser
            fileBrowserService={browserService as any}
            onOpenLibrary={()=>{

            }}
            />);
        //@ts-ignore
        let libraryTitle = documentLibraryBrowser.instance()._onRenderLibraryTile(browserService.getSiteMediaLibrariesResult[0],0);
        let iconControl = libraryTitle.props.children.props.children.props.children[0];
        let buttonControl = libraryTitle.props.children.props.children.props.children[1];
        assert.equal(iconControl.type.displayName,"StyledImageBase");
        assert.equal(buttonControl.type.displayName,"CustomizedDefaultButton");
    });
    test("should call onOpenLibrary", async ()=>{
        let asserted = false;
        let browserService = new MockFileBrowserService();
        browserService.getSiteMediaLibrariesResult = [{
            title: "Test library title",
            absoluteUrl: "https://test.sharepoint.com/sites/test-site/TestLibrary",
            serverRelativeUrl: "/sites/test-site/TestLibrary",
            webRelativeUrl: "/sites/test-site/TestLibrary",
            iconPath: "/sites/test-site/Assets/icon.png"
        }]
        let documentLibraryBrowser = mount(<DocumentLibraryBrowser
            fileBrowserService={browserService as any}
            onOpenLibrary={(selectedLibrary: ILibrary)=>{
                asserted = true;
                assert.deepEqual(selectedLibrary,browserService.getSiteMediaLibrariesResult[0]);
            }}
            />);
        //@ts-ignore
        documentLibraryBrowser.instance()._handleOpenLibrary(browserService.getSiteMediaLibrariesResult[0]);
        assert.isTrue(asserted);
    });
    test("should _getItemCountForPage 0", async ()=>{
        let browserService = new MockFileBrowserService();
        let documentLibraryBrowser = mount(<DocumentLibraryBrowser
            fileBrowserService={browserService as any}
            onOpenLibrary={(selectedLibrary: ILibrary)=>{
            }}
            />);
        //@ts-ignore
        documentLibraryBrowser.instance()._columnsCount = 4;
        //@ts-ignore
        assert.equal(documentLibraryBrowser.instance()._getItemCountForPage(0,{
            width: 1000
        }),12);
    });
});
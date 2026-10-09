///<reference types="jest" />

import * as React from "react";
import { mount } from "enzyme";
import { DocumentLibraryBrowser } from "../../../src/controls/filePicker/controls/DocumentLibraryBrowser/DocumentLibraryBrowser";
import { MockFileBrowserService } from "../../mock/services/MockFileBrowserService";
import { assert } from "chai";
import { ILibrary } from "../../../src/services/FileBrowserService.types";


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
        let documentLibraryBrowser = mount<DocumentLibraryBrowser>(<DocumentLibraryBrowser
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
        let documentLibraryBrowser = mount<DocumentLibraryBrowser>(<DocumentLibraryBrowser
            fileBrowserService={browserService as any}
            onOpenLibrary={()=>{

            }}
            />);
        await documentLibraryBrowser.instance().componentDidMount();
        documentLibraryBrowser.update();
        assert.equal(
            documentLibraryBrowser.getDOMNode().querySelector('.filePickerFolderCardTitle').textContent,
            "Test library title"
        );
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
        let documentLibraryBrowser = mount<DocumentLibraryBrowser>(<DocumentLibraryBrowser
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
    test("should render an empty library list", async ()=>{
        let browserService = new MockFileBrowserService();
        let documentLibraryBrowser = mount<DocumentLibraryBrowser>(<DocumentLibraryBrowser
            fileBrowserService={browserService as any}
            onOpenLibrary={(selectedLibrary: ILibrary)=>{
            }}
            />);
        await documentLibraryBrowser.instance().componentDidMount();
        documentLibraryBrowser.update();
        assert.equal(documentLibraryBrowser.find('.filePickerFolderCardTile').length, 0);
    });
});
///<reference types="jest" />
import * as React from "react";
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { FileBrowser } from "../../../src/controls/filePicker/controls/FileBrowser/FileBrowser";
import { MockFileBrowserService } from "../../mock/services/MockFileBrowserService";
import { IFile } from "../../../src/services/FileBrowserService.types";
import { assert } from "chai";
configure({ adapter: new Adapter() });

describe("<FileBrowser />", ()=>{
    test("should render loading animation", async ()=>{
        //The purpose of this test is to make sure we will see the loading animation before anything else.
        let mockFileBrowserService: MockFileBrowserService = new MockFileBrowserService();
        let component = mount(<FileBrowser 
            fileBrowserService={mockFileBrowserService as any}
            libraryUrl=""
            folderPath="string"
            accepts={[]}
            onChange={(filePickerResult) => {}}
            onOpenFolder={(folder: IFile) => {}}
        />);
        //as in package.json we map spinner to lib-common spinner mount will actually render the whole thing
        //so let's try to find our spinner by class name
        let spinner = component.getDOMNode().querySelector(".ms-Spinner-circle");
        assert.isOk(spinner);
    });
    test("should load initial data", async ()=>{
        //In this test we will call componentDidMount manually
        //As mounting in test context will not trigger full component lifecycle we have to do it on our own
        //(It won't be a case if we were to use @testing-library/react but this is a topic for another time:) )
        let mockFileBrowserService: MockFileBrowserService = new MockFileBrowserService();
        //FileBrowser uses getListItems method on fileBrowserService.
        //Our mock already provides that method, so let's assign our mock data
        mockFileBrowserService.getListItemsResult ={
            nextHref: undefined,
            items: [{
                name: "Test file",
                absoluteUrl: "https://test.sharepoint.com/sites/tea-point/Shared Documents/TestFile.docx",
                serverRelativeUrl: "/sites/tea-point/Shared Documents/TestFile.docx",
                isFolder: false,
                modified: "",
                fileIcon: "",
                fileType: "docx",
                // URL required to generate thumbnail preview
                spItemUrl: "",
                supportsThumbnail: false
            },{
                name: "Another test file",
                absoluteUrl: "https://test.sharepoint.com/sites/tea-point/Shared Documents/AnotherTestFile.docx",
                serverRelativeUrl: "/sites/tea-point/Shared Documents/AnotherTestFile.docx",
                isFolder: false,
                modified: "",
                fileIcon: "",
                fileType: "docx",
                // URL required to generate thumbnail preview
                spItemUrl: "",
                supportsThumbnail: false
            }]
          }
        //As we also want to validate correct data is passed to getListItem method, let's add some assertion in our mock event
        //Don't hesitate to peek the mock definition to check out how it's done.
        //To avoid false positives I declare asserted variable. 
        //It's value will be set to true in event handler and asserted at the end of this test
        let asserted = false;
        mockFileBrowserService.onGetListItems = (listUrl,folderPath,acceptedExtensions,nextPageParams)=>{
            assert.equal(listUrl, "Shared Documents");
            assert.equal(folderPath,"/");
            assert.deepEqual(acceptedExtensions,["docx","xlsx"]);
            //nextPageParams should be falsy in this case
            assert.isNotOk(nextPageParams);
            asserted = true;
        }
        let component = mount(<FileBrowser 
            fileBrowserService={mockFileBrowserService as any}
            libraryUrl="Shared Documents"
            folderPath="/"
            accepts={["docx","xlsx"]}
            onChange={(filePickerResult) => {}}
            onOpenFolder={(folder: IFile) => {}}
        />);
        //You could wonder - why not to test loading animation here instead of the previous test?
        //I want to avoid situation in which broken loading animation would affect test for loading data.
        //Those are two different functionalities I wish to test separately
        //as promised - here we are manually call lifecycle method. Note await keyword.
        await component.instance().componentDidMount();
        
        //Now, let's make sure our component is rerendered
        component.update();
        //And now let's find our rows. Note we are using lib-commonjs to mock details list which allows us to fully render the component
        let dataRows = component.getDOMNode().querySelectorAll('[data-automationid="DetailsRowFields"]')
        //We expect to have to rows. Content of each should be just the name of the document.
        assert.equal(dataRows[0].textContent,"Test file");
        assert.equal(dataRows[1].textContent,"Another test file");
        //And finally let's make sure we asserted the call to getListItems
        assert.isTrue(asserted);
    });
});
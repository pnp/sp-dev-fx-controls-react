///<reference types="jest" />
import * as React from "react";
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { ListItemAttachments } from "../../../src/controls/listItemAttachments/ListItemAttachments";
import { assert}  from "chai";

configure({ adapter: new Adapter() });

describe("<ListItemAttachments />",()=>{
    test("should render item attachment", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let mockSPService = {
            getListItemAttachments: (listId, itemId)=>Promise.resolve([{
                FileName : "Test file.docx",
                ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.docx"
            },{
                FileName : "Test file.xlsx",
                ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.xlsx"
            }])
        }

        let listItemAttachments = mount(<ListItemAttachments 
            context={mockContext as any} 
            listId="test-list-id"
            itemId={1}
            />);
        //@ts-ignore
        listItemAttachments.instance()._spservice = mockSPService;
        await listItemAttachments.instance().componentDidMount();
        listItemAttachments.update();
        
        let attachmentCards = listItemAttachments.getDOMNode().querySelectorAll('.ms-DocumentCard');
        let testWordCard = attachmentCards[0];
        let testExcelCard = attachmentCards[1];

        assert.equal(testWordCard.querySelector("img").src,"https://static2.sharepointonline.com/files/fabric/assets/item-types/96/docx.png");
        assert.equal(testWordCard.textContent,"Test file.docx");
        
        assert.equal(testExcelCard.querySelector("img").src,"https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xlsx.png");
        assert.equal(testExcelCard.textContent,"Test file.xlsx");
    });
    test("should render placeholder if item has no attachments", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let mockSPService = {
            getListItemAttachments: (listId, itemId)=>Promise.resolve([])
        }

        let listItemAttachments = mount(<ListItemAttachments 
            context={mockContext as any} 
            listId="test-list-id"
            itemId={1}
            />);
        //@ts-ignore
        listItemAttachments.instance()._spservice = mockSPService;
        await listItemAttachments.instance().componentDidMount();
        listItemAttachments.update();
        
        let placeholder = listItemAttachments.getDOMNode().querySelector('[aria-label="ListItemAttachmentslPlaceHolderButtonLabel"]');
        assert.isOk(placeholder)
    });
    test("should render placeholder if no item provided", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let mockSPService = {
            getListItemAttachments: (listId, itemId)=>Promise.resolve([{
                FileName : "Test file.docx",
                ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.docx"
            },{
                FileName : "Test file.xlsx",
                ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.xlsx"
            }
        ])
        }

        let listItemAttachments = mount(<ListItemAttachments 
            context={mockContext as any} 
            listId="test-list-id"
            />);
        //@ts-ignore
        listItemAttachments.instance()._spservice = mockSPService;
        await listItemAttachments.instance().componentDidMount();
        listItemAttachments.update();
        
        let placeholder = listItemAttachments.getDOMNode().querySelector('[aria-label="ListItemAttachmentslPlaceHolderButtonLabel"]');
        assert.isOk(placeholder)
    });
    test("should add and load attachments", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let asserted = false;
        let listItemAttachmentsRef = React.createRef<ListItemAttachments>();
        let mockFile =  new File([], "Test file.txt");
        let mockSPService = {
            getListItemAttachments: (listId, itemId)=>Promise.resolve([{
                FileName : "Test file.xlsx",
                ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.xlsx"
            },{
                FileName : "Test file.txt",
                ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.txt"
            }]),
            addAttachment: (listId: string, itemId: number, fileName: string, file: File, webUrl?: string)=>{
                assert.equal(listId,"test-list-id");
                assert.equal(itemId, 1);
                assert.equal(file, mockFile);
                asserted = true;
            }
        }
        let listItemAttachments = mount(<ListItemAttachments 
            context={mockContext as any} 
            ref={listItemAttachmentsRef}
            listId="test-list-id"
            />);
        //@ts-ignore
        listItemAttachments.instance()._spservice = mockSPService;
        await listItemAttachments.instance().componentDidMount();
        let placeholder = listItemAttachments.getDOMNode().querySelector('[aria-label="ListItemAttachmentslPlaceHolderButtonLabel"]');
        listItemAttachments.instance().setState({
            filesToUpload:[mockFile]
        });
        listItemAttachments.update();
        
        assert.isOk(placeholder)

        await listItemAttachmentsRef.current.uploadAttachments(1);

        listItemAttachments.update();
        let attachmentCards = listItemAttachments.getDOMNode().querySelectorAll('.ms-DocumentCard');
        let testWordCard = attachmentCards[0];
        let testTxtCard = attachmentCards[1];

        assert.equal(testWordCard.querySelector("img").src,"https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xlsx.png");
        assert.equal(testWordCard.textContent,"Test file.xlsx");
        
        assert.equal(testTxtCard.querySelector("img").src,"https://static2.sharepointonline.com/files/fabric/assets/item-types/96/txt.png");
        assert.equal(testTxtCard.textContent,"Test file.txt");

        assert.isTrue(asserted);
    });
    test("should delete without itemId provided", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let mockFile =  new File([], "Test file.txt");
        let mockFileToDelete =  new File([], "Test file to delete.txt");
        let listItemAttachments = mount(<ListItemAttachments 
            context={mockContext as any} 
            listId="test-list-id"
            />);

        await listItemAttachments.instance().componentDidMount();
        //@ts-ignore
        await listItemAttachments.instance()._onAttachmentUpload(mockFile);
        //@ts-ignore
        await listItemAttachments.instance()._onAttachmentUpload(mockFileToDelete);

        listItemAttachments.update();
        
        let attachmentCards = listItemAttachments.getDOMNode().querySelectorAll('.ms-DocumentCard');
        let mockFileCard = attachmentCards[0];
        let mockFileCardToDelete = attachmentCards[1];
        assert.equal(mockFileCard.textContent,"Test file.txt");
        assert.equal(mockFileCardToDelete.textContent,"Test file to delete.txt");

        listItemAttachments.instance().setState({
            file: {
                FileName: mockFileToDelete.name
            }
        });
        //@ts-ignore
        await listItemAttachments.instance().onConfirmedDeleteAttachment();
        listItemAttachments.update();
        
        attachmentCards = listItemAttachments.getDOMNode().querySelectorAll('.ms-DocumentCard');
        mockFileCard = attachmentCards[0];
        assert.equal(mockFileCard.textContent,"Test file.txt");
        assert.isNotOk(attachmentCards[1]);
    });
    test("should delete with itemId provided", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let asserted = false;
        let mockSPService = {
            getListItemAttachments: (listId, itemId)=>Promise.resolve([]),
            deleteAttachment: (fileName: string, listId: string, itemId: number)=>{
                assert.equal(fileName, "Test file.txt");
                assert.equal(listId, "test-list-id");
                assert.equal(itemId, 1);
                asserted = true;
                return Promise.resolve();
            }
        }
        jest.spyOn(mockSPService, "getListItemAttachments").mockReturnValueOnce(Promise.resolve([{
            FileName : "Test file.xlsx",
            ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.xlsx"
        },{
            FileName : "Test file.txt",
            ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.txt"
        }]));
        jest.spyOn(mockSPService, "getListItemAttachments").mockReturnValueOnce(Promise.resolve([{
            FileName : "Test file.xlsx",
            ServerRelativeUrl: "/sites/test-site/Shared Documents/TestFile.xlsx"
        }]));

        let listItemAttachments = mount(<ListItemAttachments 
            context={mockContext as any} 
            listId="test-list-id"
            itemId={1}
            />);

        //@ts-ignore
        listItemAttachments.instance()._spservice = mockSPService;
        await listItemAttachments.instance().componentDidMount();
        listItemAttachments.update();
        
        let attachmentCards = listItemAttachments.getDOMNode().querySelectorAll('.ms-DocumentCard');
        let mockFileCard = attachmentCards[0];
        let mockFileCardToDelete = attachmentCards[1];
        assert.equal(mockFileCard.textContent,"Test file.xlsx");
        assert.equal(mockFileCardToDelete.textContent,"Test file.txt");
        
        listItemAttachments.instance().setState({
            file: {
                FileName: "Test file.txt"
            }
        });
        //@ts-ignore
        await listItemAttachments.instance().onConfirmedDeleteAttachment();
        //@ts-ignore
        await listItemAttachments.instance().loadAttachments();
        listItemAttachments.update();
        
        attachmentCards = listItemAttachments.getDOMNode().querySelectorAll('.ms-DocumentCard');
        mockFileCard = attachmentCards[0];
        assert.equal(mockFileCard.textContent,"Test file.xlsx");
        assert.isNotOk(attachmentCards[1]);
    })
});
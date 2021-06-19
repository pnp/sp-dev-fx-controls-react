///<reference types="jest" />
import * as React from "react";
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { UploadAttachment } from "../../../src/controls/listItemAttachments/UploadAttachment";
import { assert}  from "chai";

configure({ adapter: new Adapter() });

describe("<UploadAttachment />", ()=>{
    test("should upload document with itemId provided", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let mockFile =  new File([], "Test file.txt");
        let asserted = false;
        let uploadAttachmentComponent = mount(<UploadAttachment
                listId="test-list-id"
                itemId={1}
                webUrl="/sites/test-site"
                context={mockContext as any}
                onAttachmentUpload={(file)=>{
                    assert.equal(file,mockFile);
                }}
            />);
            //@ts-ignore
            uploadAttachmentComponent.instance()._spservice = {
                addAttachment: (listId: string, itemId: number, fileName: string, file: File, webUrl?: string)=>{
                    assert.equal(listId,"test-list-id");
                    assert.equal(itemId, 1);
                    assert.equal(file, mockFile);
                    assert.equal(webUrl,"/sites/test-site");
                    asserted = true;
                }
            }
            //@ts-ignore
            await uploadAttachmentComponent.instance().addAttachment({
                target:{
                    files: [mockFile]
                }
            });
            assert.isTrue(asserted);
    });
    test("should not upload document without itemId provided", async ()=>{
        let mockContext = {
            pageContext:{
                web:{
                    absoluteUrl: "https://test.sharepoint.com/sites/test-site"
                }
            }
        };
        let mockFile =  new File([], "Test file.txt");
        let asserted = false;
        let uploadAttachmentComponent = mount(<UploadAttachment
                listId="test-list-id"
                webUrl="/sites/test-site"
                context={mockContext as any}
                onAttachmentUpload={(file)=>{
                    assert.equal(file,mockFile);
                    asserted = true;
                }}
            />);
            //@ts-ignore
            uploadAttachmentComponent.instance()._spservice = {
                addAttachment: (listId: string, itemId: number, fileName: string, file: File, webUrl?: string)=>{
                    throw Error("Upload called with no itemId!");
                }
            }
            //@ts-ignore
            await uploadAttachmentComponent.instance().addAttachment({
                target:{
                    files: [mockFile]
                }
            });
            assert.isTrue(asserted);
    });
});
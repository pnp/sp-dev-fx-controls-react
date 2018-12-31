import {sp, spODataEntity, Item, spODataEntityArray, PrincipalType, PrincipalSource, PrincipalInfo} from '@pnp/sp';
import {IAttachment} from "../controls/attachments/IAttachment";

export interface IAttachmentsDataService {

  getAttachments(listName: string, itemId: number|string);
  uploadAttachment(listName: string, itemId: number|string, file: any);
  deleteAttachment(listName: string, itemId: number|string, fileName: string);

}

export class AttachmentsDataService implements IAttachmentsDataService {

  constructor() {
  }

  public async getAttachments(listName: string, itemId: number|string): Promise<IAttachment[]> {

    try {

      let item = await sp
        .web
        .lists
        .getByTitle(listName)
        .items
        .getById(itemId as number);

      let attachments: IAttachment[] = await item.attachmentFiles.get();

      return attachments;

    } catch (e) {

      console.error(e);
      return null;

    }

  }
  public async uploadAttachment(listName: string, itemId: number|string, file: any): Promise<IAttachment[]> {

    try {

      let item = await sp
        .web
        .lists
        .getByTitle(listName)
        .items
        .getById(parseInt(itemId as string));

      let upload = await item
        .attachmentFiles
        .add(file.name, file);

      let _attachments: IAttachment[] = await this.getAttachments(listName, itemId);

      return _attachments;

    } catch (e) {

      console.log(e.message);

    }

  }

  public async deleteAttachment(listName: string, itemId: number|string, fileName: string): Promise<IAttachment[]> {

    try {

      let item = await sp
        .web
        .lists
        .getByTitle(listName)
        .items
        .getById(parseInt(itemId as string));

      let deleted = await item
        .attachmentFiles
        .getByName(fileName)
        .delete();

      let _attachments: IAttachment[] = await this.getAttachments(listName, itemId);

      return _attachments;

    } catch (e) {

      console.log(e.message);

    }

  }

}


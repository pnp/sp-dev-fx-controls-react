export interface IAttachment {
  FileName: string;
  ServerRelativeUrl: string;
}

export class Attachment implements IAttachment {
  constructor(
    public FileName: string = "",
    public ServerRelativeUrl: string = null
  ) {
  }
}

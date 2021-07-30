export interface IAddCommentPayload {
  text:string;
  mentions: IAddMention[];
}

interface IAddMention {
  email:string;
  name: string;
}

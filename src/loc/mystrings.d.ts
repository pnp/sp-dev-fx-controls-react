declare interface IControlStrings {
  SiteBreadcrumbLabel: string;
  ListViewGroupEmptyLabel: string;
  WebPartTitlePlaceholder: string;
  WebPartTitleLabel: string;
  DateTime:{[key: string]: string};
  SendEmailTo: string;
  StartChatWith: string;
  Contact: string;
  UpdateProfile: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}

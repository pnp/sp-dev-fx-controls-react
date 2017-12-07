declare interface IControlStrings {
  SiteBreadcrumbLabel: string;
  ListViewGroupEmptyLabel: string;
  WebPartTitlePlaceholder: string;
  WebPartTitleLabel: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}

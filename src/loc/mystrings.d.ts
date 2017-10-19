declare interface IControlStrings {
  SiteBreadcrumbLabel: string;
  ListViewGroupEmptyLabel: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}

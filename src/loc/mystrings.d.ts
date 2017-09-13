declare interface IControlStrings {
  SiteBreadcrumbLabel: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}

declare interface IControlStrings {
  PeoplePickerGroupNotFound: string;
  ListViewFilterLabel: string;

  PeoplePickerSearchText: string;
  peoplePickerComponentTooltipMessage: string;
  peoplePickerComponentErrorMessage: string;
  peoplePickerSuggestionsHeaderText: string;
  genericNoResultsFoundText: string;
  peoplePickerLoadingText: string;


  SiteBreadcrumbLabel: string;
  ListViewGroupEmptyLabel: string;
  WebPartTitlePlaceholder: string;
  WebPartTitleLabel: string;
  DateTime: { [key: string]: string };
  SendEmailTo: string;
  StartChatWith: string;
  Contact: string;
  UpdateProfile: string;

  // Taxonomy picker
  TaxonomyPickerNoTerms: string;
  TaxonomyPickerExpandTitle: string;
  TaxonomyPickerMenuTermSet: string;
  TaxonomyPickerInLabel: string;
  TaxonomyPickerTermSetLabel: string;

  ListItemPickerSelectValue: string;

  //Maps
  mapsErrorMessage: string;
  mapsLoadingText: string;
  mapsSearchButtonText: string;
  mapsTitlePrefix: string;

  //RichText
  HeaderNormalText: string;
  HeaderH2: string;
  HeaderH3: string;
  HeaderH4: string;
  HeaderBlockQuote: string;
  AlignLeft: string;
  AlignCenter: string;
  AlignRight: string;
  AlignJustify: string;
  ListBullet: string;
  ListNumbered: string;
  StyleTitle: string;
  BoldTitle: string;
  ItalicTitle: string;
  UnderlineTitle: string;
  AlignTitle: string;
  ListTitle: string;
  LinkTitle: string;
  MoreTitle: string;
  FormattingPaneTitle: string;
  CloseButton: string;
  InsertLinkTitle: string;
  AddressFieldLabel: string;
  TextToDisplayLabel: string;
  SaveButtonLabel: string;
  CancelButtonLabel: string;
  RemoveLinkLabel: string;
  ParagraphSectionTitle: string;
  HyperlinkSectionTitle: string;
  UndoTitle: string;
  RedoTitle: string;
  ClearFormattingTitle: string;
  FontStyleTitle: string;
  FontSizeTitle: string;
  StrikethroughTitle: string;
  SuperscriptTitle: string;
  SubscriptTitle: string;
  FontColorLabel: string;
  AutomaticFontColor: string;
  HighlightColorLabel: string;
  NoColorHighlightColor: string;
  IncreaseIndentTitle: string;
  DecreaseIndentTitle: string;
  ThemeColorsGroupName: string;
  HighlightColorsGroupName: string;
  StandardColorsGroupName: string;
  ThemeColorDarker: string;
  ThemeColorDark: string;
  ThemeColorDarkAlt: string;
  ThemeColorPrimary: string;
  ThemeColorSecondary: string;
  ThemeColorTertiary: string;
  ThemeColorNeutralSecondary: string;
  ThemeColorNeutralPrimaryAlt: string;
  ThemeColorNeutralPrimary: string;
  ThemeColorNeutralDark: string;
  HighlightColorYellow: string;
  HighlightColorGreen: string;
  HighlightColorAqua: string;
  HighlightColorMagenta: string;
  HighlightColorBlue: string;
  HighlightColorRed: string;
  HighlightColorDarkblue: string;
  HighlightColorTeal: string;
  HighlightColorDarkgreen: string;
  HighlightColorPurple: string;
  HighlightColorMaroon: string;
  HighlightColorGold: string;
  HighlightColorDarkgrey: string;
  HighlightColorGrey: string;
  HighlightColorBlack: string;
  StandardColorDarkred: string;
  StandardColorRed: string;
  StandardColorOrange: string;
  StandardColorYellow: string;
  StandardColorLightgreen: string;
  StandardColorGreen: string;
  StandardColorLightblue: string;
  StandardColorBlue: string;
  StandardColorDarkblue: string;
  StandardColorPurple: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}

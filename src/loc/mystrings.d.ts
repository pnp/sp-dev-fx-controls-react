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
  DateTime: IDateTimeStrings;
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

  ListItemAttachmentsActionDeleteIconTitle: string;
  ListItemAttachmentsactionDeleteTitle: string;
  ListItemAttachmentsfileDeletedMsg: string;
  ListItemAttachmentsfileDeleteError: string;
  ListItemAttachmentserrorLoadAttachments: string;
  ListItemAttachmentsconfirmDelete: string;
  ListItemAttachmentsdialogTitle: string;
  ListItemAttachmentsdialogOKbuttonLabel: string;
  ListItemAttachmentsdialogCancelButtonLabel: string;
  ListItemAttachmentsdialogOKbuttonLabelOnDelete: string;
  ListItemAttachmentsuploadAttachmentDialogTitle: string;
  ListItemAttachmentsuploadAttachmentButtonLabel: string;
  ListItemAttachmentsuploadAttachmentErrorMsg: String;
  ListItemAttachmentsCommandBarAddAttachmentLabel: string;
  ListItemAttachmentsloadingMessage: string;
  ListItemAttachmentslPlaceHolderIconText: string;
  ListItemAttachmentslPlaceHolderDescription: string;
  ListItemAttachmentslPlaceHolderButtonLabel: string;
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

declare interface IDateTimeStrings {
  L_RelativeDateTime_AFewSecondsFuture: string;
  L_RelativeDateTime_AFewSeconds: string;
  L_RelativeDateTime_AboutAMinuteFuture: string;
  L_RelativeDateTime_AboutAMinute: string;
  L_RelativeDateTime_XMinutesFuture: string;
  L_RelativeDateTime_XMinutes: string;
  L_RelativeDateTime_XMinutesFutureIntervals: string;
  L_RelativeDateTime_XMinutesIntervals: string;
  L_RelativeDateTime_AboutAnHourFuture: string;
  L_RelativeDateTime_AboutAnHour: string;
  L_RelativeDateTime_Tomorrow: string;
  L_RelativeDateTime_Yesterday: string;
  L_RelativeDateTime_TomorrowAndTime: string;
  L_RelativeDateTime_YesterdayAndTime: string;
  L_RelativeDateTime_XHoursFuture: string;
  L_RelativeDateTime_XHours: string;
  L_RelativeDateTime_XHoursFutureIntervals: string;
  L_RelativeDateTime_XHoursIntervals: string;
  L_RelativeDateTime_DayAndTime: string;
  L_RelativeDateTime_XDaysFuture: string;
  L_RelativeDateTime_XDays: string;
  L_RelativeDateTime_XDaysFutureIntervals: string;
  L_RelativeDateTime_XDaysIntervals: string;
  L_RelativeDateTime_Today: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}

export type ValidControls = "all" |
  "AccessibleAccordion" | "AdaptiveCardDesignerHost" | "AdaptiveCardHost" |
  "AnimatedDialog" | "Carousel" | "ChartControl" | "Calendar" |
  "ComboBoxListItemPicker" | "ContentTypePicker" | "Dashboard" | "DateTimePicker" |
  "DragDropFiles" | "DynamicForm" | "EnhancedThemeProvider" |
  "FieldCollectionData" | "FieldPicker" | "FilePicker" |
  "FileTypeIcon" | "FilterBar" | "FolderExplorer" | "FolderPicker" |
  "GridLayout" | "HoverReactionsBar" | "IconPicker" | "IFrameDialog" |
  "IFramePanel" | "ImagePicker" | "ListItemAttachments" | "ListItemComments" |
  "ListItemPicker" | "ListPicker" | "ListView" | "LivePersona" |
  "LocationPicker" | "Map" | "ModernAudio" |
  "ModernTaxonomyPicker" | "MonacoEditor" | "Pagination" | "PeoplePicker" |
  "Placeholder" | "Progress" | "ProgressStepsIndicator" | "RichText" |
  "ShareDialog" | "SecurityTrimmedControl" | "SiteBreadcrumb" | "SitePicker" |
  "TaxonomyPicker" | "TaxonomyTree" | "Teams" | "TermSetNavigation" |
  "TestControl" | "Toolbar" | "TreeView" |
  "UploadFiles" | "UserPicker" | "VariantThemeProvider" | "ViewPicker" |
  "WebPartTitle" | "WorldMap" ;

export type ControlVisibility = {
  [K in ValidControls]: boolean;
}

export interface IControlsTestWebPartProps {
  title: string;
  description: string;
  paginationTotalPages: number;
  dynamicFormListId: string;
  dynamicFormListItemId: string;
  dynamicFormErrorDialogEnabled: boolean;
  dynamicFormCustomFormattingEnabled: boolean;
  dynamicFormClientSideValidationEnabled: boolean;
  dynamicFormFieldValidationEnabled: boolean;
  dynamicFormFileSelectionEnabled: boolean;
  dynamicFormToggleTaxonomyPicker: boolean;
  controlVisibility: ControlVisibility
}

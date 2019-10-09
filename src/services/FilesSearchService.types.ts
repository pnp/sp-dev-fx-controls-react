export interface IRecentFile {
  fileUrl: string;
  key: string;
  name: string;
  editedBy: string;
}

export interface BingQuerySearchParams {
  aspect: string;
  size: string;
  license: string;
  query: string;

  maxFileSize?: number;
  maxResults?: number;
}

export interface IBingSearchResult {
  webSearchUrl: string;
  webSearchUrlPingSuffix: string;
  name: string;
  thumbnailUrl: string;
  datePublished: string;
  isFamilyFriendly: boolean;
  creativeCommons: string;
  contentUrl: string;
  contentUrlPingSuffix: string;
  hostPageUrl: string;
  hostPageUrlPingSuffix: string;
  contentSize: string;
  encodingFormat: string;
  hostPageDisplayUrl: string;
  width: number;
  height: number;
  thumbnail: Thumbnail;
  imageInsightsToken: string;
  insightsMetadata: InsightsMetadata;
  imageId: string;
  accentColor: string;
}

export interface ISearchResult {
  thumbnailUrl: string;
  contentUrl: string;
  displayUrl: string;
  key: string;
  width: number;
  height: number;
}


export interface InsightsMetadata {
  pagesIncludingCount: number;
  availableSizesCount: number;
  recipeSourcesCount?: number;
  bestRepresentativeQuery?: BestRepresentativeQuery;
}

export interface BestRepresentativeQuery {
  text: string;
  displayText: string;
  webSearchUrl: string;
  webSearchUrlPingSuffix: string;
}

export interface Thumbnail {
  width: number;
  height: number;
}

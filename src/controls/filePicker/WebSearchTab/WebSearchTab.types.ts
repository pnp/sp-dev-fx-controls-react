export interface ISearchSuggestion {
  topic: string;
  backgroundUrl: string;
}

export interface ISearchResult {
  thumbnailUrl: string;
  contentUrl: string;
  displayUrl: string;
  key: string;
  width: number;
  height: number;
}

export type ImageSize = 'All' | 'Small' | 'Medium' | 'Large' | 'Wallpaper';

export type ImageAspect = 'All' | 'Square' | 'Wide' | 'Tall';

export type ImageLicense = 'All' | 'Any';

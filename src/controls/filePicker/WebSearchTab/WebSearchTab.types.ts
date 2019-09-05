export interface ISearchSuggestion {
  topic: string;
  backgroundUrl: string;
}

export type ImageSize = 'All' | 'Small' | 'Medium' | 'Large' | 'Wallpaper';

export type ImageAspect = 'All' | 'Square' | 'Wide' | 'Tall';

export type ImageLicense = 'All' | 'Any';

/**
 * Rows per page
 */
export const ROWS_PER_PAGE = 3;

/**
 * Maximum row height
 */
export const MAX_ROW_HEIGHT = 250;

/**
 * This is the default search suggestions as of Jan 2019.
 * I have no idea where Bing gets them.
 * But you can provide your own when calling this component
 */
export const DEFAULT_SUGGESTIONS: ISearchSuggestion[] = [
  {
    topic: 'Backgrounds',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/background_b4f5f0fd0af42d6dc969f795cb65a13c.jpg'
  },
  {
    topic: 'Classrooms',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/classroom_a0b3addf2246028cb7486ddfb0783c6c.jpg'
  },
  {
    topic: 'Conferences',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/conference_b450359b0962cf464f691b68d7c6ecd1.jpg'
  },
  {
    topic: 'Meetings',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/meeting_694397debfa52bc06a952310af01d59d.jpg'
  },
  {
    topic: 'Patterns',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/pattern_6e7c8fd91c9b5fa47519aa3fd4a95a82.jpg'
  },
  {
    topic: 'Teamwork',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/teamwork_5841da2ae9b9424173f601d86e3a252c.jpg'
  },
  {
    topic: 'Technology',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/technology_9a8a4e09c090c65f4c0b3ea06bd48b83.jpg'
  },
  {
    topic: 'Scenery',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/scenery_abe5bfb8f3913bd52be279a793472ead.jpg'
  }
];

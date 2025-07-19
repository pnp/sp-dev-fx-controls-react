
/**
 * Data structure for map location items.
 * Represents a location point with metadata for display on the world map.
 */
export interface IData {
  /**
   * Unique identifier for the location.
   * @example "nyc-001" or "location-1"
   */
  id: string;

  /**
   * Display name of the location.
   * Used for search functionality and marker tooltips.
   * @example "New York City" or "Eiffel Tower"
   */
  name: string;

  /**
   * URL to an image representing this location.
   * Used for marker display or in tooltips.
   * @example "https://example.com/nyc-skyline.jpg"
   */
  imageUrl: string;

  /**
   * URL link associated with this location.
   * Can be used for navigation when marker is clicked.
   * @example "https://example.com/locations/new-york" or "/details/nyc"
   */
  link: string;

  /**
   * Geographic coordinates as [longitude, latitude] tuple.
   * Used to position the marker on the map.
   * @example [-74.006, 40.7128] // New York City coordinates
   */
  coordinates: [number, number];
}

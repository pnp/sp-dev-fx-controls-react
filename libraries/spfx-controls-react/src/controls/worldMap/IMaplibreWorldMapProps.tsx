import { IData } from "./IData";
import React from "react";
import { Theme } from "@fluentui/react-components";

/** Props for the world map component. */
export interface IMaplibreWorldMapProps {
  /**
   * Array of location data to display on the map. Each item must include coordinates as [longitude, latitude].
   * @example
   * ```tsx
   * const data = [
   *   { id: '1', name: 'New York', coordinates: [-74.006, 40.7128], imageUrl: '...', link: '...' }
   * ];
   * ```
   */
  data: IData[];

  /**
   * Callback function triggered when a marker is clicked.
   * @param c - The data item associated with the clicked marker
   * @example
   * ```tsx
   * onClick={(location) => console.log('Clicked:', location.name)}
   * ```
   */
  onClick?: (c: IData) => void;

  /**
   * Custom map style URL. If provided with mapKey, the key will be automatically appended.
   * If provided without mapKey, the URL will be used as-is.
   * @example
   * ```tsx
   * mapStyleUrl="https://api.maptiler.com/maps/satellite/style.json"
   * ```
   */
  mapStyleUrl?: string;

  /**
   * MapTiler API key for accessing premium map styles.
   * If provided alone, uses MapTiler streets style by default.
   * If not provided, falls back to free demo map.
   * @example
   * ```tsx
   * mapKey="your-maptiler-api-key-here"
   * ```
   */
  mapKey?: string;

  /**
   * Custom CSS styles for the map container.
   * @example
   * ```tsx
   * style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
   * ```
   */
  style?: React.CSSProperties;

  /**
   * Padding (in pixels) around the map when fitting bounds to show all markers.
   * @default 20
   * @example
   * ```tsx
   * fitPadding={50} // Adds 50px padding around markers when auto-fitting
   * ```
   */
  fitPadding?: number;

  /**
   * Title displayed above the map. Can be a string or React element.
   * @default 'World Map'
   * @example
   * ```tsx
   * title="My Custom Map"
   * // or
   * title={<h2>Interactive Location Map</h2>}
   * ```
   */
  title?: string | React.ReactNode;

  /**
   * Description text displayed below the title (not currently implemented in UI).
   * @example
   * ```tsx
   * description="Click on markers to view location details"
   * ```
   */
  description?: string | React.ReactNode;

  /**
   * CSS class name applied to the root container.
   * @example
   * ```tsx
   * className="my-custom-map-class"
   * ```
   */
  className?: string;

  /**
   * Configuration options for map markers appearance and behavior.
   */
  marker?: {
    /**
     * CSS class name applied to marker elements.
     * @example "custom-marker-style"
     */
    markerClassName?: string;

    /**
     * Custom CSS styles applied to marker elements.
     * @example {{ backgroundColor: 'red', borderRadius: '50%' }}
     */
    markerStyle?: React.CSSProperties;

    /**
     * Size of marker images in pixels.
     * @default 40
     * @example 60
     */
    imageSize?: number;

    /**
     * Custom function to render tooltip content for markers.
     * @param c - The data item for the marker
     * @returns React element to display in tooltip
     * @example
     * ```tsx
     * renderToolTip={(item) => <div><strong>{item.name}</strong><br/>{item.description}</div>}
     * ```
     */
    renderToolTip?: (c: IData) => React.ReactNode;

    /**
     * CSS class name applied to tooltip elements.
     * @example "custom-tooltip-style"
     */
    tooltipClassName?: string;

    /**
     * Custom CSS styles applied to tooltip elements.
     * @example {{ backgroundColor: 'black', color: 'white', padding: '8px' }}
     */
    tooltipStyle?: React.CSSProperties;
  }

  /**
   * Configuration options for the search functionality.
   */
  search?: {
    /**
     * Enable or disable the search feature.
     * @default true
     * @example
     * ```tsx
     * search={{ enabled: false }} // Disables search
     * ```
     */
    enabled?: boolean;

    /**
     * Placeholder text displayed in the search input.
     * @default "Search locations..."
     * @example
     * ```tsx
     * search={{ placeholder: "Find a city or landmark..." }}
     * ```
     */
    placeholder?: string;

    /**
     * Callback function triggered when search term changes or results are filtered.
     * @param searchTerm - The current search term
     * @param filteredData - Array of data items matching the search
     * @example
     * ```tsx
     * onSearchChange={(term, results) => {
     *   console.log(`Search: "${term}" found ${results.length} results`);
     * }}
     * ```
     */
    onSearchChange?: (searchTerm: string, filteredData: IData[]) => void;

    /**
     * Field to search on or a custom function to extract the search term from data items.
     * @default "name"
     * @example
     * ```tsx
     * // Search by specific field
     * searchField: "id"
     *
     * // Custom search function
     * searchField: (item) => `${item.name} ${item.description}`
     * ```
     */
    searchField?: keyof IData | ((item: IData) => string);

    /**
     * Zoom level to use when focusing on search results.
     * @default 8
     * @example
     * ```tsx
     * search={{ zoomLevel: 12 }} // Closer zoom for search results
     * ```
     */
    zoomLevel?: number;

    /**
     * Position of the search overlay on the map.
     * @default { top: '10px', left: '10px' }
     * @example
     * ```tsx
     * // Top-right position
     * search={{ position: { top: '10px', right: '10px' } }}
     *
     * // Bottom-left position
     * search={{ position: { bottom: '20px', left: '20px' } }}
     * ```
     */
    position?: {
      /** Distance from the top edge of the map */
      top?: string;
      /** Distance from the left edge of the map */
      left?: string;
      /** Distance from the right edge of the map */
      right?: string;
      /** Distance from the bottom edge of the map */
      bottom?: string;
    };
  }

  /**
   * Fluent UI theme object for consistent styling.
   * @example
   * ```tsx
   * import { useTheme } from '@fluentui/react-components';
   *
   * const theme = useTheme();
   * <MaplibreWorldMap theme={theme} />
   * ```
   */
  theme?: Theme
}

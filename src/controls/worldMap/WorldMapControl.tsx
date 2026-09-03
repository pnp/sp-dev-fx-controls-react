/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'maplibre-gl/dist/maplibre-gl.css';

import Map, { MapRef, StyleSpecification } from 'react-map-gl/maplibre';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SearchBox, Subtitle1, Text } from '@fluentui/react-components';

import { IData } from './IData';
import { IMaplibreWorldMapProps } from './IMaplibreWorldMapProps';
import MapNavigation from './MapNavigation';
import Marker from './Marker';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useCleanMapStyle } from './useCleanMapStyle';

const MULTI_STYLE_URLS = {
  satellite: (key: string) =>
    `https://api.maptiler.com/maps/satellite/style.json?key=${key}`,
  streets: (key: string) =>
    `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
  topo: (key: string) =>
    `https://api.maptiler.com/maps/topo-v2/style.json?key=${key}`,
  demo: `https://demotiles.maplibre.org/style.json`, // Free demo style (no key required)
};

const useStyles = () => ({
  container: css({
    padding: '20px',
  }),
  mapContainer: css({
    position: 'relative',
    marginTop: '20px',
  }),
  searchOverlay: css({
    position: 'absolute',
    zIndex: 1000,
    maxWidth: '300px',
    padding: '8px',
  }),
  searchResults: css({
    marginTop: '4px',
    fontSize: '12px',
    color: '#666',
  }),
});

/**
 * Main Maplibre world map component.
 * expects each data to already include a `coordinates: [lon, lat]` tuple.
 */
export const MaplibreWorldMap: React.FC<IMaplibreWorldMapProps> = ({
  data,
  onClick,
  mapStyleUrl,
  mapKey,
  style,
  fitPadding = 20,
  theme,
  marker,
  title,
  search,
}) => {
  const mapRef = useRef<MapRef>(null);
  const styles = useStyles();

  // Determine the final map style URL based on provided props
  const finalMapStyleUrl = useMemo(() => {
    // If user provides both mapKey and mapStyleUrl, use the mapStyleUrl as-is (assuming it already includes the key)
    if (mapKey && mapStyleUrl) {
      // Check if the URL already contains a key parameter
      if (mapStyleUrl.includes('?key=') || mapStyleUrl.includes('&key=')) {
        return mapStyleUrl;
      } else {
        // Add the key to the URL
        const separator = mapStyleUrl.includes('?') ? '&' : '?';
        return `${mapStyleUrl}${separator}key=${mapKey}`;
      }
    }

    // If only mapKey is provided, use the default streets style with the user's key
    if (mapKey && !mapStyleUrl) {
      return MULTI_STYLE_URLS.streets(mapKey);
    }

    // If only mapStyleUrl is provided, use it as-is
    if (!mapKey && mapStyleUrl) {
      return mapStyleUrl;
    }

    // If neither is provided, use the demo style (no key required)
    return MULTI_STYLE_URLS.demo;
  }, [mapKey, mapStyleUrl]);

  const cleanStyle = useCleanMapStyle(finalMapStyleUrl);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>(data);
  const [initialViewState] = useState({ longitude: 0, latitude: 20, zoom: 1 });

  // Search configuration with defaults
  const searchConfig = useMemo(
    () => ({
      enabled: search?.enabled ?? true,
      placeholder: search?.placeholder ?? strings.worldMapSearchLocations,
      searchField: search?.searchField ?? strings.worldMapSearchField,
      zoomLevel: search?.zoomLevel ?? 8,
      position: {
        top: '10px',
        left: '10px',
        ...search?.position,
      },
      ...search,
    }),
    [search]
  );

  // Reset to initial view when search is cleared
  const resetToInitialView = useCallback(() => {
    if (mapRef.current) {
      if (data.length > 0) {
        // Fit to all data
        const lons = data.map((c) => c.coordinates[0]);
        const lats = data.map((c) => c.coordinates[1]);
        mapRef.current.getMap().fitBounds(
          [
            [Math.min(...lons), Math.min(...lats)],
            [Math.max(...lons), Math.max(...lats)],
          ],
          { padding: fitPadding, duration: 1000 }
        );
      } else {
        // Reset to initial view state
        mapRef.current.getMap().flyTo({
          center: [initialViewState.longitude, initialViewState.latitude],
          zoom: initialViewState.zoom,
          duration: 1000,
        });
      }
    }
  }, [data, fitPadding, initialViewState]);

  // Filter data based on search term
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);

      if (!term.trim()) {
        setFilteredData(data);
        search?.onSearchChange?.(term, data);
        resetToInitialView();
        return;
      }

      const filtered = data.filter((item) => {
        const searchValue =
          typeof searchConfig.searchField === 'function'
            ? searchConfig.searchField(item)
            : (item[searchConfig.searchField as keyof IData] as string);

        return searchValue?.toLowerCase().includes(term.toLowerCase());
      });

      setFilteredData(filtered);
      search?.onSearchChange?.(term, filtered);

      // Auto-zoom to first result
      if (filtered.length > 0 && mapRef.current) {
        const firstResult = filtered[0];
        mapRef.current.getMap().flyTo({
          center: firstResult.coordinates,
          zoom: searchConfig.zoomLevel,
          duration: 1000,
        });
      }
    },
    [data, search, searchConfig, resetToInitialView]
  );

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setSearchTerm('');
    setFilteredData(data);
    search?.onSearchChange?.('', data);
    resetToInitialView();
  }, [data, search, resetToInitialView]);

  // Update filtered data when data prop changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      handleSearch(searchTerm);
    }
  }, [data, searchTerm, handleSearch]);

  const defaultMapStyles: React.CSSProperties = useMemo(
    () => ({
      width: '100%',
      height: '600px',
      fontFamily: theme?.fontFamilyBase,
      paddingTop: '20px',
      paddingBottom: '20px',
    }),
    [theme]
  );

  // Fit map to loaded markers
  useEffect(() => {
    if (!mapRef.current || filteredData.length === 0) return;
    const lons = filteredData.map((c) => c.coordinates[0]);
    const lats = filteredData.map((c) => c.coordinates[1]);
    mapRef.current.getMap().fitBounds(
      [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
      ],
      { padding: fitPadding }
    );
  }, [filteredData, fitPadding]);

  if (!cleanStyle) {
    return <Text>{strings.worldMapLoadintText}</Text>;
  }

  return (
    <div className={styles.container}>
      <Subtitle1>{title ?? strings.worldMapTitle}</Subtitle1>
      <div className={styles.mapContainer}>
        <Map
          ref={mapRef}
          initialViewState={{ longitude: 0, latitude: 20, zoom: 1 }}
          style={{ ...(style ?? defaultMapStyles) }}
          mapStyle={cleanStyle as unknown as StyleSpecification}
          pixelRatio={window.devicePixelRatio}
        >
          <MapNavigation
            mapRef={mapRef}
            initialViewState={{ longitude: 0, latitude: 20, zoom: 1 }}
          />
          {filteredData.map((dataItem) => (
            <Marker
              key={dataItem.id}
              data={dataItem}
              onClick={(e) => onClick?.(dataItem)}
              {...marker}
            />
          ))}
        </Map>

        {searchConfig.enabled && (
          <div
            className={styles.searchOverlay}
            style={{
              top: searchConfig.position.top,
              left: searchConfig.position.left,
              right: searchConfig.position.right,
              bottom: searchConfig.position.bottom,
            }}
          >
            <SearchBox
              placeholder={searchConfig.placeholder}
              value={searchTerm}
              onChange={(_, data) => handleSearch(data?.value || '')}
              dismiss={{
                onClick: handleSearchClear,
              }}
              size="medium"
              style={{ width: '100%', minWidth: '250px' }}
            />
            {searchTerm && (
              <div className={styles.searchResults}>
                {filteredData.length}{' '}
                {filteredData.length === 1
                  ? strings.worldMapLocationLabel
                  : strings.worldMapLocationPluralLabel}{' '}
                {strings.worldMapFoundLabel}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaplibreWorldMap;

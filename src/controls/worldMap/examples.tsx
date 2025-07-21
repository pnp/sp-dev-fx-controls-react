// Example usage of WorldMapControl with search functionality

import { IData } from './IData';
import { MaplibreWorldMap } from './WorldMapControl';
import React from 'react';

const ExampleWithSearch: React.FC = () => {
  const mapData: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/ny.jpg',
      link: 'https://example.com/ny',
      coordinates: [-74.006, 40.7128]
    },
    {
      id: '2',
      name: 'London',
      imageUrl: 'https://example.com/london.jpg',
      link: 'https://example.com/london',
      coordinates: [-0.1276, 51.5074]
    },
    {
      id: '3',
      name: 'Tokyo',
      imageUrl: 'https://example.com/tokyo.jpg',
      link: 'https://example.com/tokyo',
      coordinates: [139.6917, 35.6895]
    }
  ];

  const handleLocationClick = (location: IData): void => {
    console.log('Location clicked:', location.name);
  };

  const handleSearchChange = (searchTerm: string, filteredData: IData[]): void => {
    console.log('Search term:', searchTerm);
    console.log('Filtered results:', filteredData);
    if (!searchTerm) {
      console.log('Search cleared - map reset to initial view');
    }
  };

  return (
    <MaplibreWorldMap
      data={mapData}
      onClick={handleLocationClick}
      title="World Locations with Search"
      search={{
        enabled: true,
        placeholder: "Search for a city...",
        zoomLevel: 10,
        onSearchChange: handleSearchChange,
        searchField: 'name', // Can also be a function: (item) => item.name
        position: {
          top: '10px',
          left: '10px'
        }
      }}
      style={{
        width: '100%',
        height: '500px'
      }}
    />
  );
};

// Example with custom positioning (top-right)
const ExampleWithTopRightSearch: React.FC = () => {
  const mapData: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/ny.jpg',
      link: 'https://example.com/ny',
      coordinates: [-74.006, 40.7128]
    }
  ];

  return (
    <MaplibreWorldMap
      data={mapData}
      search={{
        enabled: true,
        placeholder: "Search...",
        position: {
          top: '10px',
          right: '10px'
        }
      }}
    />
  );
};

// Example with custom MapTiler API key
const ExampleWithCustomMapKey: React.FC = () => {
  const mapData: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/ny.jpg',
      link: 'https://example.com/ny',
      coordinates: [-74.006, 40.7128]
    }
  ];

  return (
    <MaplibreWorldMap
      data={mapData}
      mapKey="your-maptiler-api-key-here" // Uses streets style by default
      search={{
        enabled: true,
        placeholder: "Search with custom map..."
      }}
    />
  );
};

// Example with custom MapTiler API key and specific style
const ExampleWithCustomKeyAndStyle: React.FC = () => {
  const mapData: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/ny.jpg',
      link: 'https://example.com/ny',
      coordinates: [-74.006, 40.7128]
    }
  ];

  return (
    <MaplibreWorldMap
      data={mapData}
      mapKey="your-maptiler-api-key-here"
      mapStyleUrl="https://api.maptiler.com/maps/satellite/style.json" // Will automatically append the key
      search={{
        enabled: true
      }}
    />
  );
};

// Example using demo map (no key required)
const ExampleWithDemoMap: React.FC = () => {
  const mapData: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/ny.jpg',
      link: 'https://example.com/ny',
      coordinates: [-74.006, 40.7128]
    }
  ];

  return (
    <MaplibreWorldMap
      data={mapData}
      // No mapKey or mapStyleUrl provided - uses free demo map
      search={{
        enabled: true,
        placeholder: "Search demo map..."
      }}
    />
  );
};

// Example with search disabled
const ExampleWithoutSearch: React.FC = () => {
  const mapData: IData[] = [
    // ... your data
  ];

  return (
    <MaplibreWorldMap
      data={mapData}
      search={{
        enabled: false // Disables the search feature
      }}
    />
  );
};

// Example with custom search field
const ExampleWithCustomSearch: React.FC = () => {
  const mapData: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/ny.jpg',
      link: 'https://example.com/ny',
      coordinates: [-74.006, 40.7128]
    }
  ];

  return (
    <MaplibreWorldMap
      data={mapData}
      search={{
        enabled: true,
        placeholder: "Search by location or description...",
        zoomLevel: 8,
        // Custom search function that searches across multiple fields
        searchField: (item: IData) => `${item.name} ${item.link}`,
      }}
    />
  );
};

export {
  ExampleWithSearch,
  ExampleWithCustomSearch,
  ExampleWithoutSearch,
  ExampleWithTopRightSearch,
  ExampleWithCustomMapKey,
  ExampleWithCustomKeyAndStyle,
  ExampleWithDemoMap
};

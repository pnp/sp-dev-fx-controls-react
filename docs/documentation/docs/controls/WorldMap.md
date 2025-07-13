# WorldMapControl Documentation

A React component for displaying interactive world maps with markers, search functionality, and customizable styling using MapLibre GL JS.

This use Mapitiler API for map tiles and supports custom styles.
By default, it uses a free demo map without requiring an API key, but if you want to use MapTiler or a custom style, you can provide an API key and style URL.
To Get the API key, you can register on [MapTiler](https://www.maptiler.com/) and create a Account to get your API key.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
- [Data Structure](#data-structure)
- [Map Configuration](#map-configuration)
- [Search Feature](#search-feature)
- [Marker Customization](#marker-customization)
- [Examples](#examples)

## Installation

```bash
npm install @pnp/spfx-controls-react
```

## Example of WorldMapControl
![WorldMapControl Example](../assets/WorldMap.png)

## Basic Usage

```tsx
import React from 'react';
import { MaplibreWorldMap } from '@pnp/spfx-controls-react/lib/WorldMapControl';
import { IData } from '@pnp/spfx-controls-react/lib/worldMap';

const MyMapComponent: React.FC = () => {
  const locations: IData[] = [
    {
      id: '1',
      name: 'New York',
      imageUrl: 'https://example.com/nyc.jpg',
      link: 'https://example.com/nyc',
      coordinates: [-74.006, 40.7128]
    },
    {
      id: '2',
      name: 'London',
      imageUrl: 'https://example.com/london.jpg',
      link: 'https://example.com/london',
      coordinates: [-0.1276, 51.5074]
    }
  ];

  const handleMarkerClick = (location: IData) => {
    console.log('Clicked:', location.name);
    // Navigate to location.link or show details
  };

  return (
    <MaplibreWorldMap
      data={locations}
      onClick={handleMarkerClick}
      title="My World Map"
    />
  );
};
```

## Properties

### Core Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `data` | `IData[]` | ✅ | - | Array of location data to display |
| `onClick` | `(item: IData) => void` | ❌ | - | Callback when marker is clicked |
| `title` | `string \| ReactNode` | ❌ | `'World Map'` | Map title |
| `style` | `CSSProperties` | ❌ | - | Custom styles for map container |
| `className` | `string` | ❌ | - | CSS class for root container |
| `theme` | `Theme` | ❌ | - | Fluent UI theme object |

### Map Configuration

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `mapKey` | `string` | ❌ | - | MapTiler API key |
| `mapStyleUrl` | `string` | ❌ | - | Custom map style URL |
| `fitPadding` | `number` | ❌ | `20` | Padding when fitting to markers |

### Search Configuration

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `search.enabled` | `boolean` | ❌ | `true` | Enable search feature |
| `search.placeholder` | `string` | ❌ | `'Search locations...'` | Search input placeholder |
| `search.searchField` | `keyof IData \| function` | ❌ | `'name'` | Field to search or custom function |
| `search.zoomLevel` | `number` | ❌ | `8` | Zoom level for search results |
| `search.position` | `object` | ❌ | `{top: '10px', left: '10px'}` | Search overlay position |
| `search.onSearchChange` | `function` | ❌ | - | Callback when search changes |

### Marker Configuration

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `marker.markerClassName` | `string` | ❌ | - | CSS class for markers |
| `marker.markerStyle` | `CSSProperties` | ❌ | - | Custom marker styles |
| `marker.imageSize` | `number` | ❌ | `40` | Marker image size (px) |
| `marker.renderToolTip` | `function` | ❌ | - | Custom tooltip renderer |
| `marker.tooltipClassName` | `string` | ❌ | - | CSS class for tooltips |
| `marker.tooltipStyle` | `CSSProperties` | ❌ | - | Custom tooltip styles |

## Data Structure

Each location item must implement the `IData` interface:

```tsx
interface IData {
  id: string;                    // Unique identifier
  name: string;                  // Display name (used for search)
  imageUrl: string;              // Image URL for marker/tooltip
  link: string;                  // Associated URL/link
  coordinates: [number, number]; // [longitude, latitude]
}
```

### Example Data

```tsx
const sampleData: IData[] = [
  {
    id: 'paris-001',
    name: 'Paris, France',
    imageUrl: 'https://example.com/images/paris.jpg',
    link: 'https://example.com/locations/paris',
    coordinates: [2.3522, 48.8566] // [longitude, latitude]
  },
  {
    id: 'tokyo-001',
    name: 'Tokyo, Japan',
    imageUrl: 'https://example.com/images/tokyo.jpg',
    link: '/locations/tokyo',
    coordinates: [139.6917, 35.6895]
  }
];
```

## Map Configuration

### Using Demo Map (Free)

```tsx
<MaplibreWorldMap data={locations} />
```

### Using MapTiler API Key

```tsx
<MaplibreWorldMap
  data={locations}
  mapKey="your-maptiler-api-key"
/>
```

### Custom Map Style

```tsx
<MaplibreWorldMap
  data={locations}
  mapKey="your-api-key"
  mapStyleUrl="https://api.maptiler.com/maps/satellite/style.json"
/>
```

### Map Style Priority

1. **mapKey + mapStyleUrl**: Uses the style URL with API key
2. **mapKey only**: Uses MapTiler streets style
3. **mapStyleUrl only**: Uses URL as-is
4. **Neither**: Uses free demo map

## Search Feature

### Basic Search

```tsx
<MaplibreWorldMap
  data={locations}
  search={{
    enabled: true,
    placeholder: "Find a location..."
  }}
/>
```

### Custom Search Field

```tsx
<MaplibreWorldMap
  data={locations}
  search={{
    searchField: 'id', // Search by ID instead of name
  }}
/>
```

### Custom Search Function

```tsx
<MaplibreWorldMap
  data={locations}
  search={{
    searchField: (item) => `${item.name} ${item.link}`, // Search multiple fields
    onSearchChange: (term, results) => {
      console.log(`Found ${results.length} results for "${term}"`);
    }
  }}
/>
```

### Search Positioning

```tsx
<MaplibreWorldMap
  data={locations}
  search={{
    position: {
      top: '10px',
      right: '10px' // Top-right corner
    }
  }}
/>
```

## Marker Customization

### Basic Marker Styling

```tsx
<MaplibreWorldMap
  data={locations}
  marker={{
    imageSize: 50,
    markerStyle: {
      borderRadius: '50%',
      border: '2px solid #0078d4'
    }
  }}
/>
```

### Custom Tooltips

```tsx
<MaplibreWorldMap
  data={locations}
  marker={{
    renderToolTip: (item) => (
      <div>
        <h4>{item.name}</h4>
        <img src={item.imageUrl} alt={item.name} style={{width: '100px'}} />
        <p>Click to visit: <a href={item.link}>Learn more</a></p>
      </div>
    ),
    tooltipStyle: {
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '12px',
      maxWidth: '200px'
    }
  }}
/>
```

## Examples

### Complete Example with All Features

```tsx
import React from 'react';
import { MaplibreWorldMap } from '@pnp/spfx-controls-react/lib/WorldMapControl';
import { IData } from '@pnp/spfx-controls-react/lib/worldMap';

const AdvancedMapExample: React.FC = () => {
  const locations: IData[] = [
    {
      id: 'nyc',
      name: 'New York City',
      imageUrl: 'https://example.com/nyc.jpg',
      link: 'https://example.com/nyc',
      coordinates: [-74.006, 40.7128]
    },
    // ... more locations
  ];

  const handleLocationClick = (location: IData) => {
    window.open(location.link, '_blank');
  };

  const handleSearchChange = (term: string, results: IData[]) => {
    console.log(`Search: "${term}" - ${results.length} results`);
  };

  return (
    <MaplibreWorldMap
      data={locations}
      onClick={handleLocationClick}
      mapKey="your-maptiler-api-key"
      title="Global Office Locations"
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #e1e1e1',
        borderRadius: '8px'
      }}
      fitPadding={50}
      search={{
        enabled: true,
        placeholder: "Search office locations...",
        zoomLevel: 10,
        position: { top: '15px', right: '15px' },
        onSearchChange: handleSearchChange,
        searchField: (item) => `${item.name} ${item.id}`
      }}
      marker={{
        imageSize: 45,
        markerStyle: {
          borderRadius: '50%',
          border: '3px solid #0078d4',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        },
        renderToolTip: (item) => (
          <div>
            <h4 style={{margin: '0 0 8px 0'}}>{item.name}</h4>
            <img 
              src={item.imageUrl} 
              alt={item.name}
              style={{width: '120px', borderRadius: '4px'}}
            />
            <p style={{margin: '8px 0 0 0', fontSize: '12px'}}>
              Click marker to visit location page
            </p>
          </div>
        ),
        tooltipStyle: {
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '12px',
          maxWidth: '160px',
          textAlign: 'center'
        }
      }}
    />
  );
};

export default AdvancedMapExample;
```

### Minimal Example

```tsx
<MaplibreWorldMap
  data={[
    {
      id: '1',
      name: 'Paris',
      imageUrl: 'paris.jpg',
      link: '/paris',
      coordinates: [2.3522, 48.8566]
    }
  ]}
  onClick={(location) => alert(`Clicked: ${location.name}`)}
/>
```

## TypeScript Support

The component is fully typed with TypeScript. Import the interfaces for type safety:

```tsx
import { IMaplibreWorldMapProps, IData } from '@pnp/spfx-controls-react/lib/worldMap';

const MyComponent: React.FC<{locations: IData[]}> = ({ locations }) => {
  const mapProps: IMaplibreWorldMapProps = {
    data: locations,
    onClick: (item) => console.log(item.name),
    // ... other props with full type checking
  };

  return <MaplibreWorldMap {...mapProps} />;
};
```

## Browser Support

- Modern browsers with ES6+ support
- WebGL support required for map rendering
- Mobile browsers supported

## Performance Tips

1. **Limit data size**: For large datasets (>100 markers), consider clustering or pagination
2. **Optimize images**: Use appropriate image sizes for markers
3. **API key**: Use your own MapTiler API key for production to avoid rate limits
4. **Lazy loading**: Load the component only when needed to reduce initial bundle size

## Troubleshooting

### Common Issues

1. **Map not loading**: Check if `mapKey` is valid or use demo map
2. **Markers not appearing**: Verify `coordinates` format is `[longitude, latitude]`
3. **Search not working**: Ensure `searchField` matches available data properties
4. **Performance issues**: Reduce number of markers or optimize marker images

### Getting Help

- Check the browser console for error messages
- Verify all required properties are provided
- Ensure coordinate format is correct (longitude first, then latitude)
- Test with demo data to isolate issues

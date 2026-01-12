var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'maplibre-gl/dist/maplibre-gl.css';
import Map from 'react-map-gl/maplibre';
import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { SearchBox, Subtitle1, Text } from '@fluentui/react-components';
import MapNavigation from './MapNavigation';
import Marker from './Marker';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useCleanMapStyle } from './useCleanMapStyle';
var MULTI_STYLE_URLS = {
    satellite: function (key) {
        return "https://api.maptiler.com/maps/satellite/style.json?key=".concat(key);
    },
    streets: function (key) {
        return "https://api.maptiler.com/maps/streets/style.json?key=".concat(key);
    },
    topo: function (key) {
        return "https://api.maptiler.com/maps/topo-v2/style.json?key=".concat(key);
    },
    demo: "https://demotiles.maplibre.org/style.json", // Free demo style (no key required)
};
var useStyles = function () { return ({
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
}); };
/**
 * Main Maplibre world map component.
 * expects each data to already include a `coordinates: [lon, lat]` tuple.
 */
export var MaplibreWorldMap = function (_a) {
    var data = _a.data, onClick = _a.onClick, mapStyleUrl = _a.mapStyleUrl, mapKey = _a.mapKey, style = _a.style, _b = _a.fitPadding, fitPadding = _b === void 0 ? 20 : _b, theme = _a.theme, marker = _a.marker, title = _a.title, search = _a.search;
    var mapRef = useRef(null);
    var styles = useStyles();
    // Determine the final map style URL based on provided props
    var finalMapStyleUrl = useMemo(function () {
        // If user provides both mapKey and mapStyleUrl, use the mapStyleUrl as-is (assuming it already includes the key)
        if (mapKey && mapStyleUrl) {
            // Check if the URL already contains a key parameter
            if (mapStyleUrl.includes('?key=') || mapStyleUrl.includes('&key=')) {
                return mapStyleUrl;
            }
            else {
                // Add the key to the URL
                var separator = mapStyleUrl.includes('?') ? '&' : '?';
                return "".concat(mapStyleUrl).concat(separator, "key=").concat(mapKey);
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
    var cleanStyle = useCleanMapStyle(finalMapStyleUrl);
    var _c = useState(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = useState(data), filteredData = _d[0], setFilteredData = _d[1];
    var initialViewState = useState({ longitude: 0, latitude: 20, zoom: 1 })[0];
    // Search configuration with defaults
    var searchConfig = useMemo(function () {
        var _a, _b, _c, _d;
        return (__assign({ enabled: (_a = search === null || search === void 0 ? void 0 : search.enabled) !== null && _a !== void 0 ? _a : true, placeholder: (_b = search === null || search === void 0 ? void 0 : search.placeholder) !== null && _b !== void 0 ? _b : strings.worldMapSearchLocations, searchField: (_c = search === null || search === void 0 ? void 0 : search.searchField) !== null && _c !== void 0 ? _c : strings.worldMapSearchField, zoomLevel: (_d = search === null || search === void 0 ? void 0 : search.zoomLevel) !== null && _d !== void 0 ? _d : 8, position: __assign({ top: '10px', left: '10px' }, search === null || search === void 0 ? void 0 : search.position) }, search));
    }, [search]);
    // Reset to initial view when search is cleared
    var resetToInitialView = useCallback(function () {
        if (mapRef.current) {
            if (data.length > 0) {
                // Fit to all data
                var lons = data.map(function (c) { return c.coordinates[0]; });
                var lats = data.map(function (c) { return c.coordinates[1]; });
                mapRef.current.getMap().fitBounds([
                    [Math.min.apply(Math, lons), Math.min.apply(Math, lats)],
                    [Math.max.apply(Math, lons), Math.max.apply(Math, lats)],
                ], { padding: fitPadding, duration: 1000 });
            }
            else {
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
    var handleSearch = useCallback(function (term) {
        var _a, _b;
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredData(data);
            (_a = search === null || search === void 0 ? void 0 : search.onSearchChange) === null || _a === void 0 ? void 0 : _a.call(search, term, data);
            resetToInitialView();
            return;
        }
        var filtered = data.filter(function (item) {
            var searchValue = typeof searchConfig.searchField === 'function'
                ? searchConfig.searchField(item)
                : item[searchConfig.searchField];
            return searchValue === null || searchValue === void 0 ? void 0 : searchValue.toLowerCase().includes(term.toLowerCase());
        });
        setFilteredData(filtered);
        (_b = search === null || search === void 0 ? void 0 : search.onSearchChange) === null || _b === void 0 ? void 0 : _b.call(search, term, filtered);
        // Auto-zoom to first result
        if (filtered.length > 0 && mapRef.current) {
            var firstResult = filtered[0];
            mapRef.current.getMap().flyTo({
                center: firstResult.coordinates,
                zoom: searchConfig.zoomLevel,
                duration: 1000,
            });
        }
    }, [data, search, searchConfig, resetToInitialView]);
    // Handle search clear
    var handleSearchClear = useCallback(function () {
        var _a;
        setSearchTerm('');
        setFilteredData(data);
        (_a = search === null || search === void 0 ? void 0 : search.onSearchChange) === null || _a === void 0 ? void 0 : _a.call(search, '', data);
        resetToInitialView();
    }, [data, search, resetToInitialView]);
    // Update filtered data when data prop changes
    useEffect(function () {
        if (!searchTerm.trim()) {
            setFilteredData(data);
        }
        else {
            handleSearch(searchTerm);
        }
    }, [data, searchTerm, handleSearch]);
    var defaultMapStyles = useMemo(function () { return ({
        width: '100%',
        height: '600px',
        fontFamily: theme === null || theme === void 0 ? void 0 : theme.fontFamilyBase,
        paddingTop: '20px',
        paddingBottom: '20px',
    }); }, [theme]);
    // Fit map to loaded markers
    useEffect(function () {
        if (!mapRef.current || filteredData.length === 0)
            return;
        var lons = filteredData.map(function (c) { return c.coordinates[0]; });
        var lats = filteredData.map(function (c) { return c.coordinates[1]; });
        mapRef.current.getMap().fitBounds([
            [Math.min.apply(Math, lons), Math.min.apply(Math, lats)],
            [Math.max.apply(Math, lons), Math.max.apply(Math, lats)],
        ], { padding: fitPadding });
    }, [filteredData, fitPadding]);
    if (!cleanStyle) {
        return React.createElement(Text, null, strings.worldMapLoadintText);
    }
    return (React.createElement("div", { className: styles.container },
        React.createElement(Subtitle1, null, title !== null && title !== void 0 ? title : strings.worldMapTitle),
        React.createElement("div", { className: styles.mapContainer },
            React.createElement(Map, { ref: mapRef, initialViewState: { longitude: 0, latitude: 20, zoom: 1 }, style: __assign({}, (style !== null && style !== void 0 ? style : defaultMapStyles)), mapStyle: cleanStyle, pixelRatio: window.devicePixelRatio },
                React.createElement(MapNavigation, { mapRef: mapRef, initialViewState: { longitude: 0, latitude: 20, zoom: 1 } }),
                filteredData.map(function (dataItem) { return (React.createElement(Marker, __assign({ key: dataItem.id, data: dataItem, onClick: function (e) { return onClick === null || onClick === void 0 ? void 0 : onClick(dataItem); } }, marker))); })),
            searchConfig.enabled && (React.createElement("div", { className: styles.searchOverlay, style: {
                    top: searchConfig.position.top,
                    left: searchConfig.position.left,
                    right: searchConfig.position.right,
                    bottom: searchConfig.position.bottom,
                } },
                React.createElement(SearchBox, { placeholder: searchConfig.placeholder, value: searchTerm, onChange: function (_, data) { return handleSearch((data === null || data === void 0 ? void 0 : data.value) || ''); }, dismiss: {
                        onClick: handleSearchClear,
                    }, size: "medium", style: { width: '100%', minWidth: '250px' } }),
                searchTerm && (React.createElement("div", { className: styles.searchResults },
                    filteredData.length,
                    ' ',
                    filteredData.length === 1
                        ? strings.worldMapLocationLabel
                        : strings.worldMapLocationPluralLabel,
                    ' ',
                    strings.worldMapFoundLabel)))))));
};
export default MaplibreWorldMap;
//# sourceMappingURL=WorldMapControl.js.map
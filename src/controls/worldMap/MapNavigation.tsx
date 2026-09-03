import * as React from 'react';

import {
  ArrowReset24Regular,
  ZoomIn24Regular,
  ZoomOut24Regular,
} from '@fluentui/react-icons';
import {
  Button,
  Tooltip,
  shorthands,
} from '@fluentui/react-components';

import { MapRef } from 'react-map-gl/maplibre';
import { css } from '@emotion/css';
import strings from 'ControlStrings';

export interface MapNavigationProps {
  mapRef: React.RefObject<MapRef>;
  initialViewState?: { longitude: number; latitude: number; zoom: number };
  vertical?: boolean;
}

const navStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  background: tokens.colorNeutralBackground1;
  border-radius: 8px;
  box-shadow: tokens.shadow4;
  padding: 4px;
  display: flex;
  gap: 8px;
`;

const navStyleVertical = css`
  flex-direction: column;
`;

const buttonStyle = css`
  min-width: 32px;
  min-height: 32px;
  ${shorthands.padding('4px')}
`;

export const MapNavigation: React.FC<MapNavigationProps> = ({
  mapRef,
  initialViewState = { longitude: 0, latitude: 20, zoom: 1 },
  vertical = true,
}) => {
  const handleZoomIn = React.useCallback((): void => {
    mapRef.current?.getMap().zoomIn();
  }, [mapRef]);
  const handleZoomOut = React.useCallback((): void => {
    mapRef.current?.getMap().zoomOut();
  }, [mapRef]);
  const handleReset = React.useCallback((): void => {
    mapRef.current?.flyTo({
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      essential: true,
    });
  }, [mapRef, initialViewState]);

  return (
    <div className={vertical ? `${navStyle} ${navStyleVertical}` : navStyle}>
      <Tooltip content={strings.worldMapZoomContent} relationship="label">
        <Button
          appearance="subtle"
          icon={<ZoomIn24Regular />}
          aria-label={strings.worldMapZoomIn}
          className={buttonStyle}
          onClick={handleZoomIn}
        />
      </Tooltip>
      <Tooltip content={strings.worldMapZoomOut} relationship="label">
        <Button
          appearance="subtle"
          icon={<ZoomOut24Regular />}
          aria-label={strings.worldMapZoomOut}
          className={buttonStyle}
          onClick={handleZoomOut}
        />
      </Tooltip>
      <Tooltip content={strings.worldMapResetMap} relationship="label">
        <Button
          appearance="subtle"
          icon={<ArrowReset24Regular />}
          aria-label={strings.worldMapReset}
          className={buttonStyle}
          onClick={handleReset}
        />
      </Tooltip>
    </div>
  );
};

export default MapNavigation;

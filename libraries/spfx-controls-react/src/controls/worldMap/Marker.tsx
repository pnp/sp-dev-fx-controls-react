import * as React from 'react';

import { Tooltip, tokens } from '@fluentui/react-components';

import { IMarkerProps } from './IMarkerProps';
import { Marker as MapMarker } from 'react-map-gl/maplibre';
import TooltipContent from './TooltipContent';
import { css } from '@emotion/css';
import strings from 'ControlStrings';

const useStyles = (): { flag: string; tooltipContent: string } => {
  return {
    flag: css`
      width: 22px;
      height: 10px;
      border-radius: 4px;
      box-shadow: '${tokens.shadow4};
      border: 1px solid ${tokens.colorNeutralStroke2};
      cursor: pointer;
      display: block;
      margin: 0 auto;
    `,
    tooltipContent: css`
      background-color: ${tokens.colorBrandBackground2};
    `,
  };
};

export const Marker: React.FC<IMarkerProps> = ({
  data,
  onClick,
  markerClassName,
  markerStyle,

  renderToolTip,
  tooltipClassName,
  tooltipStyle,
}) => {
  const styles = useStyles();

  return (
    <MapMarker
      longitude={data.coordinates[0]}
      latitude={data.coordinates[1]}
      anchor="bottom"
      onClick={() => onClick && onClick(data)}
      className={markerClassName ?? styles.flag}
      style={markerStyle ?? undefined}
    >
      <Tooltip
        content={{
          children: renderToolTip ?? <TooltipContent data={data} />,
          style: { ...tooltipStyle },
          className: tooltipClassName ?? styles.tooltipContent,
        }}
        relationship="label"
      >
        <img
          src={data.imageUrl}
          alt={`${data.name} ${strings.worldMapFlag}`}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
          style={{ cursor: 'pointer' }}
        />
      </Tooltip>
    </MapMarker>
  );
};
export default Marker;

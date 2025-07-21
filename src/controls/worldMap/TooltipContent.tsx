import * as React from "react";

import {
  Text,
  tokens,
} from "@fluentui/react-components";

import { IData } from "./IData";
import { css } from "@emotion/css";
import strings from "ControlStrings";

export interface CountryTooltipContentProps {
 data: IData;
}

const stackStyles = css`
  min-width: 160px;

  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  background-color: ${tokens.colorBrandBackground2};
  padding: 0;
  min-width: 100px;
`;

const rowStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const imageStyles = css`
  width: 32px;
  height: 20px;
  display: block;
  border-radius: 4px;
  box-shadow: '${tokens.shadow4};
`;

const titleStyles = css`
  font-weight: 600;
  font-size: 1rem;
`;

const subTitleStyles = css`
  color: '${tokens.colorNeutralForeground2};
  font-size: 0.92rem;
`;

export const TooltipContent: React.FC<CountryTooltipContentProps> = ({
  data,
}) => {
  return (
    <div className={stackStyles}>
      <div className={rowStyles}>
        <img
          src={data.imageUrl}
          alt={`${data.name} ${strings.worldMapFlag}`}
          className={imageStyles}
        />
        <Text className={titleStyles}>{data.name}</Text>
      </div>
      <div className={rowStyles}>
        <Text className={subTitleStyles}>{strings.worldMapCoord}</Text>
        <Text>{data.coordinates[1].toFixed(2)}{strings.worldMapN}</Text>
        <Text>{data.coordinates[0].toFixed(2)}{strings.worldMapE}</Text>
      </div>
    </div>
  );
};

export default TooltipContent;

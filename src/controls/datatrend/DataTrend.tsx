import * as strings from 'ControlStrings';
import * as React from "react";

import { escape } from "@microsoft/sp-lodash-subset";
import { ITrendProps, ITrendState } from ".";
import * as telemetry from '../../common/telemetry';
import Trend from 'react-trend';


export class DataTrend extends React.Component<ITrendProps, ITrendState> {

  constructor(props: ITrendProps) {
    super(props);

    telemetry.track('DataTrend', {});

  }

  public componentDidUpdate(prevProps: ITrendProps, prevState: ITrendState): void {
  }


  public render(): React.ReactElement<ITrendProps> {
    const {
      data,
      smooth,
      autoDraw,
      autoDrawDuration,
      autoDrawEasing,
      gradient,
      radius,
      strokeWidth,
      strokeLinecap,
      padding
    } = this.props;

    return (
      <div>
        <Trend
          data={data}
          smooth={smooth}
          autoDraw={autoDraw}
          autoDrawDuration={autoDrawDuration}
          autoDrawEasing={autoDrawEasing}
          gradient={gradient}
          radius={radius}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          padding={padding}
        />
      </div>
    );
  }
}

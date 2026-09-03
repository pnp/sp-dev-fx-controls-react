import { THorizontalSpacing } from "./THorizontalSpacing";
import { THorizontalSpacingBreakPoints } from "./THorizontalSpacingBreakPoints";
import { TPaddingBreakPoints } from "./TPaddingBreakPoints";
import { TPading } from "./TPading";
import { TVerticalSpacing } from "./TVerticalSpacing";
import { TVerticalSpacingBreakPoints } from "./TVerticalSpacingBreakPoints";



export interface IBaseProps {
  verticalSpacing?: string | TVerticalSpacing | TVerticalSpacingBreakPoints;
  horizontalSpacing?:
    | string
    | THorizontalSpacing
    | THorizontalSpacingBreakPoints;
  paddingLeft?: string | TPading | TPaddingBreakPoints;
  paddingRight?: string | TPading | TPaddingBreakPoints;
  paddingTop?: string | TPading | TPaddingBreakPoints;
  paddingBottom?: string | TPading | TPaddingBreakPoints;
  padding?: string | TPading | TPaddingBreakPoints;
  margin?: string | TPading | TPaddingBreakPoints;
  marginLeft?: string | TPading | TPaddingBreakPoints;
  marginRight?: string | TPading | TPaddingBreakPoints;
  marginTop?: string | TPading | TPaddingBreakPoints;
  marginBottom?: string | TPading | TPaddingBreakPoints;
  background?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  styles?: React.CSSProperties;
}

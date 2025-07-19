import { Theme } from "@fluentui/react-components";

export interface IWorldMapProps {
  description: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  title: string;
  theme?: Theme
  styles?: React.CSSProperties;
  className?: string;
  mapStyleUrl?: string;
  fitPadding?: number;
}

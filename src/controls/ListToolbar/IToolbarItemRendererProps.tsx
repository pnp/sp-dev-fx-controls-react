import { IToolbarItem } from './IToolbarItem';


export interface IToolbarItemRendererProps {
  /** The toolbar item to render */
  item: IToolbarItem;
  /** Whether the toolbar is in a loading state */
  isLoading?: boolean;
  /** CSS class applied to the button root */
  itemClass?: string;
  /** CSS class applied to the label text (e.g. to hide on mobile) */
  labelClass?: string;
}

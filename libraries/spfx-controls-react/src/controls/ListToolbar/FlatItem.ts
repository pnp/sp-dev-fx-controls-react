import { IToolbarItem } from './IToolbarItem';

/* ------------------------------------------------------------------ */
/*  FlatItem — a union type for rendered toolbar elements              */
/* ------------------------------------------------------------------ */

export interface FlatItem {
  type: 'item' | 'divider';
  item?: IToolbarItem;
  key: string;
}

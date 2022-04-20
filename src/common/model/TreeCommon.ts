/**
 * Children selection mode for tree controls
 */
export enum SelectChildrenMode {
  None = 0,
  Select = 1 << 0, // 0001
  Unselect = 1 << 1,     // 0010
  Mount = 1 << 2,    // 0100
  Update = 1 << 3,   // 1000
  All = ~(~0 << 4)   // 1111
}

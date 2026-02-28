import * as React from 'react';

/**
 * Minimum gap breakpoints based on the toolbar's own pixel width.
 * Wider toolbars get a larger minimum gap between regular and far items.
 */
const GAP_BREAKPOINTS: { minWidth: number; gap: number }[] = [
  { minWidth: 1280, gap: 100 },
  { minWidth: 1024, gap: 60 },
  { minWidth: 768, gap: 40 },
  { minWidth: 480, gap: 24 },
  { minWidth: 0, gap: 12 },
];

function getMinGap(toolbarWidth: number): number {
  for (const bp of GAP_BREAKPOINTS) {
    if (toolbarWidth > bp.minWidth) return bp.gap;
  }
  return GAP_BREAKPOINTS[GAP_BREAKPOINTS.length - 1].gap;
}

/**
 * Measures how many flat-list children fit inside the available width.
 *
 * Uses three refs:
 *  - `toolbarRef`  → the outer toolbar; a ResizeObserver watches this
 *                     for width changes.
 *  - `rightRef`    → the far-items group; its width is subtracted from
 *                     the toolbar width to get the available space for
 *                     regular items.
 *  - `measureRef`  → a hidden mirror (`visibility:hidden; overflow:visible`)
 *                     that always renders ALL items so each child's true
 *                     unclipped width can be read.
 *
 * @returns The index in the flat item list at which items start to overflow.
 */
export function useOverflowIndex(
  toolbarRef: React.RefObject<HTMLDivElement>,
  rightRef: React.RefObject<HTMLDivElement>,
  measureRef: React.RefObject<HTMLDivElement>,
  itemCount: number,
  moreButtonWidth: number = 48,
): number {
  const [overflowIndex, setOverflowIndex] = React.useState(itemCount);

  React.useEffect(() => {
    const toolbarEl = toolbarRef.current;
    const rightEl = rightRef.current;
    const measureEl = measureRef.current;
    if (!toolbarEl || !measureEl) return;

    const calculate = (): void => {
      const toolbarWidth = toolbarEl.offsetWidth;
      if (toolbarWidth === 0) return;

      const toolbarStyle = getComputedStyle(toolbarEl);
      const paddingLeft = parseFloat(toolbarStyle.paddingLeft || '0');
      const paddingRight = parseFloat(toolbarStyle.paddingRight || '0');
      const toolbarGap = parseFloat(
        toolbarStyle.columnGap || toolbarStyle.gap || '0',
      );

      const minGap = getMinGap(toolbarWidth);

      const rightWidth = rightEl ? rightEl.offsetWidth : 0;
      const rightReserved =
        rightWidth > 0 ? rightWidth + minGap + toolbarGap : 0;

      const availableWidth =
        toolbarWidth - paddingLeft - paddingRight - rightReserved;
      if (availableWidth <= 0) return;

      const children = Array.from(measureEl.children) as HTMLElement[];
      if (children.length === 0) {
        setOverflowIndex(itemCount);
        return;
      }

      const gap = parseFloat(getComputedStyle(measureEl).columnGap || '0');

      // Total width of all items in the unclipped mirror
      let totalWidth = 0;
      for (const child of children) {
        totalWidth += child.offsetWidth;
      }
      totalWidth += Math.max(0, children.length - 1) * gap;

      // If everything fits, show all
      if (totalWidth <= availableWidth) {
        setOverflowIndex(children.length);
        return;
      }

      // Otherwise, find how many fit leaving room for the "..." button
      const budgetWidth = availableWidth - moreButtonWidth;
      let usedWidth = 0;
      let fitCount = 0;

      for (let i = 0; i < children.length; i++) {
        const childWidth = children[i].offsetWidth;
        const withGap = i > 0 ? gap : 0;

        if (usedWidth + withGap + childWidth > budgetWidth) break;
        usedWidth += withGap + childWidth;
        fitCount++;
      }

      setOverflowIndex(Math.max(1, fitCount));
    };

    const rafId = requestAnimationFrame(calculate);

    const ro = new ResizeObserver(calculate);
    ro.observe(toolbarEl);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [toolbarRef, rightRef, measureRef, itemCount, moreButtonWidth]);

  return overflowIndex;
}

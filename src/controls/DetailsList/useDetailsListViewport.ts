/* eslint-disable no-void */
import * as React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

import type { IDetailsListProps } from './DetailsList.types';

interface UseDetailsListViewportOptions<T> {
  itemCount: number;
  enableInfiniteScroll: boolean;
  infiniteScrollThreshold: number;
  onLoadMore: IDetailsListProps<T>['onLoadMore'];
  hasNextPage: boolean;
  isLoadingMore: boolean;
}

interface UseDetailsListViewportResult {
  viewportRef: React.RefObject<HTMLDivElement>;
  viewportWidth: number;
  viewportHeight: number;
  scrollTop: number;
  setScrollTop: React.Dispatch<React.SetStateAction<number>>;
  isLoadingMoreInternally: boolean;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  handleScrollIntent: (viewport: HTMLDivElement) => void;
}

export const useDetailsListViewport = <T>({
  itemCount,
  enableInfiniteScroll,
  infiniteScrollThreshold,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
}: UseDetailsListViewportOptions<T>): UseDetailsListViewportResult => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const loadTriggeredForLengthRef = React.useRef(-1);
  const infiniteScrollArmedRef = React.useRef(true);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [isLoadingMoreInternally, setIsLoadingMoreInternally] = React.useState(false);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const updateViewportSize = (): void => {
      setViewportWidth(viewport.clientWidth);
      setViewportHeight(viewport.clientHeight);
    };
    const resizeObserver = new ResizeObserver(updateViewportSize);
    resizeObserver.observe(viewport);
    updateViewportSize();

    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    if (itemCount !== loadTriggeredForLengthRef.current) {
      setIsLoadingMoreInternally(false);
    }
  }, [itemCount]);

  const triggerLoadMore = React.useCallback((): void => {
    if (
      !enableInfiniteScroll ||
      !hasNextPage ||
      !onLoadMore ||
      isLoadingMore ||
      isLoadingMoreInternally ||
      loadTriggeredForLengthRef.current === itemCount
    ) {
      return;
    }

    loadTriggeredForLengthRef.current = itemCount;
    infiniteScrollArmedRef.current = false;
    setIsLoadingMoreInternally(true);
    void Promise.resolve(onLoadMore())
      .catch(() => {
        loadTriggeredForLengthRef.current = -1;
      })
      .finally(() => setIsLoadingMoreInternally(false));
  }, [
    enableInfiniteScroll,
    hasNextPage,
    isLoadingMore,
    isLoadingMoreInternally,
    itemCount,
    onLoadMore,
  ]);

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>): void => {
      const viewport = event.currentTarget;
      setScrollTop(viewport.scrollTop);
      const remainingScroll = viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop;
      if (remainingScroll <= infiniteScrollThreshold && infiniteScrollArmedRef.current) {
        triggerLoadMore();
      }
    },
    [infiniteScrollThreshold, triggerLoadMore],
  );

  const handleScrollIntent = React.useCallback(
    (viewport: HTMLDivElement): void => {
      if (isLoadingMore || isLoadingMoreInternally) {
        return;
      }
      infiniteScrollArmedRef.current = true;
      const remainingScroll = viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop;
      if (remainingScroll <= infiniteScrollThreshold) {
        triggerLoadMore();
      }
    },
    [infiniteScrollThreshold, isLoadingMore, isLoadingMoreInternally, triggerLoadMore],
  );

  return {
    viewportRef,
    viewportWidth,
    viewportHeight,
    scrollTop,
    setScrollTop,
    isLoadingMoreInternally,
    handleScroll,
    handleScrollIntent,
  };
};

export enum ProcessingState {
  idle,
  processing
}

export interface ICarouselState {
  /**
   * Keeps information about the current index of the displayed element.
   */
  currentIndex: number;
  /**
   * Specifies internal state of the control.
   */
  processingState: ProcessingState;

  slideRight?: boolean;

  previousIndex?: number;
}

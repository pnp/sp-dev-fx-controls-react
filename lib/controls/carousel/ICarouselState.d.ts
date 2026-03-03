export declare enum ProcessingState {
    idle = 0,
    processing = 1
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
//# sourceMappingURL=ICarouselState.d.ts.map
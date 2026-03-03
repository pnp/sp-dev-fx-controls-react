import * as React from "react";
import { ICarouselProps } from "./ICarouselProps";
import { ICarouselState } from "./ICarouselState";
export declare class Carousel extends React.Component<ICarouselProps, ICarouselState> {
    private _intervalId;
    constructor(props: ICarouselProps);
    /**
     * Handles component update lifecycle method.
     * @param prevProps
     */
    componentDidUpdate(prevProps: ICarouselProps): void;
    componentDidMount(): void;
    render(): React.ReactElement<ICarouselProps>;
    private renderSlide;
    private getIndicatorsElement;
    private onIndicatorClick;
    /**
     * Return merged styles for Button containers.
     */
    private getButtonContainerStyles;
    /**
     * Return merged styles for Buttons.
     * @param nextButton
     */
    private getButtonStyles;
    /**
     * Merges the styles of the components.
     */
    private getMergedStyles;
    /**
     * Determines if the carousel button can be clicked.
     */
    private isCarouselButtonDisabled;
    /**
     * Handles carousel button click.
     */
    private onCarouselButtonClicked;
    /**
     * Returns next index after carousel button is clicked.
     */
    private getNextIndex;
    /**
     * Returns current element to be displayed.
     */
    private getElementToDisplay;
    private startCycle;
    private moveNext;
    private pauseCycle;
}
//# sourceMappingURL=Carousel.d.ts.map
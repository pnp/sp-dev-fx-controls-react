
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

import * as React from "react";
import styles from "./Carousel.module.scss";
import { ICarouselProps, ICarouselState, CarouselButtonsDisplay, CarouselButtonsLocation } from ".";
import { css, ICssInput } from "@uifabric/utilities/lib";
import { ProcessingState } from "./ICarouselState";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { isArray } from "@pnp/common";
import * as telemetry from '../../common/telemetry';

export class Carousel extends React.Component<ICarouselProps, ICarouselState> {
  constructor(props: ICarouselProps) {
    super(props);

    const currentIndex = props.startIndex ? props.startIndex : 0;

    telemetry.track('ReactCarousel', {});

    this.state = {
      currentIndex,
      processingState: ProcessingState.idle
    };
  }

  /**
   * Handles component update lifecycle method.
   * @param prevProps
   */
  public componentDidUpdate(prevProps: ICarouselProps) {
    const currProps = this.props;

    const prevPropsElementKey = prevProps.triggerPageEvent && prevProps.element ? (prevProps.element as JSX.Element).key : null;
    const nextPropsElementKey = currProps.triggerPageEvent && currProps.element ? (currProps.element as JSX.Element).key : null;

    // Checking if component is in processing state and the key of the current element has been changed
    if (this.state.processingState === ProcessingState.processing && nextPropsElementKey != null && prevPropsElementKey != nextPropsElementKey) {
      this.setState({
        processingState: ProcessingState.idle
      });
    }
  }


  public render(): React.ReactElement<ICarouselProps> {
    const { currentIndex, processingState } = this.state;
    const { containerStyles, contentContainerStyles, containerButtonsStyles, prevButtonStyles, nextButtonStyles, loadingComponentContainerStyles } = this.props;

    const prevButtonIconName = this.props.prevButtonIconName ? this.props.prevButtonIconName : "ChevronLeft";
    const nextButtonIconName = this.props.nextButtonIconName ? this.props.nextButtonIconName : "ChevronRight";
    const processing = processingState === ProcessingState.processing;

    const prevButtonDisabled = processing || this.isCarouselButtonDisabled(false);
    const nextButtonDisabled = processing || this.isCarouselButtonDisabled(true);

    const loadingComponent = this.props.loadingComponent ? this.props.loadingComponent : <Spinner />;
    const element = this.getElementToDisplay();

    return (
      <div className={this.getMergedStyles(styles.container, containerStyles)}>
        <div className={this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles)}
             onClick={() => { if (!prevButtonDisabled) { this.onCarouselButtonClicked(false); } }} >
          <IconButton
            className={this.getMergedStyles(this.getButtonStyles(false), prevButtonStyles)}
            iconProps={{ iconName: prevButtonIconName }}
            disabled={prevButtonDisabled}
            onClick={() => { this.onCarouselButtonClicked(false); }} />
        </div>

        <div className={this.getMergedStyles(styles.contentContainer, contentContainerStyles)}>
          {
            processing &&
            <div className={this.getMergedStyles(styles.loadingComponent, loadingComponentContainerStyles)}>
              {loadingComponent}
            </div>
          }

          {
            !processing && element &&
            element
          }

        </div>

        <div className={this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles)}
             onClick={() => { if (!nextButtonDisabled) { this.onCarouselButtonClicked(true); } }}>
          <IconButton
            className={this.getMergedStyles(this.getButtonStyles(true), nextButtonStyles)}
            iconProps={{ iconName: nextButtonIconName }}
            disabled={nextButtonDisabled}
            onClick={() => { this.onCarouselButtonClicked(true); }} />
        </div>
      </div>
    );
  }

  /**
   * Return merged styles for Button containers.
   */
  private getButtonContainerStyles(): string {
    const buttonsDisplayMode = this.props.buttonsDisplay ? this.props.buttonsDisplay : CarouselButtonsDisplay.block;
    let buttonDisplayModeCss = "";
    switch (buttonsDisplayMode) {
      case CarouselButtonsDisplay.block:
        buttonDisplayModeCss = styles.blockButtonsContainer;
        break;
      case CarouselButtonsDisplay.buttonsOnly:
        buttonDisplayModeCss = styles.buttonsOnlyContainer;
        break;
      case CarouselButtonsDisplay.hidden:
        buttonDisplayModeCss = styles.hiddenButtonsContainer;
        break;
      default:
        return "";
    }

    const buttonsLocation = this.props.buttonsLocation ? this.props.buttonsLocation : CarouselButtonsLocation.top;
    let buttonsLocationCss = "";
    switch (buttonsLocation) {
      case CarouselButtonsLocation.top:
        buttonsLocationCss = styles.blockButtonsContainer;
        break;
      case CarouselButtonsLocation.center:
        buttonsLocationCss = styles.centralButtonsContainer;
        break;
      case CarouselButtonsLocation.bottom:
        buttonsLocationCss = styles.bottomButtonsContainer;
        break;
      default:
        return "";
    }

    const result = css(buttonDisplayModeCss, buttonsLocationCss);
    return result;
  }

  /**
   * Return merged styles for Buttons.
   * @param nextButton
   */
  private getButtonStyles(nextButton: boolean) {
    const buttonsDisplayMode = this.props.buttonsDisplay ? this.props.buttonsDisplay : CarouselButtonsDisplay.block;
    let result = "";
    if (buttonsDisplayMode === CarouselButtonsDisplay.buttonsOnly) {
      result = nextButton ? styles.buttonsOnlyNextButton : styles.buttonsOnlyPrevButton;
    }

    return css(result);
  }

  /**
   * Merges the styles of the components.
   */
  private getMergedStyles = (componentStyles: string, userStyles?: ICssInput): string => {
    const mergedStyles = userStyles ? css(componentStyles, userStyles) : css(componentStyles);
    return mergedStyles;
  }

  /**
   * Determines if the carousel button can be clicked.
   */
  private isCarouselButtonDisabled = (nextButton: boolean): boolean => {
    // false by default
    const isInfinite = this.props.isInfinite != undefined ? this.props.isInfinite : false;
    const currentIndex = this.state.currentIndex;
    let result = false;

    // Use validation from parent control or calcualte it based on the current index
    if (nextButton) {
      result = this.props.canMoveNext != undefined ?
        !this.props.canMoveNext :
        (currentIndex === (this.props.element as JSX.Element[]).length - 1) && !isInfinite;
    } else {
      result = this.props.canMovePrev != undefined ?
        !this.props.canMovePrev :
        (0 === currentIndex) && !isInfinite;
    }

    return result;
  }

  /**
   * Handles carousel button click.
   */
  private onCarouselButtonClicked = (nextButtonClicked: boolean): void => {
    const currentIndex = this.state.currentIndex;

    let nextIndex = this.state.currentIndex;
    let processingState = ProcessingState.processing;

    // Trigger parent control to update provided element
    if (this.props.triggerPageEvent) {
      // Index validation needs to be done by the parent control specyfing canMove Next|Prev
      nextIndex = nextButtonClicked ? (currentIndex + 1) : (currentIndex - 1);
      // Trigger parent to provide new data
      this.props.triggerPageEvent(nextIndex);
      processingState = ProcessingState.processing;

    } else {
      nextIndex = this.getNextIndex(nextButtonClicked);
      const canMoveNext = this.props.canMoveNext != undefined ? this.props.canMoveNext : true;
      const canMovePrev = this.props.canMovePrev != undefined ? this.props.canMovePrev : true;

      if (canMoveNext && nextButtonClicked && this.props.onMoveNextClicked) {
        this.props.onMoveNextClicked(nextIndex);
      }
      else if (canMovePrev && !nextButtonClicked && this.props.onMovePrevClicked) {
        this.props.onMovePrevClicked(nextIndex);
      }

      processingState = ProcessingState.idle;
    }

    this.setState({
      currentIndex: nextIndex,
      processingState
    });
  }

  /**
   * Returns next index after carousel button is clicked.
   */
  private getNextIndex = (nextButtonClicked: boolean): number => {
    const currentIndex = this.state.currentIndex;
    let nextIndex = currentIndex;

    const isInfinite = this.props.isInfinite !== undefined ? this.props.isInfinite : false;
    const length = (this.props.element as JSX.Element[]).length;

    // Next Button clicked
    if (nextButtonClicked) {
      // If there is next element
      if (currentIndex < length - 1) {
        nextIndex = currentIndex + 1;
      }
      // In no more elements are available but it isInfiniteLoop -> reset index to the first element
      else if (isInfinite) {
        nextIndex = 0;
      }
    }
    // Prev Button clicked
    else {
      if (currentIndex - 1 >= 0) {
        // If there is previous element
        nextIndex = currentIndex - 1;
      } else if (isInfinite) {
        // If there is no previous element but isInfitineLoop -> reset index to the last element
        nextIndex = length - 1;
      }
    }

    return nextIndex;
  }

  /**
   * Returns current element to be displayed.
   */
  private getElementToDisplay = (): JSX.Element => {
    const { element } = this.props;
    const currentIndex = this.state.currentIndex;
    let result : JSX.Element = null;

    // If no element has been provided.
    if (!element) {
      result = null;
    }
    // Retrieve proper element from the array
    else if (isArray(element) && currentIndex >= 0 && (element as JSX.Element[]).length > currentIndex) {
      result = element[currentIndex];
    }
    else {
      result = element as JSX.Element;
    }

    return result;
  }
}

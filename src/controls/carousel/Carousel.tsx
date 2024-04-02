
import { IconButton } from "@fluentui/react/lib/Button";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

import * as React from "react";
import styles from "./Carousel.module.scss";
import { ICarouselProps, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "./ICarouselProps";
import { ICarouselState } from "./ICarouselState";
import { css, ICssInput } from "@uifabric/utilities/lib";
import { ProcessingState } from "./ICarouselState";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { isArray } from "@pnp/common";
import * as telemetry from '../../common/telemetry';
import CarouselImage, { ICarouselImageProps } from "./CarouselImage";
import { CarouselIndicatorsDisplay } from "./ICarouselProps";
import { mergeStyles } from "@fluentui/react/lib/Styling";

export class Carousel extends React.Component<ICarouselProps, ICarouselState> {
  private _intervalId: number | undefined;

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
  public componentDidUpdate(prevProps: ICarouselProps): void {
    const currProps = this.props;

    const prevPropsElementKey = prevProps.triggerPageEvent && prevProps.element ? (prevProps.element as JSX.Element).key : null;
    const nextPropsElementKey = currProps.triggerPageEvent && currProps.element ? (currProps.element as JSX.Element).key : null;

    // Checking if component is in processing state and the key of the current element has been changed
    if (this.state.processingState === ProcessingState.processing && nextPropsElementKey !== null && prevPropsElementKey !== nextPropsElementKey) {
      this.setState({
        processingState: ProcessingState.idle
      });
      this.startCycle(); // restarting cycle when new slide is available
    }
  }

  public componentDidMount(): void {
    // starting auto cycling
    this.startCycle();
  }


  public render(): React.ReactElement<ICarouselProps> {
    const { currentIndex, processingState } = this.state;
    const {
      containerStyles,
      contentContainerStyles,
      containerButtonsStyles,
      prevButtonStyles,
      nextButtonStyles,
      loadingComponentContainerStyles,
      prevButtonIconName = 'ChevronLeft',
      nextButtonIconName = 'ChevronRight',
      prevButtonAriaLabel = 'Previous item',
      nextButtonAriaLabel = 'Next item',
      loadingComponent = <Spinner />,
      pauseOnHover,
      interval,
      indicatorsDisplay,
      rootStyles,
      indicatorsContainerStyles,
      contentHeight
    } = this.props;

    const processing = processingState === ProcessingState.processing;

    const prevButtonDisabled = processing || this.isCarouselButtonDisabled(false);
    const nextButtonDisabled = processing || this.isCarouselButtonDisabled(true);

    const element = this.getElementToDisplay(currentIndex);

    let contentContainerCustomClassName: ICssInput | undefined = undefined;
    if (contentContainerStyles) {
      contentContainerCustomClassName = contentContainerStyles;
    }
    else if (contentHeight) {
      contentContainerCustomClassName = mergeStyles({
        height: `${contentHeight}px`
      });
    }


    return (
      <div className={this.getMergedStyles(styles.root, rootStyles)}>
        <div className={this.getMergedStyles(styles.container, containerStyles)}>
          <div className={this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles)}
            onClick={() => { if (!prevButtonDisabled) { this.onCarouselButtonClicked(false); } }} >
            <IconButton
              ariaLabel={prevButtonAriaLabel}
              className={this.getMergedStyles(this.getButtonStyles(false), prevButtonStyles)}
              iconProps={{ iconName: prevButtonIconName }}
              disabled={prevButtonDisabled}
              onClick={() => { this.onCarouselButtonClicked(false); }} />
          </div>
          <div
            className={this.getMergedStyles(styles.contentContainer, contentContainerCustomClassName)}
            onMouseOver={pauseOnHover && interval !== null ? this.pauseCycle : undefined}
            onTouchStart={pauseOnHover && interval !== null ? this.pauseCycle : undefined}
            onMouseLeave={pauseOnHover && interval !== null ? this.startCycle : undefined}
            onTouchEnd={pauseOnHover && interval !== null ? this.startCycle : undefined}>
            {
              processing &&
              <div className={this.getMergedStyles(styles.loadingComponent, loadingComponentContainerStyles)}>
                {loadingComponent}
              </div>
            }

            {
              !processing && this.renderSlide(element)
            }
            {indicatorsDisplay !== CarouselIndicatorsDisplay.block && this.getIndicatorsElement()}
          </div>

          <div className={this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles)}
            onClick={() => { if (!nextButtonDisabled) { this.onCarouselButtonClicked(true); } }}>
            <IconButton
              ariaLabel={nextButtonAriaLabel}
              className={this.getMergedStyles(this.getButtonStyles(true), nextButtonStyles)}
              iconProps={{ iconName: nextButtonIconName }}
              disabled={nextButtonDisabled}
              onClick={() => { this.onCarouselButtonClicked(true); }} />
          </div>
        </div>
        {indicatorsDisplay === CarouselIndicatorsDisplay.block &&
          <div className={this.getMergedStyles(styles.indicatorsContainer, indicatorsContainerStyles)}>
            {this.getIndicatorsElement()}
          </div>}
      </div>
    );
  }

  private renderSlide = (element: JSX.Element): JSX.Element[] => {
    const isAnimated = this.props.slide !== false && !this.props.triggerPageEvent;

    const {
      currentIndex,
      previousIndex,
      slideRight
    } = this.state;

    if (!isAnimated || previousIndex === undefined) {
      return [<div key={currentIndex} className={styles.slideWrapper}>
        {element}
      </div>];
    }

    const previousElement = this.getElementToDisplay(previousIndex);

    const result: JSX.Element[] = [];

    result.push(<div key={currentIndex} className={css(styles.slideWrapper, {
      [styles.slideFromLeft]: slideRight,
      [styles.slideFromRight]: !slideRight
    })}>{element}</div>);

    if (slideRight) {
      result.push(<div key={previousIndex} className={css(styles.slideWrapper, styles.slideRight, styles.right)}>{previousElement}</div>);
    }
    else {
      result.unshift(<div key={previousIndex} className={css(styles.slideWrapper, styles.slideLeft, styles.left)}>{previousElement}</div>);
    }

    return result;
  }

  private getIndicatorsElement = (): JSX.Element | null => {
    const {
      indicators,
      indicatorShape = CarouselIndicatorShape.rectangle,
      onRenderIndicator,
      triggerPageEvent,
      indicatorClassName,
      indicatorStyle
    } = this.props;

    const {
      currentIndex = 0
    } = this.state;

    if (indicators === false) {
      return null;
    }

    const elementsCount = triggerPageEvent ? this.props.elementsCount : isArray(this.props.element) ? (this.props.element as (JSX.Element[] | ICarouselImageProps[])).length : 1;

    const indicatorElements: JSX.Element[] = [];
    for (let i = 0; i < elementsCount; i++) {
      if (onRenderIndicator) {
        indicatorElements.push(onRenderIndicator(i, this.onIndicatorClick));
      }
      else {
        indicatorElements.push(<li
          className={css(indicatorClassName, {
            [styles.active]: i === currentIndex
          })}
          style={indicatorStyle}
          onClick={e => this.onIndicatorClick(e, i)}
        />);
      }
    }

    if (onRenderIndicator) {
      return <div className={styles.indicators}>
        {indicatorElements}
      </div>;
    }
    else {
      return <ol className={css({
        [styles.indicators]: true,
        [styles.circle]: indicatorShape === CarouselIndicatorShape.circle,
        [styles.rectangle]: indicatorShape === CarouselIndicatorShape.rectangle,
        [styles.square]: indicatorShape === CarouselIndicatorShape.square
      })}>
        {indicatorElements}
      </ol>;
    }
  }

  private onIndicatorClick = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, index: number): void => {

    this.startCycle();

    if (this.props.onSelect) {
      this.props.onSelect(index);
    }

    const {
      currentIndex
    } = this.state;

    this.setState({
      currentIndex: index,
      previousIndex: currentIndex,
      slideRight: index < currentIndex
    });
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

    const buttonsLocation = this.props.buttonsLocation ? this.props.buttonsLocation : CarouselButtonsLocation.center;
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
  private getButtonStyles(nextButton: boolean): string {
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
    const isInfinite = this.props.isInfinite !== undefined ? this.props.isInfinite : false;
    const currentIndex = this.state.currentIndex;
    let result = false;

    // Use validation from parent control or calcualte it based on the current index
    if (nextButton) {
      result = this.props.canMoveNext !== undefined ?
        !this.props.canMoveNext :
        (currentIndex === (this.props.element as JSX.Element[]).length - 1) && !isInfinite;
    } else {
      result = this.props.canMovePrev !== undefined ?
        !this.props.canMovePrev :
        (0 === currentIndex) && !isInfinite;
    }

    return result;
  }

  /**
   * Handles carousel button click.
   */
  private onCarouselButtonClicked = (nextButtonClicked: boolean): void => {

    this.startCycle();

    const currentIndex = this.state.currentIndex;

    let nextIndex = this.state.currentIndex;
    let processingState = ProcessingState.processing;

    // Trigger parent control to update provided element
    if (this.props.triggerPageEvent) {

      const canMove = nextButtonClicked ? this.props.canMoveNext !== false : this.props.canMovePrev !== false;

      if (canMove) {
        // Index validation needs to be done by the parent control specyfing canMove Next|Prev
        nextIndex = nextButtonClicked ? (currentIndex + 1) : (currentIndex - 1);

        // Trigger parent to provide new data
        this.props.triggerPageEvent(nextIndex);
        processingState = ProcessingState.processing;
      }

    } else {
      nextIndex = this.getNextIndex(nextButtonClicked);
      if (nextIndex !== currentIndex) {
        if (nextButtonClicked && this.props.onMoveNextClicked) {
          this.props.onMoveNextClicked(nextIndex);
        }
        else if (this.props.onMovePrevClicked) {
          this.props.onMovePrevClicked(nextIndex);
        }
      }

      processingState = ProcessingState.idle;
    }


    if (nextIndex !== currentIndex) {
      if (this.props.onSelect) {
        this.props.onSelect(nextIndex);
      }

      this.setState({
        currentIndex: nextIndex,
        previousIndex: currentIndex,
        slideRight: !nextButtonClicked,
        processingState
      });
    }
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
  private getElementToDisplay = (currentIndex: number): JSX.Element => {
    const { element } = this.props;
    let result: JSX.Element = null;
    let arrayLen: number;

    // If no element has been provided.
    if (!element) {
      result = null;
    }
    else if (isArray(element) && (arrayLen = (element as JSX.Element[] | ICarouselImageProps[]).length) > 0) {
      // Retrieve proper element from the array
      if (currentIndex >= 0 && arrayLen > currentIndex) {
        const arrayEl = element[currentIndex];

        result = 'props' in arrayEl ? arrayEl as JSX.Element :
          <CarouselImage {...arrayEl} />;
      }
    }
    else {
      result = element as JSX.Element;
    }

    return result;
  }

  private startCycle = (): void => {

    const {
      interval,
      triggerPageEvent
    } = this.props;

    if (this._intervalId) {
      if (triggerPageEvent) {
        clearTimeout(this._intervalId);
      }
      else {
        clearInterval(this._intervalId);
      }
    }

    if (interval !== null) {
      const intervalValue = interval || 5000;
      if (!triggerPageEvent) {
        this._intervalId = window.setInterval(this.moveNext, intervalValue);
      } else {
        this._intervalId = window.setTimeout(this.moveNext, intervalValue);
      }
    }
  }

  private moveNext = (): void => {
    if (!this.isCarouselButtonDisabled(true)) {
      this.onCarouselButtonClicked(true);
    }
    else {
      if (this._intervalId) {
        if (this.props.triggerPageEvent) {
          clearTimeout(this._intervalId);
        }
        else {
          clearInterval(this._intervalId);
        }
      }
    }
  }

  private pauseCycle = (): void => {
    if (this._intervalId) {
      if (this.props.triggerPageEvent) {
        clearTimeout(this._intervalId);
      }
      else {
        clearInterval(this._intervalId);
      }
    }
  }
}

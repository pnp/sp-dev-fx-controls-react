# Carousel control

This control renders passed elements with 'previous/next element' option.

Here is an example of the control in action:

![Carousel control](../assets/Carousel.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { Carousel } from "@pnp/spfx-controls-react/lib/Carousel";
```

- Use the `Carousel` control in your code as follows:

```TypeScript
<Carousel
  buttonsLocation={CarouselButtonsLocation.top}
  buttonsDisplay={CarouselButtonsDisplay.block}

  contentContainerStyles={styles.carouselContent}
  containerButtonsStyles={styles.carouselButtonsContainer}

  isInfinite={true}

  element={this.carouselElements}
  onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
  onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
/>

<Carousel
  buttonsLocation={CarouselButtonsLocation.bottom}
  buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}

  contentContainerStyles={styles.carouselContent}
  containerButtonsStyles={styles.carouselButtonsContainer}

  canMoveNext={this.state.canMoveNext}
  canMovePrev={this.state.canMovePrev}
  triggerPageEvent={this.triggerNextElement}
  element={this.state.currentCarouselElement}
/>
```

## Implementation

The Carousel component can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| startIndex | number | no | Specifies the initial index of the element to be displayed. |
| isInfinite | boolean | no | Indicates if infinite scrolling is enabled. |
| canMoveNext | boolean | no | Property indicates if the next item button can be clicked. If not provided, status of the button is calculated based on the current index. <br />It is mandatory when triggerPageEvent is used. |
| canMovePrev | boolean | no | Property indicates if the previous item button can be clicked. If not provided, status of the button is calculated based on the current index. <br />It is mandatory when triggerPageEvent is used. |
| buttonsLocation | CarouselButtonsLocation | yes | Specifies the location of the buttons inside the container. |
| buttonsDisplay | CarouselButtonsDisplay | yes | Specifies the buttons container display mode. |
| containerStyles | ICssInput | no | Allows to specify own styles for carousel container. |
| loadingComponentContainerStyles | ICssInput | no | Allows to specify own styles for loading component. |
| contentContainerStyles | ICssInput | no | Allows to specify own styles for elements container. |
| containerButtonsStyles | ICssInput | no | Allows to specify own styles for buttons container. |
| prevButtonStyles | ICssInput | no | Allows to specify own styles for previous item button. |
| nextButtonStyles | ICssInput | no | Allows to specify own styles for next item button. |
| prevButtonIconName | string | no | Name of the icon to be used for PreviousItem button. Default 'ChevronLeft'. |
| nextButtonIconName | string | no | Name of the icon to be used for NextItem button. Default 'ChevronRight'. |
| triggerPageEvent | (index: number) => void | no | Triggers parent control to provide new element to be displayed. After the method is executed, carousel control switches to processing mode and loadingComponent is displayed. |
| element | JSX.Element \| JSX.Element[] | yes | Fixed array of elemenets to be displayed in carousel - if triggerPageEvent is not used. <br />In case triggerPageEvent is in use, JSX.Element has to be provided. Elements are distinguished based on the 'key' property. |
| loadingComponent | JSX.Element | no | Allows to inject custom component when the carousel is in processing state. If not provided, Spinner is displayed. |
| onMoveNextClicked | (currentIndex: number) => void | no | Callback function called after the next item button is clicked. Not used when triggerPageEvent is specified. |
| onMovePrevClicked | (currentIndex: number) => void | no | Callback function called after the previous item button is clicked. Not used when triggerPageEvent is specified. |

enum `CarouselButtonsLocation`

Provides options for carousel buttons location.

| Value | Description |
| ---- | ---- |
| top | Buttons are going to be placed in the top of the control. |
| center | Buttons are going to be placed in the center of the control. |
| bottom | Buttons are going to be placed in the bottom of the control. |

enum `CarouselButtonsDisplay`

Provides options for carousel buttons display mode.

| Value | Description |
| ---- | ---- |
| block | Reserves space for buttons on both sides of the control. |
| buttonsOnly | Only icon buttons are displayed. |
| hidden | Buttons are not displayed. They appear onhover event. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/Carousel)

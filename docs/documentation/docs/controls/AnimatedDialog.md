# Animated Dialog

Animated Dialog control is an extended version of the [Office UI Fabric React Dialog](https://developer.microsoft.com/en-us/fluentui#/controls/web/dialog#IDialog). Animated Dialog control adds the following to the dialog:

- Entrance and exit animations
- Animated icon above the title

This control uses [Animate.css](https://animate.style/) to add the animations.

Here is an example of the control in action:

![Animated dialog control](../assets/AnimatedDialog.gif)

## Animate.css and animation names

[Animate.css](https://animate.style/) is a library that adds css animations to controls. The website has all the names of the animations and any of them can be used in the `Animated Dialog` control. The default entrance animation name used in this control is `bounceIn` and the default exit animation name is `zoomOut`.

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- In your component file, import the `AnimatedDialog` control as follows:

```TypeScript
import { AnimatedDialog } from "@pnp/spfx-controls-react/lib/AnimatedDialog";
```

## Different ways of using the control

### 1. Simple way

The code below adds a dialog with an entrance animation of `bounceIn` and exit animation of `zoomOut`. (These are the default animations)

```TypeScript
// Initial state
this.state = {
      showAnimatedDialog: false
}
...
...
// Properties of the dialog
const animatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Animated Dialog',
      subText: 'Do you like the animated dialog?',
    };

const animatedModalProps: IModalProps = {
    isDarkOverlay: true
};
...
...
// Add a control (like a button) that changes the state showAnimatedDialog to true

//Render the animated dialog
<AnimatedDialog
    hidden={!this.state.showAnimatedDialog}
    onDismiss={() => { this.setState({ showAnimatedDialog: false }); }}
    dialogContentProps={animatedDialogContentProps}
    modalProps={animatedModalProps}
    >
        <DialogFooter>
            <PrimaryButton onClick={() => { this.setState({ showAnimatedDialog: false }); }} text="Yes" />
            <DefaultButton onClick={() => { this.setState({ showAnimatedDialog: false }); }} text="No" />
        </DialogFooter>
</AnimatedDialog>
```

#### Simple animated dialog

![Simple animated dialog control](../assets/DefaultAnimatedDialog.gif)

### 2. Adding custom animations

The code below adds adds a dialog with an entrance animation of `fadeInDown` and exit animation of `fadeInDown`.

```TypeScript
// Initial state
this.state = {
      showAnimatedDialog: false
}
...
...
// Properties of the dialog
const animatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Animated Dialog',
      subText: 'Do you like the animated dialog?',
    };

const animatedModalProps: IModalProps = {
    isDarkOverlay: true
};
...
...
// Add a control (like a button) that changes the state showAnimatedDialog to true

//Render the animated dialog
<AnimatedDialog
    hidden={!this.state.showAnimatedDialog}
    onDismiss={() => { this.setState({ showAnimatedDialog: false }); }}
    dialogContentProps={animatedDialogContentProps}
    modalProps={animatedModalProps}
    dialogAnimationInType='fadeInDown'
    dialogAnimationOutType='fadeOutDown'
    >
        <DialogFooter>
            <PrimaryButton onClick={() => { this.setState({ showAnimatedDialog: false }); }} text="Yes" />
            <DefaultButton onClick={() => { this.setState({ showAnimatedDialog: false }); }} text="No" />
        </DialogFooter>
</AnimatedDialog>
```

#### Animated dialog with custom animations

![Animated dialog control with custom animations](../assets/CustomisedAnimatedDialog.gif)

### 3. Adding icons and functions

The code below does the following:

- adds an icon (question mark) above the title
- adds `Yes` and `No` buttons in the footer as `showAnimatedDialogFooter` is set to `true`.
- passes 3 functions:
    - onOkClick : The function that gets executed when the `Ok/Yes` button is clicked.
    - onSuccess : The function that gets executed on successful operation of the above function.
    - onError: The function that gets executed when the `onOkClick` function fails.

```TypeScript
// Initial state
this.state = {
      showCustomisedAnimatedDialog: false,
      showSuccessDialog: false,
      showErrorDialog: false
}
...
...
const animatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Animated Dialog with icon'
};

const successDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Good answer!'
};

const animatedModalProps: IModalProps = {
    isDarkOverlay: true,
    containerClassName: `${styles.dialogContainer}`
};

// The operation that does something - e.g. update data
const timeout = (ms: number): Promise<void> => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
};
...
...
// Add a control (like a button) that changes the state showAnimatedDialog to true

//Render the animated dialog
<AnimatedDialog
    hidden={!this.state.showCustomisedAnimatedDialog}
    onDismiss={() => { this.setState({ showCustomisedAnimatedDialog: false }); }}
    dialogContentProps={animatedDialogContentProps}
    modalProps={animatedModalProps}
    iconName='UnknownSolid'
    showAnimatedDialogFooter={true}
    okButtonText="Yes"
    cancelButtonText="No"
    onOkClick={() => timeout(1500)}
    onSuccess={() => {
        this.setState({ showCustomisedAnimatedDialog: false });
        this.setState({ showSuccessDialog: true });
    }}
    onError={() => {
        this.setState({ showCustomisedAnimatedDialog: false });
        this.setState({ showErrorDialog: true });
    }}>
        <div className={styles.dialogContent}>
            <span>Do you like the animated dialog?</span>
        </div>
</AnimatedDialog>

// Render success animated dialog which will appear after the execution 
// of onSuccess function in the above animated dialog 

<AnimatedDialog
    hidden={!this.state.showSuccessDialog}
    onDismiss={() => { this.setState({ showSuccessDialog: false }); }}
    dialogContentProps={successDialogContentProps}
    modalProps={animatedModalProps}
    iconName='CompletedSolid'
    >
        <div className={styles.dialogContent}><span>Thank you.</span></div>
        <div className={styles.resultDialogFooter}>
            <PrimaryButton onClick={() => { this.setState({ showSuccessDialog: false }); }} text="OK" >
            </PrimaryButton>
        </div>
</AnimatedDialog>
```

#### Animated dialog with icon

![Animated dialog control with icon](../assets/AnimatedDialogWithIcon.gif)

### 4. Custom footer

If the dialog content and footer buttons need to be controlled by our code and not the animated dialog control then the code below can be used

```TypeScript
// Initial state
this.state = {
      showCustomisedAnimatedDialog: false,
      showSuccessDialog: false,
      showErrorDialog: false,
      showLoading: false
}
...
...
const animatedDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Custom content and footer'
};

const successDialogContentProps: IDialogContentProps = {
      type: DialogType.normal,
      title: 'Good answer!'
};

const animatedModalProps: IModalProps = {
    isDarkOverlay: true,
    containerClassName: `${styles.dialogContainer}`
};
...
...
// Add a control (like a button) that changes the state showAnimatedDialog to true

//Render the animated dialog
<AnimatedDialog
    hidden={!this.state.showCustomisedAnimatedDialog}
    onDismiss={() => { this.setState({ showCustomisedAnimatedDialog: false }); }}
    dialogContentProps={animatedDialogContentProps}
    modalProps={animatedModalProps}
    iconName='UnknownSolid'>

    <div className={styles.dialogContent}>
    <span>Do you like the animated dialog?</span>
    </div>

    <div className={styles.dialogFooter}>
    <PrimaryButton
        onClick={() => {
        this.setState({ showLoading: true });
        setTimeout(() => {
            this.setState({ showLoading: true });
            this.setState({ showCustomisedAnimatedDialog: false });
            this.setState({ showSuccessDialog: true });
        }, 1500);
        }}
        disabled={this.state.showLoading} text={!this.state.showLoading && "Yeah!"}>
        {this.state.showLoading && <Spinner size={SpinnerSize.medium} />}
    </PrimaryButton>

    <DefaultButton
        onClick={() => this.setState({ showCustomisedAnimatedDialog: false })}
        text="Nope"
        disabled={this.state.showLoading} />
    </div>
</AnimatedDialog>

// Render success animated dialog which will appear after the execution 
// of the onClick function of the Button in the above animated dialog

<AnimatedDialog
    hidden={!this.state.showSuccessDialog}
    onDismiss={() => { this.setState({ showSuccessDialog: false }); }}
    dialogContentProps={successDialogContentProps}
    modalProps={animatedModalProps}
    iconName='CompletedSolid'>
        <div className={styles.dialogContent}><span>Thank you.</span></div>
        <div className={styles.resultDialogFooter}>
            <PrimaryButton onClick={() => { this.setState({ showSuccessDialog: false }); }} text="OK" >
            </PrimaryButton>
        </div>
</AnimatedDialog>
```

#### Animated dialog with custom content and footer

![Animated dialog control with icon](../assets/AnimatedDialogCustomFooter.gif)

### SCSS used in the above examples

```scss

$themePrimary: '[theme:themePrimary, default:#0078d7]';

.dialogContainer {
  border-top: 4px;
  border-top-color: $themePrimary;
  border-top-style: solid;
  min-width: 400px;

  .dialogContent {
    text-align: center;
    padding-bottom: 10px;
    font-size: 1.125em;
  }

  .dialogFooter {
    text-align: right;
    margin-top: 1.25em;

    button {
      min-width: 75px;
      margin: 0px 10px;
      border-radius: 5px;
    }

    .loader{
      margin-top: 15px;
    }
  }

  .resultDialogFooter {
    text-align: center;
    margin-top: 1.25em;

    button {
      min-width: 100px;
      margin: 0px 10px;
    }
  }
}

```

## Implementation

In addition to the`Office UI Fabric dialog` [properties](https://developer.microsoft.com/en-us/fluentui#/controls/web/dialog#implementation), the `AnimatedDialog` control can be configured with the following properties:

| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |
| dialogAnimationInType | string | no | The name of the dialog entrance animation. See [animate.css](https://animate.style/) for values | bounceIn |
| dialogAnimationOutType | string | no | The name of the dialog exit animation. See [animate.css](https://animate.style/) for values | zoomOut |
| iconName | string | no | The name of the Fabric UI icon that appears above title. | |
| iconAnimationType | string | no | The name of the icon entrance animation. See [animate.css](https://animate.style/) for values. | zoomIn |
| showAnimatedDialogFooter | boolean | no | Should the animated dialog show it's own footer. [See example 3 and 4](#3-adding-icons-and-functions) above for usage. | false |
| okButtonText | string | no | The text of the the OK button if showAnimatedDialogFooter is `true`. [See example 3](#3-adding-icons-and-functions) above for usage. | Ok |
| cancelButtonText | string | no | The text of the the Cancel button if showAnimatedDialogFooter is `true`. [See example 3](#3-adding-icons-and-functions) above for usage. | Cancel |
| onOkClick | function | no | The function to be executed when Ok button is clicked. Valid only when showAnimatedDialogFooter is `true`. [See example 3](#3-adding-icons-and-functions) above for usage. | |
| onSuccess | function | no | The function to be executed after successful execution of the OK button function. Valid only when showAnimatedDialogFooter is `true`. [See example 3](#3-adding-icons-and-functions) above for usage. | |
| onError | function | no | The function to be executed after unsuccessful execution of the OK button function. Valid only when showAnimatedDialogFooter is `true`. [See example 3](#3-adding-icons-and-functions) above for usage. | |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/AnimatedDialog)

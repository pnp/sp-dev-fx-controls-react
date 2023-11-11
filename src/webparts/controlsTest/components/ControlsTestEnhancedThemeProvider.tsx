import {
  ActionButton,
  Checkbox,
  ChoiceGroup,
  ComboBox,
  CompoundButton,
  DatePicker,
  DefaultButton,
  IconButton,
  Link,
  PrimaryButton,
  SelectableOptionMenuItemType,
  SpinButton,
  Stack,
  TextField,
  Toggle,
} from "@fluentui/react";
import * as React from "react";
import { ThemeContext, useTheme } from "../../../EnhancedThemeProvider";
import { Placeholder } from "../../../Placeholder";

export const ControlsTestEnhancedThemeProviderFunctionComponent = () => {
  const theme = useTheme();

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <h1>Title H1</h1>
      <h2>Title H2</h2>
      <h3>Title H3</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis
        malesuada elit, in accumsan erat vehicula nec. Donec molestie eu quam
        vel pulvinar. Proin eu est a felis hendrerit sodales. Quisque non
        consequat sapien. Donec at neque libero. In vel ante nec ex sagittis
        consectetur. Ut euismod nunc sed ullamcorper tincidunt. Morbi justo
        dolor, rutrum vehicula urna quis, tempor pulvinar ligula. Sed quis
        gravida mi. In fermentum augue rhoncus odio lacinia pharetra. Aliquam
        elementum mollis nibh, rutrum iaculis tortor.
      </p>
      <Placeholder
        iconName="Edit"
        iconText="Configure your web part"
        description="Please configure the web part."
        buttonLabel="Configure"
        onConfigure={() => {
          alert("onConfigure");
        }}
      />
      <Link theme={theme} href="#">
        Fluent Link
      </Link>
      <ActionButton theme={theme}>Action Button</ActionButton>
      <PrimaryButton theme={theme}>PrimaryButton</PrimaryButton>
      <DefaultButton theme={theme}>DefaultButton</DefaultButton>
      <CompoundButton theme={theme} secondaryText="This is the secondary text.">
        CompoundButton
      </CompoundButton>
      <IconButton
        iconProps={{ iconName: "Emoji2" }}
        title="Emoji"
        ariaLabel="Emoji"
        disabled={false}
        checked={false}
      />
      <IconButton
        iconProps={{ iconName: "Emoji2" }}
        title="Emoji"
        ariaLabel="Emoji"
        disabled={true}
        checked={false}
      />
      <IconButton
        iconProps={{ iconName: "Emoji2" }}
        title="Emoji"
        ariaLabel="Emoji"
        disabled={true}
        checked={true}
      />
      <IconButton
        iconProps={{ iconName: "Emoji2" }}
        title="Emoji"
        ariaLabel="Emoji"
        disabled={false}
        checked={true}
      />
    </Stack>
  );
};

export class ControlsTestEnhancedThemeProvider extends React.Component {
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <Stack tokens={{ childrenGap: 10 }}>
            <ChoiceGroup
              defaultSelectedKey="B"
              options={[
                { key: "A", text: "Option A" },
                { key: "B", text: "Option B" },
                { key: "C", text: "Option C", disabled: true },
                { key: "D", text: "Option D" },
              ]}
              label="Pick one"
              required={true}
            />

            <Checkbox label="Unchecked checkbox (uncontrolled)" />
            <Checkbox label="Checked checkbox (uncontrolled)" defaultChecked />
            <Checkbox label="Disabled checkbox" disabled />
            <Checkbox
              label="Disabled checked checkbox"
              disabled
              defaultChecked
            />

            <ComboBox
              theme={theme}
              defaultSelectedKey="C"
              label="Basic single-select ComboBox"
              options={[
                {
                  key: "Header1",
                  text: "First heading",
                  itemType: SelectableOptionMenuItemType.Header,
                },
                { key: "A", text: "Option A" },
                { key: "B", text: "Option B" },
                { key: "C", text: "Option C" },
                { key: "D", text: "Option D" },
                {
                  key: "divider",
                  text: "-",
                  itemType: SelectableOptionMenuItemType.Divider,
                },
                {
                  key: "Header2",
                  text: "Second heading",
                  itemType: SelectableOptionMenuItemType.Header,
                },
                { key: "E", text: "Option E" },
                { key: "F", text: "Option F", disabled: true },
                { key: "G", text: "Option G" },
                { key: "H", text: "Option H" },
                { key: "I", text: "Option I" },
                { key: "J", text: "Option J" },
              ]}
            />

            <DatePicker theme={theme} />
            <SpinButton
              label="Basic SpinButton"
              defaultValue="0"
              min={0}
              max={100}
              step={1}
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
            />
            <TextField theme={theme} label="Standard" />

            <Toggle
              label="Enabled and checked"
              defaultChecked
              onText="On"
              offText="Off"
            />
            <Toggle label="Enabled and unchecked" onText="On" offText="Off" />
            <Toggle
              label="Disabled and checked"
              defaultChecked
              disabled
              onText="On"
              offText="Off"
            />
            <Toggle
              label="Disabled and unchecked"
              disabled
              onText="On"
              offText="Off"
            />
            <Toggle
              label="With inline label"
              inlineLabel
              onText="On"
              offText="Off"
            />
            <Toggle
              label="Disabled with inline label"
              inlineLabel
              disabled
              onText="On"
              offText="Off"
            />
            <Toggle
              label="With inline label and without onText and offText"
              inlineLabel
            />
            <Toggle
              label="Disabled with inline label and without onText and offText"
              inlineLabel
              disabled
            />
          </Stack>
        )}
      </ThemeContext.Consumer>
    );
  }
}

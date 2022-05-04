import { createTheme } from "office-ui-fabric-react/lib/Styling";
import { HightContrastPalette, HightContrastSemanticColors } from "./HightContrastCustomizations/HightContrastCustomizations";
import { ChoiceGroupOptionStyles } from "./HightContrastCustomizations/Styles/ChoiceGroupOption.Styles";
import { DatePickerStyles } from "./HightContrastCustomizations/Styles/DatePicker.Styles";
import { IconButtonStyles } from "./HightContrastCustomizations/Styles/IconButton.Styles";
import { ToggleStyles } from "./HightContrastCustomizations/Styles/Toggle.styles";

export const fluentUITeamsHighContrastTheme = createTheme({
    palette: HightContrastPalette,
    semanticColors: HightContrastSemanticColors,
    isInverted: true,
});

const hightContrastComponentStyles = {
    DatePicker: {
        styles: DatePickerStyles,
    },
    IconButton: {
        styles: IconButtonStyles(fluentUITeamsHighContrastTheme)
    },
    ChoiceGroupOption: {
        styles: ChoiceGroupOptionStyles,
    },
    Toggle: {
        styles: ToggleStyles,
    }
};

fluentUITeamsHighContrastTheme.components = hightContrastComponentStyles;
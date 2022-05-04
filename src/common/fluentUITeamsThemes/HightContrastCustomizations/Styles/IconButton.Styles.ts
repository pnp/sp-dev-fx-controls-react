import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export const IconButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
    const { semanticColors } = theme;

    return {
        root: {
            backgroundColor: semanticColors.buttonBackground,
            color: semanticColors.buttonText,
            selectors: {
                // standard button
                '&.is-expanded': {
                    backgroundColor: semanticColors.buttonBackground,
                    color: semanticColors.buttonText,
                },
            },
        },
        rootDisabled: {
            backgroundColor: semanticColors.buttonBackground,
            color: semanticColors.buttonTextDisabled,
        },
        rootHovered: {
            backgroundColor: semanticColors.buttonBackgroundHovered,
            color: semanticColors.buttonTextHovered,
        },
        rootPressed: {
            backgroundColor: semanticColors.buttonBackgroundPressed,
            color: semanticColors.buttonTextHovered,
        },
        rootChecked: {
            backgroundColor: semanticColors.buttonBackgroundChecked,
            color: semanticColors.buttonTextHovered,
        },
        rootCheckedHovered: {
            backgroundColor: semanticColors.buttonBackgroundCheckedHovered,
            color: semanticColors.buttonTextHovered,
        },
    };
};

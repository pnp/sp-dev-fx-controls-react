import { IToggleStyleProps, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';

export const ToggleStyles = (props: IToggleStyleProps): Partial<IToggleStyles> => {
    const { theme, disabled, checked } = props;
    const { semanticColors } = theme;

    return {
        thumb: [
            checked && [
                {
                    backgroundColor: semanticColors.buttonBackground
                },
                disabled && {
                    backgroundColor: semanticColors.buttonBackground
                }
            ],
            !checked && [
                {
                    backgroundColor: semanticColors.buttonText
                },
                disabled && {
                    backgroundColor: semanticColors.primaryButtonBackgroundDisabled
                }
            ]
        ]
    };
};

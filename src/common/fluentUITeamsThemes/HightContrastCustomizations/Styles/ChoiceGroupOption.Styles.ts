import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): Partial<IChoiceGroupOptionStyles> => {
    const { disabled, theme } = props;
    const { semanticColors } = theme;

    return {
        field: [
            {
                selectors: {
                    ':hover': [
                        !disabled && {
                            selectors: {
                                '.ms-ChoiceFieldLabel': {
                                    color: semanticColors.bodyText,
                                }
                            }
                        }
                    ],
                    '.ms-ChoiceFieldLabel': {
                        color: disabled ? semanticColors.disabledBodyText : semanticColors.bodyText,
                    },
                },
            }
        ],
    };
};

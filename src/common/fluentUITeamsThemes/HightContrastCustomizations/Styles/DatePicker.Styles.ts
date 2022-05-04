import { IDatePickerStyleProps, IDatePickerStyles } from 'office-ui-fabric-react/lib/components/DatePicker';
import { HightContrastBaseColors } from '../HightContrastCustomizations';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { disabled, theme } = props;

  const TextHoverStyle = () => {
    return {
      color: HightContrastBaseColors.BLACK,
      backgroundColor: HightContrastBaseColors.YELLOW,
    };
  };
  const TodayAndSelectedDayStyle = () => {
    return {
      '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
        backgroundColor: HightContrastBaseColors.BLUE,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
        backgroundColor: HightContrastBaseColors.BLUE,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
        backgroundColor: HightContrastBaseColors.YELLOW,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day--highlighted': {
        backgroundColor: HightContrastBaseColors.YELLOW,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
        backgroundColor: HightContrastBaseColors.YELLOW,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
        backgroundColor: HightContrastBaseColors.BLUE,
        color: HightContrastBaseColors.BLACK,
      },
    };
  };
  const HoverStyles = () => {
    return {
      '.ms-DatePicker-day--highlighted:hover': {
        backgroundColor: HightContrastBaseColors.YELLOW,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button:hover': {
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-day--infocus:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-currentDecade:hover': { color: theme.palette.neutralPrimary },
      '.ms-DatePicker-day--outfocus:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-monthAndYear:hover': { color: theme.palette.neutralPrimary },
      '.ms-DatePicker-weekday:hover': { color: theme.palette.neutralPrimary },
      '.ms-DatePicker-monthOption:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: theme.palette.neutralPrimary },
      '.ms-DatePicker-prevMonth:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextMonth:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-prevYear:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextYear:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-goToday:hover': {
        backgroundColor: HightContrastBaseColors.YELLOW,
        color: HightContrastBaseColors.BLACK,
      },
      '.ms-DatePicker-yearOption:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-prevDecade:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextDecade:hover': {
        ...TextHoverStyle(),
      },
    };
  };
  return {
    callout: {
      backgroundColor: theme.semanticColors.bodyBackground,
      color: theme.palette.neutralPrimary,
      selectors: {
        '.ms-DatePicker-day--infocus': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-currentDecade': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-day--outfocus': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-monthAndYear': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-weekday': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-monthOption': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-currentYear': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-prevMonth': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-nextMonth': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-prevYear': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-nextYear': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-prevDecade': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-nextDecade': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-goToday': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-goToday[disabled]': { display: 'none' },
        '.ms-DatePicker-yearOption': { color: HightContrastBaseColors.WHITE },
        '.ms-DatePicker-yearOption--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-monthOption--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-day--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-nextDecade--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-prevDecade--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-prevYear--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-nextYear--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-prevMonth--disabled': { color: HightContrastBaseColors.GREEN },
        '.ms-DatePicker-nextMonth--disabled': { color: HightContrastBaseColors.GREEN },
        ...TodayAndSelectedDayStyle(),
        ...HoverStyles(),
      },
    },
    icon: [
      {
        color: HightContrastBaseColors.WHITE,
      },
      disabled && {
        color: HightContrastBaseColors.GREEN,
      },
    ],
    root: [
      disabled && {
        color: HightContrastBaseColors.GREEN,
      },
    ],
  };
};

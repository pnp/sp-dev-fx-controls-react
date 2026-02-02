import { AvatarNamedColor } from '@fluentui/react-components';
import { IEventColors } from './../models/IEventColors';
export interface IUtils {
    getSpanSlots: (start: Date, end: Date) => {
        spanSlots: number;
        startSlot: number;
        endSlot: number;
    };
    generateLightAndHoverColors: (baseColor: string, lightnessIncrease?: number, hoverIncrease?: number) => {
        lightColor: string;
        hoverColor: string;
    };
    getEventColors: (category: string) => IEventColors;
    generateColor: (str: string) => string;
    getCalendarColors: (colorName: AvatarNamedColor) => IEventColors;
    formatDate: (dateISO: string, dateFormat: string) => string;
}
export declare const useUtils: () => IUtils;
//# sourceMappingURL=useUtils.d.ts.map
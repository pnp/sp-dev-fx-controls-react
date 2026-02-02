import { TimeConvention } from ".";
export declare class TimeHelper {
    /**
     * Check if value is a valid date
     *
     * @param value
     */
    static isValidDate(value: any): value is Date;
    /**
     * Clone the date
     *
     * @param date
     */
    static cloneDate(date: Date): Date;
    /**
     * Suffix number with zero
     */
    static suffixZero(value: string, size?: number): string;
    /**
     * Format the hours value
     *
     * @param hours
     * @param timeConvention
     */
    static hoursValue(hours: number, timeConvention: TimeConvention): string;
}
//# sourceMappingURL=TimeHelper.d.ts.map
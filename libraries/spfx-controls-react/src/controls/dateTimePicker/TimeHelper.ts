import { TimeConvention } from ".";

export class TimeHelper {

  /**
   * Check if value is a valid date
   *
   * @param value
   */
  public static isValidDate(value: any): value is Date { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
  }

  /**
   * Clone the date
   *
   * @param date
   */
  public static cloneDate(date: Date): Date {
    return this.isValidDate(date) ? new Date(date.getTime()) : null;
  }

  /**
   * Suffix number with zero
   */
  public static suffixZero(value: string, size: number = 2): string {
    while (value.length < size) {
      value = `0${value}`;
    }
    return value;
  }

  /**
   * Format the hours value
   *
   * @param hours
   * @param timeConvention
   */
  public static hoursValue(hours: number, timeConvention: TimeConvention): string {
    if (timeConvention === TimeConvention.Hours24) {
      // 24 hours time convention
      return this.suffixZero(hours.toString());
    } else {
      // 12 hours time convention
      if (hours === 0) {
        return `12 AM`;
      } else if (hours < 12) {
        return `${this.suffixZero(hours.toString())} AM`;
      } else {
        if (hours === 12) {
          return `12 PM`;
        } else {
          return `${this.suffixZero((hours % 12).toString())} PM`;
        }
      }
    }
  }
}

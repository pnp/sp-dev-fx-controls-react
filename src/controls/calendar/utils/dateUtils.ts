import { utcToZonedTime } from 'date-fns-tz';

const ISO_DATE_ONLY_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_TIME_ZONE_REGEXP = /(?:Z|[+-]\d{2}:?\d{2})$/i;

const padDatePart = (datePart: number): string => datePart.toString().padStart(2, '0');

export const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;
};

export const parseCalendarDate = (dateString: string, timeZone: string): Date => {
  const dateOnlyMatch = ISO_DATE_ONLY_REGEXP.exec(dateString);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime()) || !ISO_TIME_ZONE_REGEXP.test(dateString)) {
    return parsedDate;
  }

  return utcToZonedTime(parsedDate, timeZone);
};

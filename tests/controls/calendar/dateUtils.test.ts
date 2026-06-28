import { getDateKey, parseCalendarDate } from '../../../src/controls/calendar/utils/dateUtils';

describe('calendar date utilities', () => {
  it('parses local ISO date-time strings without locale round-tripping', () => {
    const localeStringSpy = jest.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('15/02/2025, 10:00:00 am');

    const date = parseCalendarDate('2025-02-15T10:00:00', 'Australia/Sydney');

    expect(date.toISOString()).toBe(new Date('2025-02-15T10:00:00').toISOString());
    expect(localeStringSpy).not.toHaveBeenCalled();

    localeStringSpy.mockRestore();
  });

  it('creates date keys from local calendar parts', () => {
    const date = new Date(2025, 1, 15, 10, 0, 0);

    expect(getDateKey(date)).toBe('2025-02-15');
  });

  it('parses date-only strings as local calendar days', () => {
    const date = parseCalendarDate('2025-02-15', 'Australia/Sydney');

    expect(getDateKey(date)).toBe('2025-02-15');
  });
});
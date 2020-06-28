import { getToday, nextDay, printDate } from './date.js';

describe('lib/date', () => {
  describe('getToday()', () => {
    test("Returns today's timestamp at 0 hours UTC", () => {
      expect(getToday().toISOString()).toEqual(
        expect.stringMatching(/T00:00:00\.000Z$/)
      );
    });
  });
  describe('nextDay()', () => {
    test('Iterates a date by one day', () => {
      const last = new Date('2019-12-31');
      expect(last.getFullYear()).toBe(2019);
      expect(last.getMonth()).toBe(11);
      expect(last.getDate()).toBe(31);

      const next = nextDay(last);
      expect(next.getFullYear()).toBe(2020);
      expect(next.getMonth()).toBe(0);
      expect(next.getDate()).toBe(1);
    });
  });

  describe('printDate()', () => {
    test('prints a date nicely', () => {
      expect(printDate(new Date('2020-01-01'))).toBe(
        'Wednesday, January 1, 2020'
      );
    });
  });
});

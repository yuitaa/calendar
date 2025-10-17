import { CalendarEvent } from './types/calendar';

export class Calendar {
  constructor (
    public readonly prodId: string,
    private events: CalendarEvent[] = []
  ) {}

  pushEvent (event: CalendarEvent): number {
    return this.events.push(event);
  }

  getEvents (): CalendarEvent[] {
    return structuredClone(this.events);
  }

  toString (): string {
    function convertDateString (date: Date) {
      const icsString = date
        .toISOString()
        .replace(/-/g, '')
        .replace(/:/g, '')
        .replace(/\.\d{3}Z$/, 'Z');

      return icsString;
    }

    const calendarData: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:${this.prodId}`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    for (const e of this.events) {
      calendarData.push('BEGIN:VEVENT');

      calendarData.push(
        ...Object.keys(e).map(key => {
          let l = `${key.toUpperCase()}:`;

          if (e[key] instanceof Date) {
            l += convertDateString(e[key]);
          } else {
            l += key.toString();
          }

          return l;
        })
      );

      calendarData.push('END:VEVENT');
    }

    calendarData.push('END:VCALENDAR');
    return calendarData.join('\r\n');
  }
}

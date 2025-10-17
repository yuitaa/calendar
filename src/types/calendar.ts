export interface CalendarEvent {
  summary: string;
  dtStart: Date;
  dtEnd: Date;
  dtStamp: Date;
  uid: string;
  description?: string;
  [key: string]: any;
}

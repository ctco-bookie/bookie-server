import test from 'ava';
import moment from 'moment';
import ical from 'ical';
import {
  todayEvent,
  findTodaysEvents
} from './calendar';

test('todayEvent:should check for today\'s events', t => {
  const now = moment();
  const yesterday = moment().subtract(1, 'day');
  const e1 = {
    start: yesterday.subtract(1, 'hour').toDate(),
    end: yesterday.subtract(1, 'hour').toDate()
  };

  const e2 = {
    start: now.subtract(1, 'hour').toDate(),
    end: now.subtract(1, 'hour').toDate()

  };

  t.is(todayEvent(now)(e1), false);
  t.is(todayEvent(now)(e2), true);
});

test('parse recurrent meeting', t => {
  const meeting =
`BEGIN:VCALENDAR
PRODID:Calendar-Provider
VERSION:2.0
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:Europe/Helsinki
BEGIN:STANDARD
DTSTART:16010101T040000
TZOFFSETTO:+0200
TZOFFSETFROM:+0300
RRULE:FREQ=YEARLY;WKST=MO;INTERVAL=1;BYMONTH=10;BYDAY=-1SU
TZNAME:EET
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T030000
TZOFFSETTO:+0300
TZOFFSETFROM:+0200
RRULE:FREQ=YEARLY;WKST=MO;INTERVAL=1;BYMONTH=3;BYDAY=-1SU
TZNAME:EEST
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:040000008200E00074C5B7101A82E0080000000090DF981BA0D6D1010000000000000000
 100000008B658AA2E062074794D229C97F3373DE
RRULE:FREQ=WEEKLY;UNTIL=20161231T074000Z;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR
SUMMARY:Standup
DESCRIPTION:\n\n
LOCATION:Meeting room A
PRIORITY:5
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-OWNERAPPTID:998602720
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
ORGANIZER;CN=John Smith:mailto:john.smith@abc.com
DTSTART;TZID="Europe/Helsinki":20160705T094000
DTEND;TZID="Europe/Helsinki":20160705T100000
STATUS:CONFIRMED
CLASS:PUBLIC
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
TRANSP:OPAQUE
LAST-MODIFIED:20160705T063211Z
DTSTAMP:20160705T063211Z
SEQUENCE:0
EXDATE;TZID="Europe/Helsinki":20160706T094000
EXDATE;TZID="Europe/Helsinki":20160914T094000
EXDATE;TZID="Europe/Helsinki":20161004T094000
EXDATE;TZID="Europe/Helsinki":20161005T094000
EXDATE;TZID="Europe/Helsinki":20161026T094000
END:VEVENT
END:VCALENDAR`;

  const ics = ical.parseICS(meeting);
  const events = findTodaysEvents(moment('2016-09-01'))(ics);
  t.is(events.length, 1);
  t.true(moment(events[0].end).isAfter(moment(events[0].start)));
});

import {promisify} from 'bluebird';
import CalendarDetails from './calendar-details';
import CalendarEvent from './calendar-event';
import ical from 'ical';
import _ from 'lodash';
import moment from 'moment';

export const get = async ctx => {
  const calendarName = ctx.params.email;

  const data = await promisify(ical.fromURL)(ctx.env.CALENDAR_HOST.replace('${calendarName}', calendarName), {});
  const events = findTodaysEvents(moment())(data);

  const {roomName, roomNo} = getCalendarInfo(calendarName);
  const details = new CalendarDetails(roomName, roomNo, isBusy(events), events);
  ctx.body = details;
};

export const findTodaysEvents = now => {
  return data => {
    const events = _.filter(data, isEvent);
    const allEvents = _.flatten(_.map(events, handleReoccurringEvent(now)));
    const todayEvents = _.filter(allEvents, todayEvent(now));
    return _.sortBy(_.map(todayEvents, createEvent), 'start');
  };
};

export const getCalendarInfo = email => {
  const [name, ] = email.split("@");
  const [, roomName, roomNo] = name.split(".");

  return {roomName, roomNo};
};

export const isEvent = event => event.type === 'VEVENT';

export const handleReoccurringEvent = now => {
  return event => {
    if (!event.rrule) {
      //single instance
      return [event];
    } else {
      //reoccurring
      const duration = moment.duration(moment(event.end).diff(moment(event.start)));

      return _.map(event.rrule.between(now.startOf('day').toDate(), now.endOf('day').toDate()), occurrence => {
        const start = moment(occurrence);
        const end = moment(start).add(duration);
        console.log(occurrence, start.toDate(), end.toDate());
        return Object.assign({}, event, {start: start.toDate(), end: end.toDate(), duration: duration.humanize()})
      });
    }
  };
};

const isBusy = events => {
  const now = moment();
  return !!_.find(events, e => now.isBetween(moment(e.start), moment(e.end)));
};

export const todayEvent = today => {
  return event => {
    if (!(event.start && event.end)) {
      return false;
    }
    return today.startOf('day').isSame(moment(event.start).startOf('day'));
  };
};

function createEvent(event) {
  const e = new CalendarEvent();
  e.summary = event.summary;
  e.start = event.start;
  e.end = event.end;
  e.isPrivate = !event.summary;
  e.oranizer = event.organizer && {
    name: event.organizer.params.CN,
    email: event.organizer.val
  };
  return e;
}

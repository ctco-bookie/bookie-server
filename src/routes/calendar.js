import {promisify} from 'bluebird';
import CalendarEvent from './calendar-event';
import ical from 'ical';
import _ from 'lodash';
import moment from 'moment';

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 30);
moment.relativeTimeThreshold('M', 12);

export const get = async ctx => {
  const calendarName = ctx.params.email;

  const data = await promisify(ical.fromURL)(ctx.env.CALENDAR_HOST.replace('${calendarName}', calendarName), {});
  const events = findTodaysEvents(moment())(data);

  const {roomName, roomNo} = getCalendarInfo(calendarName);
  const currentEvent = getCurrentEvent(events);
  const isBusy = !!currentEvent;

  let nextEvent;
  if (!isBusy) {
    nextEvent = getNextEvent(events);
  }

  const details = {
    name: roomName,
    no: roomNo,
    busy: isBusy,
    events: events,
    availableForDuration: (isBusy) ? null : availableForDuration(nextEvent),
    availableFor: (isBusy) ? null : availableFor(nextEvent)
  };

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

const getCurrentEvent = events => {
  const now = moment();
  return _.find(events, e => now.isBetween(moment(e.start), moment(e.end)));
};

const getNextEvent = events => {
  const now = moment();
  return _.find(events, e => now.isBefore(moment(e.start)));
};

const availableForDuration = event => {
  if (!event) {
    return;
  }

  const now = moment();

  return moment(event.start).diff(now);
};

const availableFor = event => {
  if (!event) {
    return 'the rest of the day';
  }

  return moment(event.start).from(moment(), true);
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

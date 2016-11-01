import {promisify} from 'bluebird';
import CalendarDetails from './calendar-details';
import CalendarEvent from './calendar-event';
import ical from 'ical';
import _ from 'lodash';
import moment from 'moment';

export const get = async ctx => {
  const calendarName = ctx.params.email;

  const data = await promisify(ical.fromURL)(ctx.env.CALENDAR_HOST.replace('${calendarName}', calendarName), {});
  const events = _.map(_.filter(data, todayEvent(moment())), createEvent);

  const details = new CalendarDetails(getCalendarName(calendarName), isBusy(events), events);
  ctx.body = details;
};

export const getCalendarName = email => {
  const [name, ] = email.split("@");
  const [, roomName, ] = name.split(".");

  return roomName;
};

const isBusy = events => {
  const now = moment();
  return !!_.find(events, e => now.isBetween(moment(e.start), moment(e.end)));
};

export const todayEvent = today => {
  return (event) => {
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
  e.oranizer = {
    name: event.organizer.params.CN,
    email: event.organizer.val
  };
  e.isPrivate = !event.summary;
  return e;
}

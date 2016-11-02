import {promisify} from 'bluebird';
import ical from 'ical';
import _ from 'lodash';
import moment from 'moment';
import Rooms from './rooms';


const getCalendar = async calendarEmail => {
  const calendarHost = process.env.CALENDAR_HOST;

  const data = await promisify(ical.fromURL)(calendarHost.replace('${calendarName}', calendarEmail), {});
  const events = findTodaysEvents(moment())(data);

  const currentEvent = getCurrentEvent(events);

  let availableDuration;
  if (!currentEvent) {
    availableDuration = availableFor(getNextEvent(events));
  }

  const room = Rooms.byEmail(calendarEmail);

  return Object.assign({}, room, {
    busy: !!currentEvent,
    availableForDuration: (availableDuration) ? availableDuration.asMilliseconds() : null,
    availableFor: humanizeDuration(availableDuration)
  });
};

export const findTodaysEvents = now => {
  return data => {
    const events = _.filter(data, isEvent);
    const allEvents = _.flatten(_.map(events, handleReoccurringEvent(now)));
    const todayEvents = _.filter(allEvents, todayEvent(now));
    return _.sortBy(_.map(todayEvents, createEvent), 'start');
  };
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

const availableFor = event => {
  if (!event) {
    return;
  }

  const now = moment();
  return moment.duration(moment(event.start).diff(now), 'milliseconds');
};

const humanizeDuration = duration => {
  if (!duration) {
    return 'the rest of the day';
  }

  return duration.humanize();
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
  return Object.assign({}, event, {
    isPrivate: !event.summary,
    oranizer: event.organizer && {
      name: event.organizer.params.CN,
      email: event.organizer.val
    }
  });
}

export {getCalendar}

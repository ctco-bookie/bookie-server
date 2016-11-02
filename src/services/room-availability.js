import {promisify} from 'bluebird';
import ical from 'ical';
import _ from 'lodash';
import moment from './moment';
import humanizeDuration from 'humanize-duration';

const getAvailability = async roomEmail => {
  const calendarHost = process.env.CALENDAR_HOST;

  const data = await promisify(ical.fromURL)(calendarHost.replace('${calendarName}', roomEmail), {});
  const events = findTodaysEvents(moment())(data);

  const currentEvent = getCurrentEvent(events);
  const isBusy = !!currentEvent;

  let nextEvent;
  if (!currentEvent) {
    nextEvent = getNextEvent(events);
  }

  return {
    email: roomEmail,
    busy: isBusy,
    availableForDuration: (isBusy) ? null : availableForDuration(nextEvent),
    availableFor: (isBusy) ? null : availableFor(nextEvent),
    availableFrom: (isBusy) ? availableFrom(events, currentEvent) : null
  };
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
      const exceptions = getExceptions(event);
      const occurrences = _.map(event.rrule.between(now.startOf('day').toDate(), now.endOf('day').toDate()), d => moment(d));
      const occurrencesWithoutExceptions = _.filter(occurrences, o => {
        return !_.find(exceptions, e => e.isSame(o, 'minute'));
      });
      return _.map(occurrencesWithoutExceptions, occurrence => {
        const start = moment(occurrence);
        const end = moment(start).add(duration);
        return Object.assign({}, event, {start: start.toDate(), end: end.toDate()})
      });
    }
  };
};

const getExceptions = event => {
  const dates = _.keys(event.exdate);
  return _.map(dates, d => moment(d));
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

  return humanizeDuration(moment(event.start).diff(moment()), {
    delimiter: ' and ',
    units: ['h', 'm'],
    round: true
  });
};

const availableFrom = (events, currentEvent) => {
  const futureEvents = _.filter(events, event => {
    let now = moment();
    let end = moment(event.end);
    return now.isSameOrBefore(end);
  });

  let availableFrom = moment(futureEvents[0].end);
  for (let i in futureEvents) {
    let start = moment(futureEvents[i].start);
    let end = moment(futureEvents[i].end);

    if (start.diff(availableFrom, 'minutes') < 15) {
      availableFrom = end;
    }
  }
  return availableFrom;
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

export {getAvailability}

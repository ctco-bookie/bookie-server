import {createICal} from './event-generator';
import {getAvailability} from './room-availability';
import nodemailer from 'nodemailer';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import Rooms from './rooms';

export const bookRoom = async({roomNumber, bookForMinutes}) => {
  const room = Rooms.byNumber(roomNumber);
  if (!room) {
    return {
      success: false,
      message: `Room ${roomNumber} not found`
    };
  }
  const startDate = moment();
  const endDate = moment(roundToNext15Minutes(startDate)).add(bookForMinutes, 'minutes');
  const availability = await getAvailability(room.email);
  if (!isBookable(availability, endDate)) {
    return {
      success: false,
      message: `Room ${room.name} (${roomNumber}) cannot be booked`
    };
  }
  const organizerName = process.env.MEETING_ORGANIZER;
  const organizerEmail = process.env.MEETING_ORGANIZER_EMAIL;
  const iCal = createICal({
    start: startDate,
    end: endDate,
    organizerName: organizerName,
    organizerEmail: organizerEmail,
    calendarName: room.name,
    calendarEmail: room.email
  });
  return sendInvite(iCal, room.email).then(() => {
    const duration = bookedForDuration(startDate, endDate);
    return {
      success: true,
      message: `Room ${room.name} (${roomNumber}) is booked for ${duration} till ${endDate.format('HH:mm')}`,
      start: startDate,
      end: endDate,
      duration: duration
    }
  });
};

export const isBookable = (availability, end) => {
  if (availability.busy) {
    // Room is booked, no way to do ad-hoc meeting
    return false;
  } else if (!availability.availableForDuration) {
    //Room is available till end of the day
    return true;
  } else {
    //Room is free now, need to check if it is available
    const availableTill = moment().add(availability.availableForDuration);
    return end.isSameOrBefore(availableTill);
  }
};

export const bookedForDuration = (start, end) => {
  return humanizeDuration(end.diff(start), {
    delimiter: ' and ',
    units: ['h', 'm'],
    round: true
  });

};

export const roundToNext15Minutes = (now) => {
  const m = moment(now);
  let intervals = Math.floor(now.minutes() / 15);
  if (m.minutes() % 15 != 0)
    intervals++;
  if (intervals == 4) {
    m.add('hours', 1);
    intervals = 0;
  }
  m.minutes(intervals * 15);
  m.seconds(0);
  return m;
};

const sendInvite = (iCal, calendarEmail) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST
  });

  const mail = {
    from: process.env.MEETING_ORGANIZER_EMAIL,
    to: `${calendarEmail}, ${process.env.MEETING_ORGANIZER_EMAIL}`,
    subject: 'Ad-hoc meeting',
    text:
`Ad-hoc meeting created using Bookie application

You can contact ${process.env.MEETING_ORGANIZER_EMAIL} to cancel the meeting if it was created by mistake
`,
    headers: {
      method: 'REQUEST',
      charset: 'UTF-8',
      component: 'VEVENT'
    },
    attachments: [
      {
        contentType: 'text/calendar;method=REQUEST;charset=UTF-8',
        content: iCal.toString()
      }
    ]
  };
  return transport.sendMail(mail);

};


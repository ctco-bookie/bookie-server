import nodemailer from 'nodemailer';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import {createICal} from './event-generator';
import {getAvailability} from './room-availability';
import Rooms from './rooms';

const bookRoom = async ({roomNumber, bookForMinutes, dryRun}) => {
  const room = Rooms.byNumber(roomNumber);
  if (!room) {
    return {
      success: false,
      message: `Room ${roomNumber} not found`
    };
  }

  const start = moment();
  const end = moment(roundToNext15Minutes(start)).add(bookForMinutes, 'minutes');
  const availability = await getAvailability(room.email);
  if (!isBookable(availability, end)) {
    return {
      success: false,
      message: `Room ${room.name} (${roomNumber}) cannot be booked`
    };
  }
  const organizerName = process.env.MEETING_ORGANIZER;
  const organizerEmail = process.env.MEETING_ORGANIZER_EMAIL;
  const iCal = createICal({
    start,
    end,
    organizerName,
    organizerEmail,
    calendarName: room.name,
    calendarEmail: room.email
  });

  if (!dryRun) {
    await sendInvite(iCal, room.email);
  }

  const duration = bookedForDuration(start, end);
  return {
    success: true,
    message: `${dryRun ? '(Dry Run) ' : ''}Room ${room.name} (${roomNumber}) is booked for ${duration} till ${end.format('HH:mm')}`,
    start,
    end,
    duration
  }
};

const isBookable = (availability, end) => {
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

const bookedForDuration = (start, end) =>
  humanizeDuration(end.diff(start), {
    delimiter: ' ',
    units: ['h', 'm'],
    round: true
  });


const roundToNext15Minutes = now => {
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

export {
  bookedForDuration,
  bookRoom,
  isBookable,
 roundToNext15Minutes
}

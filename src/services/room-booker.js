import {createICal} from './event-generator';
import nodemailer from 'nodemailer';
import moment from 'moment';
import Rooms from './rooms';

export const bookRoom = async({roomId, bookForMinutes = 15}) => {
  const room = Rooms.byId(roomId);
  const startDate = roundToNext15Minutes(moment());
  const organizerName = process.env.MEETING_ORGANIZER;
  const organizerEmail = process.env.MEETING_ORGANIZER_EMAIL;
  const iCal = createICal({
    startDate: startDate,
    organizerName: organizerName,
    organizerEmail: organizerEmail,
    bookForMinutes: bookForMinutes
  });
  return sendInvite(iCal, room.email);
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
    to: calendarEmail,
    subject: 'Ad-hoc meeting',
    text: 'body',
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


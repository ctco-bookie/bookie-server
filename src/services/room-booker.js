import {createICal} from './event-generator';
import nodemailer from 'nodemailer';
import Rooms from './rooms';

export const bookRoom = async (id, bookForMinutes = 15) => {
  const room = Rooms.byId(id);
  const organizerName = process.env.MEETING_ORGANIZER;
  const organizerEmail = process.env.MEETING_ORGANIZER_EMAIL;
  const iCal = createICal({
    organizerName: organizerName,
    organizerEmail: organizerEmail,
    bookForMinutes: bookForMinutes
  });
  return sendInvite(iCal, room.email);
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


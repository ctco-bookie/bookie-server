import {delay}  from 'bluebird';
import axios from 'axios';

export async function get(ctx) {
  const ical = await axios.get('https://zimbra.ctco.lv/home/' + ctx.params.email + '/Calendar', {
    proxy: {
      host: 'gate-zrh.swissre.com',
      port: 8080
    }
  });
  ctx.body = ical.data;
}

import cors from 'koa-cors';
import adapt from 'koa-adapter-bluebird';

export default adapt(cors());

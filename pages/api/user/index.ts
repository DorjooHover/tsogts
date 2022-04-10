import nc from 'next-connect';
import { signup } from '../../../controller/user/user';
const handler = nc();
handler.post(signup)
export default handler;

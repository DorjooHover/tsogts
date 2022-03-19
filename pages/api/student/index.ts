import nc from 'next-connect';
import { signup } from '../../../controller/student/student';
const handler = nc();
handler.post(signup)
export default handler;

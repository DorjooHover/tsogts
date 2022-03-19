import {login,  getStudentStatus, logout} from '../../../controller/student/student'
import nc from 'next-connect'

const handler = nc()
handler.post(login)
handler.get(getStudentStatus)
handler.patch(logout)
export default handler
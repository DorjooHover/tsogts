import nc from 'next-connect'
import {signup} from '../../../controller/admin/admin'
import { getAllStudents } from '../../../controller/student/student'

const handler = nc()
handler.post(signup)
handler.get(getAllStudents)
export default handler
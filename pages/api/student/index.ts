import nc from 'next-connect'
import {studentDashboard} from '../../../controller/student/student'

const handler = nc()
handler.get(studentDashboard)

export default handler
import nc from 'next-connect'
import {deleteStudent, studentCourse, updateStudent, createStudentDashboard} from '../../../controller/student/student'

const handler = nc()
handler.get(studentCourse)
handler.patch(updateStudent)
handler.delete(deleteStudent)
handler.post(createStudentDashboard)
export default handler
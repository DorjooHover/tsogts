import nc from 'next-connect'
import {deleteTeacher, updateTeacher} from '../../../controller/teacher/teacher'

const handler = nc()
handler.delete(deleteTeacher)
handler.patch(updateTeacher)

export default handler
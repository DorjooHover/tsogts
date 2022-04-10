import nc from 'next-connect'
import {getAllTeachers} from '../../../controller/teacher/teacher'

const handler = nc()
handler.get(getAllTeachers)

export default handler
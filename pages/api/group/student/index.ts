import nc from 'next-connect'
import {addStudentToGroup} from '../../../../controller/group/student'

const handler = nc()
handler.post(addStudentToGroup)

export default handler
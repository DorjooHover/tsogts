import nc from 'next-connect'
import { getLessonByIdForTeacher ,updateLessonAddGroupId} from '../../../controller/lesson/lesson'

const handler = nc()

handler.get(getLessonByIdForTeacher)
handler.put(updateLessonAddGroupId)
export default handler
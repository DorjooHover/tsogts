import nc from 'next-connect'
import {getLessonById} from '../../../controller/lesson/lesson'

const handler = nc()

handler.get(getLessonById)

export default handler
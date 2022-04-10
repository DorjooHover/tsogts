import nc from 'next-connect'
import { createLesson } from '../../../controller/lesson/lesson'

const handler = nc()
handler.post(createLesson)

export default handler
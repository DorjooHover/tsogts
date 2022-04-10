import { getGroupByTeacherId } from "../../../../controller/teacher/teacher";
import nc from 'next-connect'

const handler = nc()

handler.get(getGroupByTeacherId)

export default handler
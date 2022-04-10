import nc from 'next-connect'
import { updateGroup, deleteGroup } from '../../../controller/group/group'

const handler = nc()

handler.patch(updateGroup)
handler.delete(deleteGroup)

export default handler
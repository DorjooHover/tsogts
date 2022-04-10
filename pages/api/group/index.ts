import nc from 'next-connect'
import {getAllGroups} from '../../../controller/group/group'
import { createGroup } from '../../../controller/group/group'

const handler = nc()
handler.get(getAllGroups)
handler.post(createGroup)

export default handler
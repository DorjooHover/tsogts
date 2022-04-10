import nc from 'next-connect'
import {login, getLoginStatus} from '../../../controller/admin/admin'

const handler = nc()
handler.post(login)
handler.get(getLoginStatus)
export default handler
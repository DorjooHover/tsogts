import {login,  getLoginStatus, logout} from '../../../controller/user/user'
import nc from 'next-connect'

const handler = nc()
handler.post(login)
handler.get(getLoginStatus)
handler.patch(logout)
export default handler
import nc from 'next-connect'
import { createComment, getAllCommentById, deleteCommentById, updateCommentById } from '../../../controller/comment/comment'

const handler = nc()
handler.get(getAllCommentById)
handler.post(createComment)
handler.delete(deleteCommentById)
handler.put(updateCommentById)
export default handler


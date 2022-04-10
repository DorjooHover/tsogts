
import { Data } from ".."
import CommentForm from "./comment"
const Comment = ({comment , replies, currentUserEmail, deleteComment, activeComment, setActiveComment, parent_id, addComment, updateComment }: {comment: Data, replies: Data[], currentUserEmail: string, deleteComment: any, activeComment: any, setActiveComment: React.Dispatch<React.SetStateAction<any>>, parent_id: number, addComment: any, updateComment: any}) => {
    const canReply = Boolean(currentUserEmail)
    const canEdit = comment ? currentUserEmail === comment.email : false
    const canDelete = comment ? currentUserEmail === comment.email : false
    // const fiveMinutes = 300000
    // const timePassed = new Date() - new Date(comment.created_at) > fiveMinutes
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.comment_id === comment.comment_id
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.comment_id === comment.comment_id
    let reply_id 
    if(comment) {
    reply_id = comment.parent_id ? parent_id : comment.comment_id
    }
    
    return (
        <>
        {comment && 
            <div className="px-6 mx-4 py-4">
        <div className="flex">
        <span className="w-28 rounded-full overflow-hidden mr-6"><img src="/img/students/badamaa.jpg" alt="" /></span>
        <div className="w-full">
        <div className="flex justify-between items-center ">
            <div className="mb-3"><h1 className="text-xl font-semibold">{comment.name}</h1>
        <p>{comment.created_at.substring(0, 10)}</p></div>
        <div className="flex item-center ">
            {canReply && <div className="btn_1 px-3 py-2 rounded-md bg_color_2 uppercase text-white mr-3 font-semibold cursor-pointer" onClick={() => setActiveComment({comment_id: comment.comment_id, type: 'replying'})}>Reply</div>}
            {canEdit && <div className="btn_2 px-3 py-2 rounded-md bg_color_3 uppercase text-white mr-3 font-semibold cursor-pointer" onClick={() => setActiveComment({comment_id: comment.comment_id, type: 'editing'})}>Edit</div>}
            {canDelete && <div className="btn_3 px-3 py-2 rounded-md bg_color_4 uppercase text-white mr-3 font-semibold cursor-pointer"  onClick={() => deleteComment(comment.comment_id)}>Delete</div>}
        </div>
        
        </div>
        <p>{comment.comment}</p>
        </div>
        
        

        </div>
        <div className="mb-6">
        {/* {!isEditing && <div className="text">{comment.comment}</div>} */}
        {isEditing && (
            <CommentForm submitLabel="Update" hasCancelButton initialText={comment.comment} handleSubmit={(text) => updateComment(text, comment.comment_id)} handleCancel={() => setActiveComment(null)} />
        )}
        
        {isReplying && (
            <CommentForm submitLabel={'Replying'} handleSubmit={(text) => addComment(text, reply_id)} hasCancelButton={false} initialText='' handleCancel={() => setActiveComment(null)} />
        )}
        </div>
        {replies.length > 0 && (
        <div className="block ml-16">
            {replies.map((reply) => (
                <Comment comment={reply} key={reply.comment_id} replies={[]} currentUserEmail={currentUserEmail} deleteComment={deleteComment} parent_id={comment.comment_id} activeComment={activeComment} setActiveComment={setActiveComment} addComment={addComment} updateComment={updateComment}/>
            ))}
        </div>
)}
        </div>
    }
        </>
    )
}

export default Comment
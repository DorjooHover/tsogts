
import { useEffect, useState } from "react"
import Comment from "./comment"
import CommentForm from "./comment/comment"
export interface Data {
  name: string,
  email: string,
  comment: string,
  comment_id: number,
  parent_id: number,
  created_at: string
}
export type AddCommentType = (text: string, parent_id: number) => void
const Comments = ({currentUserEmail} : {currentUserEmail : string}) => {
    const [data, setData] = useState<Data[]>([])
  const [isLoading, setLoading] = useState(false)
  const [activeComment, setActiveComment] = useState(null)
  const rootComments:Data | Data[] = data.filter((data) => data.parent_id === null)
  useEffect(() => {
    setLoading(true)
    fetch(`/api/comment/${currentUserEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [currentUserEmail])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  const getReplies = (comment_id: number) => {
    console.log(comment_id)
    return data.filter((data) => data.parent_id === comment_id).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  }

  const AddComment = (text: string, parent_id: number) => {

    fetch(`/api/comment/${currentUserEmail}`, {
      method: 'POST',
      body: JSON.stringify({comment: text,parentId: parent_id})
    }).then((res) => res.json()).then((data) => console.log(data))
    setActiveComment(null)
  }
  const deleteComment = (comment_id:number): void => {

    console.log(comment_id)
    if(window.confirm('Итгэлтэй байна уу?')) {
      fetch(`/api/comment/${currentUserEmail}`, {
        method: 'DELETE',
        body: JSON.stringify(comment_id)
      }).then((res) => res.json).then((data) => console.log(data))
    }
    
  }

  const updateComment = (text: string, comment_id: number) : void => {
    fetch(`/api/comment/${currentUserEmail}`, {
      method: 'PUT', 
      body: JSON.stringify({comment: text, commentId: comment_id})
    }).then((res) => res.json()).then((data) => setData(data))

    setActiveComment(null)
  }
  return (
    <div>
      <div className="">
        <h1 className="text-xl font-bold my-6">Comment ({data.length})</h1>
      <div className="bg_color_1 rounded-md px-10  py-8">
        <h1 className="mb-6 text-xl font-bold">Write comment</h1>
      <CommentForm submitLabel='Write' handleSubmit={AddComment} hasCancelButton={false} handleCancel={() => setActiveComment(null)} initialText=''/>
      </div>
      </div>
      {rootComments.map((rootComment) => {
        return (
          <Comment key={rootComment.comment_id} comment={rootComment} replies={getReplies(rootComment.comment_id)} currentUserEmail={currentUserEmail} deleteComment={deleteComment} activeComment={activeComment} setActiveComment={setActiveComment} parent_id={rootComment.comment_id} addComment={AddComment} updateComment={updateComment}/>
        )
      })}
    </div>
  )
}

export default Comments
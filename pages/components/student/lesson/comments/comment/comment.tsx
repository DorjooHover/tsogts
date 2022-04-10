import { useState } from "react"
import { AddCommentType } from ".."
const CommentForm = ({handleSubmit, submitLabel, handleCancel, hasCancelButton = false, initialText = ''}: {handleSubmit: AddCommentType, submitLabel: string, handleCancel:any, hasCancelButton: boolean, initialText: string} ) => {
    const [text, setText] = useState(initialText)
    const isTextareaDisabled = text.length === 0;
    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        handleSubmit(text, 0)
        setText('')
    }   
     return (
        <>
            <form action="" onSubmit={onSubmit} className='w-full mb-6'>
            <textarea name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} className='w-full rounded-md h-24 mb-6 px-3 py-2'/>
            <button type="submit" disabled={isTextareaDisabled} className='rounded-lg px-8 py-3 bg_color_2 btn_1 font-semibold uppercase  text-white'>{submitLabel}</button>
            {hasCancelButton && (
                <button type="button" onClick={handleCancel} className='btn_3 px-8 py-3 rounded-md bg_color_4 uppercase text-white ml-3 font-semibold'>Cancel</button>
            )}
            </form>
        </>
    )
}

export default CommentForm

import {HistoryEdu, ReceiptLong} from '@mui/icons-material'
export default function LessonExplanation({lesson, lessonId, setLessonId}) {
    return (
        <div className="rounded-md  shadow-lg shadow-zinc-500/10 mt-8">
            <h1 className='px-4 py-4 text-2xl font-semibold'>Хичээлүүд</h1>
            {lesson.map((l, index) => {
                if (index%2 ==0) {

                    return (
                        <button key={l.lesson_id} className='bg_color_1 px-4 py-3' onClick={() => console.log(index)} >
                            <HistoryEdu />
                            <span className='ml-4'>{l.title}</span>
                        </button>
                    )
                } else {
                    
                    return (
                        <button key={l.lesson_id} className='px-4 py-3' onClick={() => setLessonId(index)}>
                            <ReceiptLong />
                            <span className='ml-4'>{l.title}</span>
                        </button>
                    )
                }
            })}
        </div>
    )
}
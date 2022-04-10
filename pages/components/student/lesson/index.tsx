import Comments from './comments'
export default function LessonTrains({data, currentUserEmail}) {
    return (
        <>
        <div className="mt-8">
            <p>{data.description}</p>
            <Comments currentUserEmail={currentUserEmail}/>
        </div>
        </>
    )
}
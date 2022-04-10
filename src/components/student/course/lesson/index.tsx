import ReactPlayer from 'react-player'
export default function CourseLesson({props}) {
    return (
        <div className='mb-10'>
            {props && (
                <>
                <h1 className="text-3xl font-semibold mb-4">{props.lesson_name}adsf</h1>
            <div className="flex items-center mb-6">
                <div className="rounded-full w-12 h-12 overflow-hidden mr-4"><img src={props.img} alt="teacher img" /></div>
                <h5 className="font-semibold text-xl">{props.teacher_name}</h5>
            </div>
                <div className='rounded-md overflow-hidden w-full lesson'>
                <ReactPlayer url={props.video}
                playing={true}
                volume={1}
                width="100%"
                height="100%"
                light={props.thumbnail}
                controls  />
                </div>
            </>
            )}
        </div>
    )
}
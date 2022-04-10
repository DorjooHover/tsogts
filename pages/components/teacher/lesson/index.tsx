import {useState, useEffect} from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'
interface Lesson {
    // image: string,
    video: string,
    name: string,
    description: string, 
    // groupId: number
}
import Image from 'next/image'
import {Devices, School, Videocam} from '@mui/icons-material' 
export default function TeacherDashboard({setSidebar, setGroupId}: {setSidebar: any, setGroupId: any}) {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const [videoSrc, setVideoSrc] = useState();
    const [uploadVideoData, setUploadVideoData] = useState();
    const [groups, setGroups] = useState([])
    const [lesson, setLesson] = useState<Lesson>({ video: '', name: '', description: ''})
    const router = useRouter()
    // function handleOnChange(changeEvent) {
    //   const reader = new FileReader();
    //   reader.onload = function (onLoadEvent) {
    //     setImageSrc(onLoadEvent.target.result);
    //     setUploadData(undefined);
    //   };
  
    //   reader.readAsDataURL(changeEvent.target.files[0]);
    // }
    function handleVideoOnChange(changeEvent) {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        setVideoSrc(onLoadEvent.target.result);
        setUploadVideoData(undefined);
      };
  
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      // const fileInputImage = Array.from(form.elements).find(
      //   ({ name }) => name === "image"
      // );
      const fileInputVideo = Array.from(form.elements).find(
        ({ name }) => name === "video"
      );
      // const formDataImg = new FormData();
      const formDataVideo = new FormData();
      // for (const file of fileInputImage.files) {
      //   formDataImg.append("file", file);
      // }
      for (const file of fileInputVideo.files) {
        formDataVideo.append("file", file);
      }
      // formDataImg.append("upload_preset", "tsogts");
      // const img = await fetch(
      //   "https://api.cloudinary.com/v1_1/the-hover/image/upload",
      //   {
      //     method: "POST",
      //     body: formDataImg,
      //   }
      // ).then((r) => r.json());
      formDataVideo.append("upload_preset", "tsogts");
      const vid = await fetch(
        "https://api.cloudinary.com/v1_1/the-hover/video/upload",
        {
          method: "POST",
          body: formDataVideo,
        }
      ).then((r) => r.json());
      setLesson((lesson) => ({...lesson,  video: vid.secure_url}));

    };
    const handleLesson = async () => {
            const data = await axios.post(`/api/lesson`, {params: { video: lesson.video, name: lesson.name, description: lesson.description, email: router.query.slug[0]}})
    }
    const loadGroups = async() => {
      const groups = await axios.get(`/api/group/teacher/${router.query.slug[0]}`)
      setGroups(groups.data)
      setLesson((lesson) => ({...lesson, groupId: groups.data.group_id}))
      console.log(groups.data)
    }
    useEffect(() => {
      loadGroups()
    }, [])
    return (
        <>
        <form action="" onSubmit={handleSubmit} className='rounded-md border border-slate-50'>
          <h1 className="border-b border-slate-50 py-3 px-4 text-xl font-semibold">Хичээл оруулах хэсэг</h1>
        <div className="flex py-4 px-4 justify-around">

          <div className='flex items-center flex-1 justify-center'>
            <Devices sx={{marginRight: '1rem', backgroundColor: '#f7b924',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Нэр оруулах</label>
            <input type="text" value={lesson.name} onChange={(e) => setLesson((lesson) => ({...lesson, name: e.target.value}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
            </div>
          </div>
    <div className="flex item-center flex-1 justify-center">
    <Videocam sx={{marginRight: '1rem', backgroundColor: '#4dc989',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
    <div className="flex flex-col">
            <label htmlFor="file" className="mb-3 text-sm text-gray-600">
              Бичлэг оруулах
            </label>
            <input
              type="file"
              name="video"
              
              onChange={handleVideoOnChange}
            />
          </div>
    </div>
          
    </div>
    <div className="flex item-center px-4 py-3 ">
      <School sx={{marginRight: '1rem', backgroundColor: '#dc4a61',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
      <div className="flex flex-col w-full">
            <label htmlFor="file" className="mb-3 text-sm text-gray-600">
              Тайлбар оруулах
            </label>
            <textarea name="desciption" id="description" className='w-full border-slate-50 rounded-md border px-3 py-2 overflow-hidden resize-none h-40' onChange={(e) => setLesson((lesson) => ({...lesson, description: e.target.value}))}></textarea>
          </div>
    </div>
          <div className="flex border-t border-slate-50 py-3 px-4 justify-center">
          <button type="submit" className='px-8 py-2 btn_2 text-white font-semibold rounded-full bg_color_3 mr-4'>Нэмэх</button>
          {lesson.video && <button onClick={() => handleLesson()}className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2'>Илгээх</button>}
          </div>
</form>

<div className="grid grid-cols-4 gap-8 mt-4">
      {groups && groups.map((group, index) => {
        if(index % 4 == 0) {
          return (
          <div className='rounded box_shadow_1 px-4 py-6 cursor-pointer' onClick={() => {
            setSidebar(1)
            setGroupId(group.group_id)
          }}>
            <h1 className="text-xl uppercase mb-4">{group.group_id}</h1>
            <div className="relative h-64">
              <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
            </div>
          </div>
          )
        } else if(index % 4 == 1) {
          return (
            <div className='rounded box_shadow_2 px-4 py-6 cursor-pointer'>
              <h1 className="text-xl uppercase mb-4">{group.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
            </div>
            )
        } else if(index % 4 == 2) {
          return (
            <div className='rounded box_shadow_3 px-4 py-6 cursor-pointer'>
              <h1 className="text-xl uppercase mb-4">{group.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
            </div>
            )
        } else {
          return (
            <div className='rounded box_shadow_4 px-4 py-6 cursor-pointer'>
              <h1 className="text-xl uppercase mb-4">{group.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
            </div>
            )
        }
      })}

</div>
</>
    )
}
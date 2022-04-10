import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import {Devices, Videocam,Description, School, Title,CreditCard} from '@mui/icons-material'
import Image from 'next/image'
interface Group {
    id: number,
    price: number,
    name: string
    title: string,
    description: string
}
export default function AdminGroup() {

    const router = useRouter()
    const [teacher, setTeacher] = useState([])
    const [group, setGroup] = useState([])
    const [data, setData] = useState<Group>({id: null, price:null, name:'', title:'', description:'' })
    const [updateId, setUpdateId] = useState<number>(null)
    const [isCreate, setIsCreate] = useState(true)
    const loadGroup = async() => {
        const datas = await axios.get('/api/group/')
        setTeacher(datas.data.teacherData)
        setGroup(datas.data.groupData)
        setData((data) => ({...data, id: Number(datas.data.teacherData[0].teacher_id)}))

    }

    useEffect(() => {
        loadGroup()
    },[])

    const handleGroup = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const newGroup = await axios.post('/api/group', {params: {id: data.id, price: data.price, title: data.title, description: data.description, name:data.name}})
            // newGroup ? router.reload() : null
        } catch (error) {
            console.log(error)
        }
    }
    const deleteGroup = async (id: number) => {

        try {
            const deletedGroup = await axios.delete(`/api/group/${id}`)
            console.log(deletedGroup)
            // deletedGroup ? router.reload() : null
        } catch (error) {
            console.log(error)
        }
    }

    const updateGroup = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const updatedGroup = await axios.patch(`/api/group/${updateId}`, {params: {id: data.id, price: data.price, title: data.title, description: data.description, name: data.name}})
            console.log(updatedGroup)
        } catch (error) {
            console.log(error)
        }
    }

    const setCreate = (id: number ) => {
        setIsCreate(false)
        setUpdateId(group[id].group_id)
        setData((data) => ({...data, id: group[id].group_id, name: group[id].name, price: group[id].price, title: group[id].title, description: group[id].description}))
    }
    
    return (
        <>

        {isCreate && (
            <>
<form action="" onSubmit={(e) => handleGroup(e)} className='rounded-md border border-slate-50 mt-8'>
          <h1 className="border-b border-slate-50 py-3 px-4 text-xl font-semibold">Грүпп оруулах, засварлах хэсэг</h1>
        <div className="flex py-4 px-4 justify-around">

          <div className='flex items-center flex-1 justify-center'>
            <Devices sx={{marginRight: '1rem', backgroundColor: '#f7b924',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Нэр оруулах</label>
            <input type="text" value={data.name} onChange={(e) => setData((data) => ({...data, name: e.target.value}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <Title sx={{marginRight: '1rem', backgroundColor: '#4dc989',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Гарчиг оруулах</label>
            <input type="text" value={data.title} onChange={(e) => setData((data) => ({...data, title: e.target.value}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
          </div>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <School sx={{marginRight: '1rem', backgroundColor: '#dc4a61',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px',  fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Багш сонгох</label>
            <select name="teacher" id="teacher" onChange={(e) => setData((data) => ({...data, id: Number(e.target.value)}))} className='rounded-md px-3 py-2 border border-slate-50 '>
                {teacher && teacher.map((t) => {
                    return (
                        <>
                        <option  key={t.teacher_id} value={t.teacher_id}>
                            {t.name} id: {t.teacher_id}
                        </option>
                        </>
                    )
                })}
            </select>
          </div>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <CreditCard sx={{marginRight: '1rem', backgroundColor: '#dc4a61',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px',  fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Үнэ оруулах</label>
            <input type="number" value={data.price} placeholder='төгрөг' onChange={(e) => setData((data) => ({...data, price: Number(e.target.value)}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
          </div>
          </div>
          </div>
          </div>
    <div className="flex item-center px-4 py-3 ">
      <Description sx={{marginRight: '1rem', backgroundColor: '#f7b924',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
      <div className="flex flex-col w-full">
            <label htmlFor="file" className="mb-3 text-sm text-gray-600">
              Тайлбар оруулах
            </label>
            <textarea name="desciption" id="description" className='w-full border-slate-50 rounded-md border px-3 py-2 overflow-hidden resize-none h-40' value={data.description} onChange={(e) => setData((data) => ({...data, description: e.target.value}))}></textarea>
          </div>
    </div>
          
          <div className="flex border-t border-slate-50 py-3 px-4 justify-center">
          <button type="submit" className='px-8 py-2 btn_2 text-white font-semibold rounded-full bg_color_3 mr-4'>Нэмэх</button>
          {/* {lesson.video && <button onClick={() => handleLesson()}className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2'>Илгээх</button>} */}
          </div>
        </form>
            </>
        )}
        {!isCreate && (
            <>
<form action="" onSubmit={(e) => updateGroup(e)} className='rounded-md border border-slate-50 mt-8'>
          <h1 className="border-b border-slate-50 py-3 px-4 text-xl font-semibold">Грүпп оруулах, засварлах хэсэг</h1>
        <div className="flex py-4 px-4 justify-around">

          <div className='flex items-center flex-1 justify-center'>
            <Devices sx={{marginRight: '1rem', backgroundColor: '#f7b924',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Нэр оруулах</label>
            <input type="text" value={data.name} onChange={(e) => setData((data) => ({...data, name: e.target.value}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <Title sx={{marginRight: '1rem', backgroundColor: '#4dc989',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Гарчиг оруулах</label>
            <input type="text" value={data.title} onChange={(e) => setData((data) => ({...data, title: e.target.value}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
          </div>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <School sx={{marginRight: '1rem', backgroundColor: '#dc4a61',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px',  fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Багш сонгох</label>
            <select name="teacher" id="teacher" onChange={(e) => setData((data) => ({...data, id: Number(e.target.value)}))} className='rounded-md px-3 py-2 border border-slate-50 '>
                {teacher && teacher.map((t) => {
                    return (
                        <>
                        <option  key={t.teacher_id} value={t.teacher_id}>
                            {t.name} id: {t.teacher_id}
                        </option>
                        </>
                    )
                })}
            </select>
          </div>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <CreditCard sx={{marginRight: '1rem', backgroundColor: '#dc4a61',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px',  fill: 'white'}}/>
            <div className='flex flex-col '>
            <label htmlFor="lesson" className='text-gray-600 text-sm mb-2'>Үнэ оруулах</label>
            <input type="number" value={data.price} placeholder='төгрөг' onChange={(e) => setData((data) => ({...data, price: Number(e.target.value)}))} className='rounded-md px-3 py-2 border border-slate-50 '/>
          </div>
          </div>
          </div>
          </div>
    <div className="flex item-center px-4 py-3 ">
      <Description sx={{marginRight: '1rem', backgroundColor: '#f7b924',  borderRadius: '50%', width: '45px', height: '45px', padding: '10px', fill: 'white'}}/>
      <div className="flex flex-col w-full">
            <label htmlFor="file" className="mb-3 text-sm text-gray-600">
              Тайлбар оруулах
            </label>
            <textarea name="desciption" id="description" className='w-full border-slate-50 rounded-md border px-3 py-2 overflow-hidden resize-none h-40' value={data.description} onChange={(e) => setData((data) => ({...data, description: e.target.value}))}></textarea>
          </div>
    </div>
          
          <div className="flex border-t border-slate-50 py-3 px-4 justify-center">
          <button type="submit" className='px-8 py-2 btn_2 text-white font-semibold rounded-full bg_color_3 mr-4'>Солих</button>
          {/* {lesson.video && <button onClick={() => handleLesson()}className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2'>Илгээх</button>} */}
          </div>
        </form>
            </>
        )}   
        <div className="grid grid-cols-4 gap-6">
        {group && group.map((g, index) => {
        if(index % 4 == 0) {
          return (
          <div className='rounded box_shadow_1 px-4 py-6 cursor-pointer'>
            <h1 className="text-xl uppercase mb-4">{g.name}</h1>
            <div className="relative h-64">
              <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
            </div>
            <div className=" mt-4 flex justify-around">
            <button className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2' onClick={() => setCreate(Number(index))}>Засах</button>
            <button className='px-8 py-2 btn_3 text-white font-semibold rounded-full bg_color_4 ' onClick={() => deleteGroup(Number(g.group_id))}>Устгах</button>
            </div>
          </div>
          )
        } else if(index % 4 == 1) {
          return (
            <div className='rounded box_shadow_2 px-4 py-6 cursor-pointer' >
              <h1 className="text-xl uppercase mb-4">{g.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
              <div className=" mt-4 flex justify-around">
            <button className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2' onClick={() => setCreate(Number(index))}>Засах</button>
            <button className='px-8 py-2 btn_3 text-white font-semibold rounded-full bg_color_4 ' onClick={() => deleteGroup(Number(g.group_id))}>Устгах</button>
            </div>
            </div>
            )
        } else if(index % 4 == 2) {
          return (
            <div className='rounded box_shadow_3 px-4 py-6 cursor-pointer' >
              <h1 className="text-xl uppercase mb-4">{g.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
              <div className=" mt-4 flex justify-around">
            <button className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2' onClick={() => setCreate(Number(index))}>Засах</button>
            <button className='px-8 py-2 btn_3 text-white font-semibold rounded-full bg_color_4 ' onClick={() => deleteGroup(Number(g.group_id))}>Устгах</button>
            </div>
            </div>
            )
        } else {
          return (
            <div className='rounded box_shadow_4 px-4 py-6 cursor-pointer'>
              <h1 className="text-xl uppercase mb-4">{g.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
              <div className=" mt-4 flex justify-around">
            <button className='px-8 py-2 btn_1 text-white font-semibold rounded-full bg_color_2' onClick={() => setCreate(Number(index))}>Засах</button>
            <button className='px-8 py-2 btn_3 text-white font-semibold rounded-full bg_color_4 ' onClick={() => deleteGroup(Number(g.group_id))}>Устгах</button>
            </div>
            </div>
            )
        }
      })} </div> 
        </>
    )
}
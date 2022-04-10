import { useEffect, useState } from "react"
import axios from "axios"
import Image from 'next/image'
import TeacherGroup from "./group"
import {useRouter} from 'next/router'
interface Data {
    groupId: number,
    studentId: number
}
export default function TeacherAddStudent() {
    const [groupId, setGroupId] = useState<number>()
    const [students, setStudents] = useState([])
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState('')
    const [data, setData] = useState<Data>({groupId: null, studentId: null})
    const router = useRouter()
    const loadStudentDashboard = async() => {
        try {
            const groupData = await axios.get(`/api`)
            setGroups(groupData.data.groupData)
            const studentData = await axios.get('/api/admin')
            setStudents(studentData.data)

        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        // setLoading(true)
        fetch(`/api/group/teacher/${router.query.slug[0]}`)
          .then((res) => res.json())
          .then((data) => {
            setGroups(data)
            console.log(data)
            // setLoading(false)
          })
        fetch(`/api/admin`)
          .then((res) => res.json())
          .then((data) => {
            setStudents(data)
            // setLoading(false)
            console.log(data)
          })
      }, [])

      console.log(groups)
    const handleAddStudentToGroup = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const addStudentToGroup = await axios.post('/api/group/student', 
            {params: {groupId: data.groupId, studentId: data.studentId}})
            console.log(addStudentToGroup)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <h1 className="text-2xl font-semibold ">Грүпп сонгох</h1>
        <div className="grid grid-cols-4 gap-8 mt-4">
      {groups && groups.map((group, index) => {
        if(index % 4 == 0) {
          return (
          <div className='rounded box_shadow_1 px-4 py-6 cursor-pointer' onClick={() => {
            setGroupId(group.group_id)
            setGroupName(group.name)
          }}>
            <h1 className="text-xl uppercase mb-4">{group.name}</h1>
            <div className="relative h-64">
              <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
            </div>
          </div>
          )
        } else if(index % 4 == 1) {
          return (
            <div className='rounded box_shadow_2 px-4 py-6 cursor-pointer' onClick={() => {
                setGroupId(group.group_id)
                setGroupName(group.name)
              }}>
              <h1 className="text-xl uppercase mb-4">{group.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
            </div>
            )
        } else if(index % 4 == 2) {
          return (
            <div className='rounded box_shadow_3 px-4 py-6 cursor-pointer' onClick={() => {
                setGroupId(group.group_id)
                setGroupName(group.name)
              }}>
              <h1 className="text-xl uppercase mb-4">{group.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
            </div>
            )
        } else {
          return (
            <div className='rounded box_shadow_4 px-4 py-6 cursor-pointer' onClick={() => {
                setGroupId(group.group_id)
                setGroupName(group.name)
                // console.log(groupId)
              }}>
              <h1 className="text-xl uppercase mb-4">{group.name}</h1>
              <div className="relative h-64">
                <Image src='/img/groups/img_1.png' alt='img' layout='fill'/>
              </div>
            </div>
            )
        }
      })}

</div>
      {groupId && <TeacherGroup data={students} groupId={groupId} groupName={groupName}/>}
        </>
    )
}
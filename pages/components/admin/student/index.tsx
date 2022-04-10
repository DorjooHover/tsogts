import axios from "axios"
import { useEffect, useState } from "react"
export default function AdminStudent() {
    const [students, setStudents] = useState([])
    const [alert , setAlert] = useState('')
    const loadStudent = async() => {
        const data = await axios.get('/api/admin')
        setStudents(data.data)
    }

    useEffect(() => {
        loadStudent()
    }, [])

    const deleteStudent = async(id : number) => {
        
        try {
            const deletedStudent = await axios.delete(`/api/student/${id}`)
            console.log(deletedStudent)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>{JSON.stringify(students)}
        {students && students.map((student) => {
            return (
                <div key={student.student_id}>
                <div>{student.email}</div>
                <button onClick={() => deleteStudent(Number(student.student_id))}>delete</button>
                </div>
            )
        })}
        </>
        
    )
}
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
export default function Student() {
    const router:NextRouter = useRouter()
    const {slug} = router.query
    const [user, setUser] = useState([])
    const loadUser = async() => {
        try {
            const data = await axios.get(`/api/student/${slug}`)
            setUser(data.data)
            data.data[0] === undefined || data.data.isLogin ? router.push('/Login') : null
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
         loadUser() 
    });
    
    const handleLogout = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        router.push('/')
        setUser([])
        try {
            await axios.patch(`/api/student/${slug}`)
        }catch(error) {
            console.log(error)
        }
    }
    return (
        <>{JSON.stringify(user)}
        <button onClick={handleLogout}>logout</button>
        </>
    )
}
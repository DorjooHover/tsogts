import axios from "axios"
import { unwatchFile } from "fs"
import { off } from "process"
import { useState } from "react"
interface User {
    email: string
    password: string
    message: string
}
export default function Signup() {
    const [user, setUser] = useState<User>({email: '', password: '', message: ''})
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const handleUser = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            if(user.password != '') {
                const data = await axios.post('/api/student', null, {params: {email: user.email, password: user.password}})
                setUser((user) => ({...user, message: data.data.message}))
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const analyzePassword = async(e: {preventDefault: () => void;}) => {
        e.preventDefault()
        if(strongRegex.test(e.target.value)) {
            setUser((user) => ({...user, password: e.target.value}))
        } else {
            setUser((user) => ({...user, password: ''}))
        }
    }
    return (
        <>
        <form action="" onSubmit={handleUser}>
            {user.message && <>{JSON.stringify(user.message)}</>}
            <input type="email" onChange={(e) => setUser((user) => ({...user, email: e.target.value }))}/>
            <input type="password" name="" id="" onChange={analyzePassword}/>
            <button type="submit">sign</button>
        </form>
        </>
    )
}
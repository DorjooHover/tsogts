import axios from "axios";
import { useState } from "react";
import {useRouter} from 'next/router'
interface User {
    email: string;
    password: string;
    message: string
}
export default function Login() {
    const [user, setUser] = useState<User>({email: '', password: '', message: ''})
    const router = useRouter()
    const handleLogin = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
            try {
                const data = await axios.post(`/api/student/${user.email}`, null, {params: {password: user.password}})
                setUser((user) => ({...user, message: data.data.result}));
                data.data.result ? router.push(`/student/${user.email}`) : null;
                // data.data.result ? await axios.put(`/api/student/${user.email}`) : null;
            } catch (error) {
                console.log(error)
            }
    }

    return (
        <form action="" onSubmit={handleLogin}>
            {JSON.stringify(user.message)}
            <input type="text" name="" id="" onChange={(e) => setUser((user) => ({...user, email: e.target.value}))}/>
            <input type="password" name="" id="" onChange={(e) => setUser((user) => ({...user, password: e.target.value}))}/>
            <button type="submit">submit</button>
            </form>
    )
}
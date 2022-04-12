import axios from "axios";
import { useState } from "react";
import {useRouter} from 'next/router'
import Image from 'next/image'
import {CheckCircle} from '@mui/icons-material'
import Link from 'next/link'
import {Alert} from '@mui/material'
interface User {
    email: string;
    password: string;
    message: string
}
export default function Login() {
    const [user, setUser] = useState<User>({email: '', password: '', message: ''})
    const [alert, setAlert] = useState()
    const [view, setView] = useState(false)
    const router = useRouter()
    const handleLogin = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const data = await axios.post(`$/api/user/${user.email}`, null, {params: {password: user.password, login: 'students'}})
            setUser((user) => ({...user, message: data.data.message}));
            setAlert(data.data.result)
            data.data ? setView(true) : setView(false)
            data.data.result ? router.push(`/student/${user.email}`) : null;
            // data.data.result ? await axios.put(`/api/user/${user.email}`) : null;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex">
                <header className="flex-1 h-screen  py-8 main_bg ">
                    <div className='w-3/4 mx-auto h-full'>
                    <div className="h-20 w-20 relative">
                        <Image src="/img/logo/lil_logo.png" alt="logo" layout='fill' />
                    </div>
                    <div className="relative top-1/2 text-white navbar">
                        <h2 className="font-bold mb-4 text-xl">Lorem, ipsum.</h2>
                        <p className='mb-2'>
                            <CheckCircle sx={{marginRight: '0.8rem', fill: '#8dc75f'}}/>
                            <span>Lorem, ipsum dolor.</span>
                        </p>
                        <p className='mb-2'>
                            <CheckCircle sx={{marginRight: '0.8rem', fill: '#8dc75f'}}/>
                            <span>Lorem, ipsum dolor.</span>
                        </p>
                        <p className='mb-2'>
                            <CheckCircle sx={{marginRight: '0.8rem', fill: '#8dc75f'}}/>
                            <span>Lorem, ipsum dolor.</span>
                        </p>
                        <p className='mb-2'>
                            <CheckCircle sx={{marginRight: '0.8rem', fill: '#8dc75f'}}/>
                            <span>Lorem, ipsum dolor.</span>
                        </p>
                    </div>
                    </div>
                </header>
                <div className='sign'>
                    <nav className=" py-3 px-6">
                        <p className="text-right">Бүртгэлгүй юу? 
                            <Link href='/Signup'><a className="font-semibold cursor-pointer"> Бүртгүүлэх</a></Link>
                        </p>
                    </nav>
                    <form action="" onSubmit={handleLogin} className='nav relative top-1/2 nav left-1/4 w-96'>
                    <h2 className="text-2xl font-bold mb-4">Нэвтрэх</h2>
                    {view && alert === true && <Alert severity='success' className="mb-3">{user.message}</Alert>}
                    {view && alert === false && <Alert severity='error' className="mb-3">{user.message}</Alert>}
                    <input type="text" name="email" id="email" onChange={(e) => setUser((user) => ({...user, email: e.target.value}))} className='border rounded-md border-gray-300 w-full px-3 py-2 mb-3' placeholder="Email"/>
                    <input type="password" name="" id="" onChange={(e) => setUser((user) => ({...user, password: e.target.value}))} className='border rounded-md border-gray-300 w-full px-3 py-2 mb-3' placeholder="Password"/>
                    <button type="submit" className='rounded-md main_bg w-full px-2 py-2 mb-3 text-white font-semibold' >Нэвтрэх</button>
                    </form>
                </div>
            </div>
            
        </>
    )
}
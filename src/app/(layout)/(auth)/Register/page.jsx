'use client'
import { writeUserData, getSpecificData } from '@/firebase/utils'
import { useUser } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'



import { useRouter } from 'next/navigation';

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData } = useUser()
    const router = useRouter()
    const [countries, setCountries] = useState(null)
    const [flag, setFlag] = useState('https://flagcdn.com/w320/bo.png')
    const [state, setState] = useState({})
    const [pais, setPais] = useState('Estado Plurinacional de Bolivia')
    const [pais2, setPais2] = useState({
        "translations": {
            "spa": {
                "official": "Estado Plurinacional de Bolivia",
                "common": "Bolivia"
            },
        },
        "flags": {
            "png": "https://flagcdn.com/w320/bo.png",
        },
    })
    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const onClickHandlerCountry = (name, value) => {
        setPais(value.translations.spa.official)
        setPais2(value)
        setFlag(value.flags.png)
    }
    const registerHandler = (e) => {
        e.preventDefault()
        writeUserData(`Users/${user.uid}`, { rol: 'Cliente', uuid: user.uid, email: user.email, photo: user.photoURL !== undefined ? user.photoURL : 'non exist', rol: 'Cliente', flag, pais, ...state }, setUserSuccess)
        router.push('/')

    }
    const getContries = async (e) => {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        setCountries(data)

    }
    useEffect(() => {
        getContries()
        console.log(user)
    }, [user]);
 
    return (
        <div className="min-h-full "
            style={{
                backgroundImage: 'url(/bg-2.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>
            {/* <Video /> */}
            <div className='w-screen h-screen  flex flex-col justify-center items-center'>


                <img src="/airplane-bg.jpg" className='absolute  w-screen h-screen  object-cover ' alt="" />

                <form className={`space-y-6 lg:space-y-3  rounded-[30px] w-[100%] max-w-[400px] p-5 h-auto px-5 py-10 lg:p-10 z-10 lg:scale-110`} onSubmit={registerHandler} >

                    <div className='space-y-4 bg-[#00061860] p-5  rounded-[10px] lg:space-y-3'>
                        <h5 className="text-[18px] text-center text-white font-medium">Registrate</h5>
                        <br />                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Nombre Completo</label>
                            <Input type="text" name="nombre" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Empresa</label>
                            <Input type="text" name="empresa" onChange={changeHandler} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Pais</label>
                            <Select arr={countries ? countries : []} name='Ciudad' click={onClickHandlerCountry} defaultValue={pais2 ? pais2 : 'Ninguno'} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Ciudad</label>
                            <Input type="text" name="ciudad" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Telefono o Whatsapp</label>
                            <Input type="number" name="telefono" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />

                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <Link href="/Politicas" className="ml-2 text-[14px] font-medium text-gray-100 ">Políticas de Servicio</Link>
                            </div>
                        </div>
                        <Button type="submit" theme="Transparent" >Continuar</Button>
                        <br />
                        <div className="text-[14px] text-center font-medium text-white dark:text-gray-300">Ya tienes una cuenta? <Link href="/" className="text-gray-100 hover:underline">Inicia Sessión</Link >
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}




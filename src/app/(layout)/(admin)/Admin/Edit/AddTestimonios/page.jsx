'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import { generateUUID } from '@/utils/UIDgenerator'
import TextEditorSimple from '@/components/TextEditorSimple'

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, succes, setUserSuccess, success, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data3, setData3] = useState({})

    function onChangeHandler3(e,) {
        setData3({ ...data3, [e.target.name]: e.target.value })
    }
    function onChangeHandler4(e,) {
        setData3({ ...data3, paragraph: e })
    }
    function close(e) {
        router.back()
    }
    function saveTarjetas(e) {
        e.preventDefault()
        let key = generateUUID()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/Testimonios`, { [key]: data3 }, setUserSuccess)
    }
    console.log(data3)
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])
    return (

        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className="fixed   pb-[100px] lg:pb-0  h-screen top-0 left-0 flex justify-center items-center w-full  bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] lg:w-[50%] bg-white border-b rounded-[10px] pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] " onSubmit={saveTarjetas} >
                        <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Nombre</label>
                            <input type="text" name={`title`} onChange={(e) => onChangeHandler3(e)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data3[`title`]} />
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Testimonio</label>
                            <TextEditorSimple value={data3[`paragraph`]} setValue={(e) => onChangeHandler4(e)} edit={true} ></TextEditorSimple>
                            <br />
                            <div className="mt-6 flex items-center justify-center gap-x-6">
                                <Button type="submit" theme="Primary">Guardar</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}

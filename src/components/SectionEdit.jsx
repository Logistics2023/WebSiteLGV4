'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import "animate.css/animate.compat.css"
import TextEditor from '@/components/TextEditor'


export default function Home() {

    const { user, introVideo, userDB, option, setOption, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const [textEditor, setTextEditor] = useState(undefined)
    const [textEditor2, setTextEditor2] = useState(undefined)
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})

    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function saveFrontPage(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}`, { ...data, content: textEditor, contentEN: textEditor2  }, setUserSuccess)
    }

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])


    useEffect(() => {

        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].content) {
            console.log('text')
            setTextEditor(cliente[query].content)
        }
        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].contentEN) {
            console.log('text')
            setTextEditor2(cliente[query].contentEN)
        }
    }, [textEditor, textEditor2,   query, option, cliente, success])
 
    return (
        option === 'Seccion' && <form className="relative  pt-5" onSubmit={saveFrontPage} >
            <div className="col-span-full">
                <h2 className="text-base font-bold leading-7 text-gray-900  text-center p-5 ">ADMINISTRAR SECCIONES</h2>
                <div className='flex justify-center p-5'>
                    <Suspense >
                        <video src={data && data.url && data.url ? data.url : (cliente && cliente[query] && cliente[query].url)} className='h-[300px]' autoPlay loop muted playsInline ></video>
                    </Suspense >
                </div>
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subir Video por URL</label>
                <input type="text" name="url" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].url} />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                <input type="text" name="titulo" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].titulo} />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo (Ingles)</label>
                <input type="text" name="tituloEN" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tituloEN} />
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Contenido de texto</label>
                        <TextEditor value={textEditor} setValue={setTextEditor} edit={true} ></TextEditor>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Contenido de texto (Ingles)</label>
                        <TextEditor value={textEditor2} setValue={setTextEditor2} edit={true} ></TextEditor>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-x-6">
                <Button type="submit" theme="Primary">Guardar</Button>
            </div>
        </form>
    )
}


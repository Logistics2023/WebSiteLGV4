'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { uploadIMG } from '@/firebase/storage'
import { Suspense } from 'react'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import { generateUUID } from '@/utils/UIDgenerator'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import TextEditor from '@/components/TextEditor'
import TextEditorSimple from '@/components/TextEditorSimple'
import InputFlotante from '@/components/InputFlotante'

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [counter, setCounter] = useState([''])
    const [textEditor, setTextEditor] = useState(undefined)
    const [textEditor2, setTextEditor2] = useState(undefined)

    // const searchParams = useSearchParams()
    const [query, setQuery] = useState('')
    const [route, setRoute] = useState('')

    const [option, setOption] = useState('Seccion')

    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [data3, setData3] = useState({})

    const [dataURL, setDataURL] = useState({})
    const [dataURL2, setDataURL2] = useState({})
    const [check, setCheck] = useState(false)

    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function handlerLess2(d) {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        removeData(`/Cliente/${query}/tarjetas/${route}/especificaciones/item${Object.keys(data2).length - 1}`, setUserSuccess, () => setData2(db))
        return
    }
    function onChangeHandler2(e, index) {
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [e.target.name]: e.target.value } })
    }
    function saveContent(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}/tarjetas/${route}`, data, setUserSuccess)
    }
    function saveEspecificaciones(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}/tarjetas/${route}/especificaciones`, data2, setUserSuccess)
    }


    function close(e) {
        router.back()
    }

    function deleteHandler(e, route, key, update) {
        e.preventDefault()
        setUserSuccess('Cargando')
        let val = { ...data2 }
        delete val[key]
        console.log(val)
        update(val)
        removeData(route, null, setUserSuccess)
    }

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setRoute(window.location.href.split('=')[2])
            setQuery(window.location.href.split('=')[1].split('&')[0])

        }
    })

    useEffect(() => {
        if (Object.keys(data3).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].especificaciones) {
            setData2({ ...cliente[query].tarjetas[route].especificaciones, ...data2, })
        }
    }, [cliente, query, route])
    console.log(data2)
    return (

        <div className="min-h-full">

            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className="fixed   pb-[100px] lg:pb-0  top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >

                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600 cursor-pointer" onClick={close}>
                        X
                    </div>
                    <form className="relative  pt-5" onSubmit={saveContent} >
                        <div className="col-span-full">
                            <h2 className="text-base font-bold leading-7 text-gray-900  text-center p-5 ">ADMINISTRAR CONTENIDO DE TARJETA</h2>
                            <div className='flex justify-center p-5'>
                                {/* {data && data.urlVideo && data.urlVideo
                                    ? <video src={data && data.urlVideo && data.urlVideo ? data.urlVideo : (cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlVideo)} className='h-[300px]' autoPlay loop muted playsInline ></video>
                                    : <img src={data && data.urlIMG && data.urlIMG ? data.urlIMG : '/404.png'} alt="" />
                                } */}



                                {(data && data.urlVideo && data.urlVideo) || (cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlVideo != 'null')
                                    ? <video src={data && data.urlVideo && data.urlVideo ? data.urlVideo : (cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlVideo != 'null' ? cliente[query].tarjetas[route].urlVideo : '/404.png')} className='h-[300px]' autoPlay loop muted playsInline ></video>
                                    : <img src={data && data.urlIMG && data.urlIMG ? data.urlIMG : (cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlIMG != 'null' ? cliente[query].tarjetas[route].urlIMG : '/404.png')} alt="" />
                                }

                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subir Video por URL</label>
                            <input type="text" name="urlVideo" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route].urlVideo} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subir IMG por URL (*Colocar null en input de video y guardar para actualizar)</label>
                            <input type="text" name="urlIMG" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route].urlIMG} />
                        </div>


                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                            <input type="text" name="title" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route].title} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo Ingles</label>
                            <input type="text" name="tituloEN" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route].tituloEN} />
                        </div>


                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subtitulo 1</label>
                            <input type="text" name="subtitle 1" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route]['subtitle 1']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subtitulo 1 Ingles</label>
                            <input type="text" name="subtitle 1EN" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route]['subtitle 1EN']} />
                        </div>


                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subtitulo 2</label>
                            <input type="text" name="subtitle 2" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route]['subtitle 2']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subtitulo 2 Ingles</label>
                            <input type="text" name="subtitle 2EN" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tarjetas[route]['subtitle 2EN']} />
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Button type="submit" theme="Primary">Guardar</Button>
                        </div>
                    </form>

                    <form className="relative  pt-5" onSubmit={saveEspecificaciones} >

                        {/* ---------------------------------TARJETAS 2---------------------------------------- */}

                        <div className="inline-flex  mb-5">
                            <button type='button' className="bg-red-500 text-white font-bold py-2 px-4 rounded-l" onClick={handlerLess2}>
                                -
                            </button>
                            <button type='button' className="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [`item${data2 !== undefined && Object.keys(data2).length}`]: { ic: '', ip: '' } })} >
                                +
                            </button>
                        </div>
                        {data2 && data2 !== undefined && Object.values(data2).map((i, index) => {
                            return <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2  md:gap-2 pb-5 border-b-[.5px] mb-5 border-[#666666]">
                                < InputFlotante type="text" name={`ip`} uid={`key_${index}`} onChange={(e) => onChangeHandler2(e, index)} value={data2[`item${index}`][`ip`]} required label={'Item principal'} shadow='shadow-white' />
                                < InputFlotante type="text" name={`ic`} uid={`value_${index}`} onChange={(e) => onChangeHandler2(e, index)} value={data2[`item${index}`][`ic`]} required label={'Item contenido'} shadow='shadow-white' />
                               
                                < InputFlotante type="text" name={`ipEN`} uid={`keyEN_${index}`} onChange={(e) => onChangeHandler2(e, index)} value={data2[`item${index}`][`ipEN`]}  label={'Item principal ingles'} shadow='shadow-white' />
                                < InputFlotante type="text" name={`icEN`} uid={`valueEN_${index}`} onChange={(e) => onChangeHandler2(e, index)} value={data2[`item${index}`][`icEN`]}  label={'Item contenido ingles'} shadow='shadow-white' />
                            </div>
                        })
                        }
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Button type="submit" theme="Primary">Guardar</Button>
                        </div>
                    </form>
                </div>

            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}







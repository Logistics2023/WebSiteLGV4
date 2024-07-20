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


    // const searchParams = useSearchParams()
    const [query, setQuery] = useState('')
    const [route, setRoute] = useState('')
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [data3, setData3] = useState({})

    function removeHandler(route) {
        setUserSuccess('Cargando')
        // let val = { ...data2 }
        // delete val[key]
        // console.log(val)
        // update(val)
        removeData(route, null, setUserSuccess)
    }

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)
    const [fileList, setFileList] = useState([])


    function manageInputIMG(e) {
        e.preventDefault()
        const fileName = `${e.target.name}`
        const file = e.target.files[0]
        setFileList([...e.target.files])
        if (fileName === 'PostImage') {
            setPostImage(file)
            setUrlPostImage(URL.createObjectURL(file))
        }
    }

    function handlerEventChange2(e) {
        e.preventDefault()
        const value = e.target[1].value
        setFileList([...fileList.filter(i => typeof i === 'string'), value])
    }

    function validator() {
        if (fileList.length > 0) {
            const ruteDB = `/Cliente/experiencia/tarjetas/${route}/images`

            const object = typeof fileList[0] === 'string'
                ? fileList.reduce((acc, i) => {
                    return { ...acc, [generateUUID()]: { url: i } }
                }, {})
                : {}

            console.log(object)
            // setUserSuccess('Cargando')
            writeUserData(ruteDB, object)
            // typeof fileList[0] !== 'string' && uploadIMG(`${ruteDB}/${fileName}/images`, ruteSTG, '', fileList, setUserSuccess, null, false, true)
            // isChecked && writeUserData(`/Inicio/Posts`, object, setUserSuccess, setUserData)
            // isChecked && typeof fileList[0] !== 'string' && uploadIMG(`${ruteDB}/${fileName}/images`, ruteSTG, '', fileList, setUserSuccess, null, false, true)
        } else {
            setUserSuccess("CompleteIMG")
        }
    }

    const bytesToMegaBytes = bytes => bytes / (1024 * 1024)
    const handlerItem = (index) => {
        const arr = [...fileList]
        arr.splice(index, 1)
        setFileList(arr)
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
    }, [cliente, query, route, fileList])
    return (<div className="min-h-full">

        <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

        <div className="fixed   pb-[100px] lg:pb-0  top-0 left-0 h-screen w-full overflow-y-auto bg-[#000000b4] p-0 z-40 " >

            <div className="relative w-full md:h-[70vh] overflow-hidden  bg-transparent border-b border-gray-900/10 pt-[90px] pb-16 lg:pb-4 px-5">
                <div className={`bg-white h-full   md:grid md:grid-cols-2`}>
                    <div className={` min-h-[50vh] relative flex flex-col justify-center items-center bg-gradient-to-t  from-[#00195cbe] via-[#00195cbe] to-[#00195c] p-5 lg:p-10`}>
                        <div className='bg-white md:min-w-[450px] p-5 rounded-[10px]'>
                            <h3 className='text-center  pb-[20px]'>Subir GALERIA</h3>

                            <form className='relative  w-full flex flex-col mb-2 space-y-7' onSubmit={handlerEventChange2}>
                                <label htmlFor={`topic-Post`} className='block relative text-center cursor-pointer min-w-[140px] rounded-[20px] transition-all w-full px-2 py-2 text-[white] text-[12px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 border border-teal-500' >Añadir IMG desde local</label>
                                <input type="file" id={`topic-Post`} className='hidden' name={`PostImage`} onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" multiple />
                                <div className='relative flex'>
                                    <input type="text" className='w-full border-b-[1px] border-gray-500 rounded-[5px] mr-2 text-[12px] px-5' placeholder='Añadir Url de IMG' name="images" />
                                    <button type='submit' className='block w-[50px] relative cursor-pointer  rounded-bl-[5px] rounded-tr-[5px] transition-all px-2 py-2 text-[white] text-[12px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 border-teal-500'>add</button>
                                </div>
                                {fileList.length > 0 ? <Button type='button' theme="Primary" click={validator}>Guardar</Button> : <Button theme="Primary" click={validator}>Guardar</Button>}
                            </form>
                        </div>
                    </div>
                    <div className="relative divide-y divide-gray-200 h-[50vh] p-10 overflow-y-auto w-full  ">
                        <h3 className='relative text-center'>Imagenes Seleccionadas</h3>
                        <br />
                        {
                            fileList.length > 0 && fileList.map((i, index) => {
                                return <li className="pb-3 sm:pb-4 w-full list-none" key={index}>
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="w-8 h-8 rounded-[5px]"
                                                src={typeof i === 'string' ? i : URL.createObjectURL(i)} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {i.name ? i.name : `Imagen ${index + 1}`}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {bytesToMegaBytes(i.size).toFixed(2) !== 'NaN' ? `${bytesToMegaBytes(i.size).toFixed(2)} MB` : 'Cargado por URL'}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" onClick={() => handlerItem(index)}>
                                                <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                        {
                            data.images !== undefined && data.images.length > 0 && data.images.map((i, index) => {
                                return <li className="pb-3 sm:pb-4 w-full list-none" key={index}>
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-[5px]" src={i} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Imagen {index + 1}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                Cargado desde URL
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" onClick={() => handlerItem(index)}>
                                                <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                    </div>

                </div>
            </div>

            <div className='columns-3 gap-3 pb-3'>
                {
                    cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route].images && Object.entries(cliente[query].tarjetas[route].images).map((i, index) => {
                        return <div>
                            <button className='absolute bg-red-500 text-white px-10 py-2' onClick={()=>removeHandler(`Cliente/${query}/tarjetas/${route}/images/${i[0]}`)}> Eliminar </button>
                            <img src={i[1].url} alt="" className=' mb-3 transition-all shadow-xl  rounded-5 z-50' />
                        </div>
                    })
                }
            </div>

        </div>



        {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
    </div>
    )
}



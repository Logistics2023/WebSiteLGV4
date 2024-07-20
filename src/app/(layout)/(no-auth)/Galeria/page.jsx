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
import Slider from '@/components/Slider'
import TextEditor from '@/components/TextEditor'
import TextEditorSimple from '@/components/TextEditorSimple'
import Footer from '@/components/Footer'

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












    // const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()

    // const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState(true)
    const [isCheckedComp, setIsCheckedComp] = useState(true)
    const [isCheckedLength, setIsCheckedLength] = useState(true)

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

    function manageTemplate(e) {
        const ruteDB = `/${topic}/Templates` // /Inicio
        const value = e.target.value

        const object = { [dayMonthYear]: value }
        writeUserData(ruteDB, object, setUserSuccess)
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }
    function handlerEventChange2(e) {
        e.preventDefault()
        const value = e.target[1].value
        setFileList([...fileList.filter(i => typeof i === 'string'), value])
    }

    function handlerEventChange3(e) {
        let year = e.target.value.split('-')[0]
        let month = e.target.value.split('-')[1]
        let day = e.target.value.split('-')[2]

        const name = e.target.name
        const value = e.target.value
        const object = { [name]: new Date(parseInt(year), parseInt(month - 1), day, 0, 0, 0).getTime() }

        setData({ ...data, ...object })
    }
    function handlerChecked() {
        setIsChecked(!isChecked)
    }
    function handlerCheckedComp() {
        setIsCheckedComp(!isCheckedComp)
    }
    function handlerCheckedLength() {
        setIsCheckedLength(!isCheckedLength)
    }
    // function validator(e) {
    //     e.preventDefault()

    //     switch (topic) {
    //         case sectionsDB[0].hash:
    //             return save(11)
    //             break;
    //         case sectionsDB[1].hash:
    //             return save(12)
    //             break;
    //         case sectionsDB[2].hash:
    //             return save(13)
    //             break;
    //         case sectionsDB[3].hash:
    //             return save(14)
    //             break;
    //         case sectionsDB[4].hash:
    //             return save(15)
    //             break;
    //         case sectionsDB[5].hash:
    //             return save(16)
    //         case sectionsDB[6].hash:
    //             return save(17)
    //             break;
    //         case sectionsDB[7].hash:
    //             return save(18)
    //             break;
    //         case sectionsDB[8].hash:
    //             return save(19)
    //             break;
    //         case sectionsDB[9].hash:
    //             return save(20)
    //             break;
    //         default:
    //             return setUserSuccess(false)
    //     }
    // }

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

    function save(num) {
        setUserSuccess('Cargando')

        const uuid = newDate.getTime()

        if (fileList.length > 0) {
            const ruteDB = `/Cliente/experiencias/` // Nov-2022/Inicio
            const ruteSTG = `${topic}` // Nov-2022/
            const fileName = `PostImage_${newDate.getTime()}` // PostImage_Tue Nov 15 2022 
            const object = {
                [fileName]: typeof fileList[0] === 'string'
                    ? { ...data, images: fileList.map(i => { return { url: i } }) }
                    : { ...data, description: data.descriptionPost ? data.descriptionPost : '', enlace: data.enlacePost ? data.enlacePost : `${num}${newDate.getTime()}`, }
            }
            console.log(obj)
            // setUserSuccess('Cargando')
            // writeUserData(ruteDB, object, setUserSuccess, setUserData)
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
    function formSubmit(e) {
        e.preventDefault()
    }

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setRoute(window.location.href.split('=')[2])
            setQuery(window.location.href.split('=')[1].split('&')[0])
        }
    })

    useEffect(() => {
        if (Object.keys(data2).length === 0 && cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route]) {
            setData2({ ...cliente[query].tarjetas[route], ...data2, })
        }
    }, [cliente, query, route, data2, fileList])


    console.log(Object.values(cliente.Slider1))
    return (cliente && <div className="min-h-full">
        <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover z-40 ' alt="" />

        <div className="fixed   md:pb-0 top-0 left-0 h-screen w-full overflow-y-auto  p-0 z-40 " >
            <div className=' md:p-[50px] py-[20px] bg-gradient-to-t from-[#00195cdc] via-[#00195cb6] to-[#00195cdc] p-0 z-40 '>

                <h1 className='text-white text-[25px] text-center font-bold'>{cliente[query] && cliente[query].tarjetas[route].title}</h1>
                {cliente[query] && cliente[query].tarjetas && <p className='text-white ql-editor' style={{ height: 'auto' }} dangerouslySetInnerHTML={{ __html: cliente[query].tarjetas[route].paragraph }}></p>}

            </div>
            <div className='columns-2 md:columns-4 gap-3 pb-3 p-3 md:p-[50px] bg-gradient-to-t from-[#00195c63] via-[#ced0d3d3] to-[#00195cdc]'>
                {
                    cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route].images && Object.entries(cliente[query].tarjetas[route].images).map((i, index) => {
                        return <img src={i[1].url} alt="" className=' mb-3 transition-all shadow-xl hover:scale-125 rounded-5' style={{borderRadius: '5px'}} />

                    })
                }
            </div>
            {/* {cliente.Slider1 &&<div className=' bg-gradient-to-tr from-[#00195c] via-[#00195c] to-[#00195c] py-5'>
                <h1 className='text-center font-bold text-[25px] text-white py-[50px]'>Nuestros Clientes</h1>
                <Slider content={Object.values(cliente.Slider1)} />
            </div>}
            {cliente.Slider2 &&  <div className=' bg-gradient-to-tr from-[#00195c] via-[#00195c] to-[#00195c]py-5'>
                <h1 className='text-center font-bold text-white  text-[25px] py-[50px]'>Socios  Comerciales</h1>
                <Slider content={Object.values(cliente.Slider2)} />
            </div>}
            {cliente.Slider3 && <div className=' bg-gradient-to-tr text-white  from-[#00195c] via-[#00195c] to-[#00195c] py-5'>
                <h1 className='text-center font-bold text-[25px] py-[50px]'>Empresas</h1>
                <Slider content={Object.values(cliente.Slider3)} />
            </div>} */}

            <Footer></Footer>


        </div>
        {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
    </div>
    )
}



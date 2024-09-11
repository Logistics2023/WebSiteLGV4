'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'
import Select from '@/components/SelectTrack'
import { arrDB } from '@/db/arrDB'






export default function Home() {




    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, trackingDB, setUserData, tracking, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})

    const [db, setdb] = useState(null)

    const onClickHandlerCountry = (value) => {
        setdb(value)
    }
    function handlerLess2(d) {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        removeData(`/Tracking/${query}/subItems/item${Object.keys(data2).length - 1}`, setUserSuccess, () => setData2(db))
        return
    }
    function onChangeHandler2(e, index, d) {
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [e.target.name]: e.target.value } })
        return
    }
    function handlerOnChange(e,) {
        setData({ ...data, [query]: { ...data[query], [e.target.name]: e.target.value } })
    }
    function saveFrontPage(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        db
            ? writeUserData(`/Tracking/${query}`, { ...data[query], trackIcon: db }, setUserSuccess)
            : writeUserData(`/Tracking/${query}`, { ...data[query] }, setUserSuccess)
    }
    function saveFrontPage2(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Tracking/${query}/subItems`, data2, setUserSuccess)
    }
    function close(e) {
        router.back()
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
        if (trackingDB[query] && trackingDB[query].subItems) {
            setData2({ ...trackingDB[query].subItems, ...data2 })
        }
    }, [cliente, query, trackingDB])
    console.log(data2)
    return (

        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className="fixed top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    {trackingDB[query] && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl  '>
                            <h5 className='text-center font-medium text-[16px]'>Editar <br /> </h5>
                            <h5 className='text-center font-medium text-[16px]'>CODIGO DEL SERVICIO <br /> {query}<br /> </h5>
                            <br />
                            <div className='relative flex  '>
                                {arrDB.map((item, index) => <div key={index} className='w-full  relative flex flex-col items-center m-2 cursor-pointer p-2' onClick={() => onClickHandlerCountry(item)} >
                                    <span className={`absolute z-10  top-[-5px] left-0 right-0 mx-auto border-[2px] border-[#294B98] rounded-full  w-[10px] h-[10px] ${db && item.img === db['img'] ? 'bg-[#39ff27]' : (trackingDB[query].trackIcon && item.img === trackingDB[query].trackIcon['img'] ? 'bg-[#39ff27]' : 'bg-white ')}`}></span>
                                    <img src={item.img} className={` inline h-[20px] sm:h-[25px] md:h-[50px]  ${db && item.img === db['img'] ? 'grayscale-0 brightness-125' : (trackingDB[query].trackIcon && item.img === trackingDB[query].trackIcon['img'] ? 'grayscale-0 brightness-125' : 'grayscale')}`} alt="" />
                                    <span className={`h-[10px] text-[8px] sm:text-[12px] ${db && item.img === db['img'] ? 'text-[#294B98] font-medium' : (trackingDB[query].trackIcon && item.img === trackingDB[query].trackIcon['img'] ? 'text-[#294B98] font-medium' : 'font-medium ')}`}>{item.text}</span>
                                </div>)}
                                <span className='absolute top-[5px] h-[2px] bg-[#294B98] w-full'></span>
                            </div>
                            <br />
                            < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['FECHA DE CREACION']} required label={'FECHA DE CREACION'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['CODIGO DE SERVICIO']} disabled={true} required label={'CODIGO DE SERVICIO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['CODIGO DE CLIENTE']} required label={'CODIGO DE CLIENTE'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['MODALIDAD DE TRANSPORTE']} required label={'MODALIDAD DE TRANSPORTE'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['PESO TN']} required label={'PESO TN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['SHIPPER']} required label={'SHIPPER'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['CONSIGNATARIO']} required label={'CONSIGNATARIO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['MANIFIESTO']} required label={'MANIFIESTO'} shadow='shadow-white' />
                            < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['ETD']} required label={'ETD'} shadow='shadow-white' />
                            < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={trackingDB[query]['ETA']} required label={'ETA'} shadow='shadow-white' />

                            <div className='w-full flex justify-center	'>
                                {/* <Button theme="Danger" click={(e) => { saveFrontPage(e) }}>Eliminar</Button> */}
                                <Button type='button' theme="Primary" click={(e) => { saveFrontPage(e) }}>Guardar</Button>
                            </div>

                        </div>
                    </form>}



                    <div className="relative flex ">
                        <button type='button' className="bg-red-500 text-white flex font-bold py-2 px-4 rounded-l" onClick={() => handlerLess2()}>
                            -
                        </button>
                        <button type='button' className="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [`item${data2 !== undefined && Object.keys(data2).length}`]: { ic: '', ip: '' } })} >
                            +
                        </button>
                    </div>









                    {trackingDB[query] && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl  '>

                            <h5 className='text-center font-medium text-[16px]'>STATUS +<br /> </h5>
                            {data2 && data2 && Object.values(data2).map((item, index) => {
                                return <div className=' space-y-5 border-b md:grid md:grid-cols-2 md:place-items-end md:gap-2  border-[#818181] pb-5'>
                                    < InputFlotante type="text" name={`ip`} uid={`column_${index}`} onChange={(e) => onChangeHandler2(e, index,)} value={data2[`item${index}`] && data2[`item${index}`][`ip`] ? data2[`item${index}`][`ip`] : item[`ip`]} required label={'Item'} shadow='shadow-white' />
                                    < InputFlotante type="date" name={`ic`} uid={`value_${index}`} onChange={(e) => onChangeHandler2(e, index,)} value={data2[`item${index}`] && data2[`item${index}`][`ic`] ? data2[`item${index}`][`ic`] : item[`ic`]} required label={'Valor'} shadow='shadow-white' />
                               
                               
                                    < InputFlotante type="text" name={`ipEN`} uid={`columnEN_${index}`} onChange={(e) => onChangeHandler2(e, index,)} value={data2[`item${index}`] && data2[`item${index}`][`ipEN`] ? data2[`item${index}`][`ipEN`] : item[`ipEN`]} required label={'Item Ingles'} shadow='shadow-white' />
                                    < InputFlotante type="date" name={`icEN`} uid={`valueEN_${index}`} onChange={(e) => onChangeHandler2(e, index,)} value={data2[`item${index}`] && data2[`item${index}`][`icEN`] ? data2[`item${index}`][`icEN`] : item[`icEN`]} required label={'Valor Ingles'} shadow='shadow-white' />
                               
                               
                                </div>
                            })
                            }
                            <div className='w-full flex justify-center	'>
                                {/* <Button theme="Danger" click={(e) => { saveFrontPage(e) }}>Eliminar</Button> */}
                                <Button type='button' theme="Primary" click={(e) => { saveFrontPage2(e) }}>Guardar</Button>
                            </div>

                        </div>
                    </form>}
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}







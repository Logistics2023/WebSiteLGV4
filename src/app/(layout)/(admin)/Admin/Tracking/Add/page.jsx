'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { getDate } from '@/utils/DateFormat'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import Select from '@/components/SelectTrack'
import { arrDB } from '@/db/arrDB'
export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})

    const [db, setdb] = useState('Ninguno')

    const onClickHandlerCountry = (value) => {
        setdb(value)
    }
    function handlerOnChange(e, key) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function onChangeHandler2(e, index, d) {
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [e.target.name]: e.target.value } })
        return
    }
    function handlerLess2(d) {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        removeData(`Cliente/priceFCL/${query}/flete/item${Object.keys(data2).length - 1}`, setUserSuccess, () => setData2(db))
        return
    }
    function saveFrontPage(e) {
        e.preventDefault()
        let key = generateUUID()
        setUserSuccess('Cargando')
        writeUserData(`/Tracking/${data['CODIGO DE SERVICIO']}`, { ...data, ['FECHA DE CREACION']: getDate(new Date()), subItems: data2, trackIcon: db }, setUserSuccess)
    }
    function close(e) {
        router.back()
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente, db])
    return (

        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className="fixed h-screen top-0 left-0 flex justify-center items-center w-full  bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%]  max-h-[90vh] overflow-auto lg:w-[50%] bg-white border-b rounded-[10px] pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] "  >
                        <div className='relative  px-2 py-5 my-5 mt-10 bg-white space-y-5'>
                            <h5 className='text-center font-medium text-[16px]'>DETALLE DEL SERVICIO {query}<br /> </h5>
                            <br />
                            <div className='relative flex  '>
                                {arrDB.map((i, index) => <div key={index} className='w-full  relative flex flex-col items-center m-2 cursor-pointer p-2' onClick={()=>onClickHandlerCountry(i)} >
                                    <span className={`absolute z-10  top-[-5px] left-0 right-0 mx-auto border-[2px] border-[#294B98] rounded-full  w-[10px] h-[10px] ${i.img === db['img'] ? 'bg-[#39ff27]' : 'bg-white '}`}></span>
                                    <img src={i.img} className={` inline h-[20px] sm:h-[25px] md:h-[50px]  ${ i.img === db['img'] ? 'grayscale-0 brightness-125' : 'grayscale '}`} alt="" />
                                    <span className={`h-[10px] text-[8px] sm:text-[12px] ${i.img === db['img'] ? 'text-[#294B98] font-medium' : ' font-medium'}`}>{i.text}</span>
                                </div>)}
                                <span className='absolute top-[5px] h-[2px] bg-[#294B98] w-full'></span>
                            </div>
                            <br />

                            < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} value={getDate(new Date())} disabled required label={'FECHA DE CREACION'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['CODIGO DE SERVICIO']} required label={'CODIGO DE SERVICIO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['CODIGO DE CLIENTE']} required label={'CODIGO DE CLIENTE'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['MODALIDAD DE TRANSPORTE']} required label={'MODALIDAD DE TRANSPORTE'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['PESO TN']} required label={'PESO TN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['SHIPPER']} required label={'SHIPPER'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['CONSIGNATARIO']} required label={'CONSIGNATARIO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['MANIFIESTO']} required label={'MANIFIESTO'} shadow='shadow-white' />
                            < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['ETD']} required label={'ETD'} shadow='shadow-white' />
                            < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['ETA']} required label={'ETA'} shadow='shadow-white' />

                            <h5 className='text-center font-medium text-[16px]'>STATUS +<br /> </h5>

                            <div className="relative flex ">
                                <button type='button' className="bg-red-500 text-white flex font-bold py-2 px-4 rounded-l" onClick={() => handlerLess2()}>
                                    -
                                </button>
                                <button type='button' className="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [`item${data2 !== undefined && Object.keys(data2).length}`]: { ic: '', ip: '' } })} >
                                    +
                                </button>
                            </div>

                            {data2 && data2 !== undefined && Object.values(data2).map((i, index) => {
                                return <div className=' space-y-5 lg:grid lg:grid-cols-2 lg:place-items-end lg:gap-5 border-b border-[#818181] pb-5'>
                                    < InputFlotante type="date" name={`ip`} uid={`column_${index}`} onChange={(e) => onChangeHandler2(e, index, 'd4')} value={data2[`item${index}`][`ip`] && data2[`item${index}`][`ip`] ? data2[`item${index}`][`ip`] : i[`ip`]} required label={'Item'} shadow='shadow-white' />
                                    < InputFlotante type="text" name={`ic`} uid={`value_${index}`} onChange={(e) => onChangeHandler2(e, index, 'd4')} value={data2[`item${index}`][`ic`] && data2[`item${index}`][`ic`] ? data2[`item${index}`][`ic`] : i[`ic`]} required label={'Valor'} shadow='shadow-white' />

                                    < InputFlotante type="date" name={`ipEN`} uid={`columnEN_${index}`} onChange={(e) => onChangeHandler2(e, index, 'd4')} value={data2[`item${index}`][`ipEN`] && data2[`item${index}`][`ipEN`] ? data2[`item${index}`][`ipEN`] : i[`ipEN`]}  label={'Item ingles'} shadow='shadow-white' />
                                    < InputFlotante type="text" name={`icEN`} uid={`valueEN_${index}`} onChange={(e) => onChangeHandler2(e, index, 'd4')} value={data2[`item${index}`][`icEN`] && data2[`item${index}`][`icEN`] ? data2[`item${index}`][`icEN`] : i[`icEN`]}  label={'Valor ingles'} shadow='shadow-white' />
                                </div>
                            })
                            }

                            <div className='flex justify-center'>
                                <Button type='submit' theme="Primary" click={(e) => { saveFrontPage(e,) }}>Guardar</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}

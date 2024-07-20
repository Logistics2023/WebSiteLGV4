'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState, useRef } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'
import SelectSimple from '@/components/SelectSimple'
import { equipoDB, mercanciaDB, tipoDeUnidadDB } from '@/db/arrDB'

export default function Home() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const refFirst = useRef(null);
    const [selectValue, setSelectValue] = useState('')
    const inputRef = useRef('')

    function handlerOnChange(e, key) {
        setData({ ...data, [key]: { ...data[key], [e.target.name]: e.target.value } })
    }
    function saveFrontPage(e, key) {
        e.preventDefault()
        if (data[key]) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/price${query}/${key}`, data[key], setUserSuccess)
        }
    }
    function saveFrontPage2(e, key) {
        e.preventDefault()
        if (data[key]) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/${query}/${key}`, data[key], setUserSuccess)
        }
    }
    function handlerClickSelect(name, i, uuid) {
        setData({ ...data, [uuid]: { ...data[uuid], [name.replaceAll(uuid, '')]: i } })
    }
    function saveNota(e, key) {
        e.preventDefault()
        console.log(e.target[0].value)
        if (e.target[0].value) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/`, { [`nota${query}`]: e.target[0].value }, setUserSuccess)
        }
        if (e.target[1].value) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/`, { [`nota${query}EN`]: e.target[1].value }, setUserSuccess)
        }
    }
    function getDB() {
        getSpecificData('/Cliente', setCliente)

    }
    function deleteHandler(e, route,) {
        e.preventDefault()
        setUserSuccess('Cargando')
        removeData(route, setUserSuccess, getDB)
    }

    function close(e) {
        router.back()
    }
    function sortArray(x, y) {
        if (x[1]['ORIGEN'].toLowerCase() < y[1]['ORIGEN'].toLowerCase()) { return -1 }
        if (x[1]['ORIGEN'].toLowerCase() > y[1]['ORIGEN'].toLowerCase()) { return 1 }
        return 0
    }
    function sortArray3(x, y) {
        if (x[1]['MERCANCIA'].toLowerCase() < y[1]['MERCANCIA'].toLowerCase()) { return -1 }
        if (x[1]['MERCANCIA'].toLowerCase() > y[1]['MERCANCIA'].toLowerCase()) { return 1 }
        return 0
    }
    function sortArray4(x, y) {
        if (x[1]['termino'].toLowerCase() < y[1]['termino'].toLowerCase()) { return -1 }
        if (x[1]['termino'].toLowerCase() > y[1]['termino'].toLowerCase()) { return 1 }
        return 0
    }
    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };
    console.log(data)
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente, success])
    return (
        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed top-0  w-screen h-screen  object-cover ' alt="" />

            <div className='relative pt-[90px] w-screen h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center p-5'>
                <Link href={`/Admin/Cotizador/Add?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                    <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                        ADD
                    </div>
                </Link>
                <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
                <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
                <div className="relative  overflow-x-auto shadow-md sm:rounded-lg z-10 p-5 bg-white scroll-smooth w-auto max-w-full rounded-[10px]" ref={refFirst}>
                    {/* <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">

                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-users" className="block p-2 ps-10 text-[12px] text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Buscar Usuario" />
                        </div>
                    </div> */}
                    {(query === 'FTL') && <form action="" className='flex items-center p-2' onSubmit={saveNota}>
                        <textarea type="text" rows='1' className='rounded-xl mr-5 p-5 min-w-[200px] border shadow-2xl resize-x focus:outline-none' defaultValue={cliente.notaFTL} placeholder='Nota de impresion' />
                        <textarea type="text" rows='1' className='rounded-xl mr-5 p-5 min-w-[200px] border shadow-2xl resize-x focus:outline-none' defaultValue={cliente.notaFTLEN} placeholder='Nota de impresion' />
                        <Button theme="Success" >Guardar</Button>
                    </form>}


                    {(query === 'FTL') && <table className="relative text-[12px] w-[2500px] text-left  text-gray-500 ">

                        <thead className="realative top-0 text-xs text-gray-700 uppercase    ">
                            <tr className="  border-y  border border-y-[#a0a0a0] " >

                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    ORIGEN
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    DESTINO
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    PESO (KG)
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    VOLUMEN M3
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    TIPO DE UNIDAD
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    MERCANCIA
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    SERVICIO
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    FLETE USD
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    SERVICIOS LOGISTICOS USD
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody className='space-y-5'>



                            {cliente && cliente[`price${query}`] && Object.entries(cliente[`price${query}`]).sort(sortArray).map((i, index) => {
                                return <tr className="bg-white border-b  hover:bg-gray-50 border border-b-[#a0a0a0] " key={index}>

                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_1`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['ORIGEN'] !== undefined ? data[i[0]]['ORIGEN'] : i[1]['ORIGEN']} required table label={'ORIGEN'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_2`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['DESTINO'] !== undefined ? data[i[0]]['DESTINO'] : i[1]['DESTINO']} required table label={'DESTINO'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="number" id={`floating_3`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['PESO (KG)'] !== undefined ? data[i[0]]['PESO (KG)'] : i[1]['PESO (KG)']} required table label={'PESO (KG)'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="number" id={`floating_4`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['VOLUMEN M3'] !== undefined ? data[i[0]]['VOLUMEN M3'] : i[1]['VOLUMEN M3']} required table label={'VOLUMEN M3'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_5`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['TIPO DE UNIDAD'] !== undefined ? data[i[0]]['TIPO DE UNIDAD'] : i[1]['TIPO DE UNIDAD']} required table label={'TIPO DE UNIDAD'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_6`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['MERCANCIA'] !== undefined ? data[i[0]]['MERCANCIA'] : i[1]['MERCANCIA']} required table label={'MERCANCIA'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_7`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['SERVICIO'] !== undefined ? data[i[0]]['SERVICIO'] : i[1]['SERVICIO']} required table label={'SERVICIO'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="number" id={`floating_8`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['FLETE USD'] !== undefined ? data[i[0]]['FLETE USD'] : i[1]['FLETE USD']} required table label={'FLETE USD'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="number" id={`floating_9`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['SERVICIOS LOGISTICOS USD'] !== undefined ? data[i[0]]['SERVICIOS LOGISTICOS USD'] : i[1]['SERVICIOS LOGISTICOS USD']} required table label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white' />
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/price${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button theme="Success" click={(e) => { saveFrontPage(e, i[0]) }}>Guardar</Button>
                                    </td>
                                </tr>
                            })

                            }
                        </tbody>
                    </table>}
                    {(query === 'FCL') && <form action="" className='flex items-center p-2' onSubmit={saveNota}>
                        <textarea type="text" rows='1' className='rounded-xl mr-5 p-5 min-w-[200px] border shadow-2xl resize focus:outline-none' defaultValue={cliente.notaFCL} placeholder='Nota de impresion' />
                        <textarea type="text" rows='1' className='rounded-xl mr-5 p-5 min-w-[200px] border shadow-2xl resize focus:outline-none' defaultValue={cliente.notaFCLEN} placeholder='Nota de impresion ingles' />
                        <Button theme="Success" >Guardar</Button>
                    </form>}


                    {(query === 'FCL') && <table className="relative text-[12px] w-[2000px] text-left  text-gray-500 ">
                        <thead className="realative top-0 text-xs text-gray-700 uppercase    ">
                            <tr className="  border-y  border border-y-[#a0a0a0] " >
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    ORIGEN
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    DESTINO
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    NAVIERA
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    EQUIPO
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    TT
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    VALIDEZ
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody className='space-y-5'>



                            {cliente && cliente[`price${query}`] && Object.entries(cliente[`price${query}`]).sort(sortArray).map((i, index) => {
                                return <tr className="bg-white border-b  hover:bg-gray-50 border border-b-[#a0a0a0] " key={index}>

                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_1`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['ORIGEN'] !== undefined ? data[i[0]]['ORIGEN'] : i[1]['ORIGEN']} required table label={'ORIGEN'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_2`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['DESTINO'] !== undefined ? data[i[0]]['DESTINO'] : i[1]['DESTINO']} required table label={'DESTINO'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_3`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['NAVIERA'] !== undefined ? data[i[0]]['NAVIERA'] : i[1]['NAVIERA']} required table label={'NAVIERA'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-3 py-4 w-[200px]">
                                        {/* < InputFlotante type="text" id={`floating_4`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['EQUIPO'] !== undefined ? data[i[0]]['EQUIPO'] : i[1]['EQUIPO']} required table label={'EQUIPO'} shadow='shadow-white' /> */}
                                        <SelectSimple arr={equipoDB} name={'EQUIPO' + i[0]} click={handlerClickSelect} defaultValue={data[i[0]] && data[i[0]]['EQUIPO'] !== undefined ? data[i[0]]['EQUIPO'] : i[1]['EQUIPO']} uuid={i[0]} diferent={true} label='Equipo' required={true}></SelectSimple>
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_3`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['TT'] !== undefined ? data[i[0]]['TT'] : i[1]['TT']} required table label={'TT'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="date" id={`floating_4`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['VALIDEZ'] !== undefined ? data[i[0]]['VALIDEZ'] : i[1]['VALIDEZ']} required table label={'VALIDEZ'} shadow='shadow-white' />
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/price${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button theme="Success" click={(e) => { saveFrontPage(e, i[0]) }}>Guardar</Button>
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button theme="Success" click={(e) => { router.push(`/Admin/Cotizador/AddColumns?item=${i[0]}`) }}>Mas Detalles</Button>
                                    </td>
                                </tr>
                            })

                            }
                        </tbody>
                    </table>}
                    {(query === 'mercancias') && <div className='my-10'><Link href='/Admin/Cotizador/ComisionFTL'> <Button theme="Primary" >Comision Mercancia</Button></Link></div>}

                    {query === 'mercancias' && <table className="relative text-[12px] w-[800px] text-left rtl:text-right text-gray-500 ">
                        <thead className="realative top-0 text-xs text-gray-700 uppercase    ">
                            <tr className="  border-y  border border-y-[#a0a0a0] " >
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    MERCANCIA
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    GA
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    IVA
                                </th>

                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cliente && cliente[query] && Object.entries(cliente[query]).sort(sortArray3).map((i, index) => {
                                return <tr className="bg-white border-b  hover:bg-gray-50 border border-b-[#a0a0a0] " key={index}>

                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_10`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['MERCANCIA'] !== undefined ? data[i[0]]['MERCANCIA'] : i[1]['MERCANCIA']} required table label={'MERCANCIA'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_11`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['GA'] !== undefined ? data[i[0]]['GA'] : i[1]['GA']} required table label={'GA'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="number" id={`floating_12`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['IVA'] !== undefined ? data[i[0]]['IVA'] : i[1]['IVA']} required table label={'IVA'} shadow='shadow-white' />
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button theme="Success" click={(e) => { saveFrontPage2(e, i[0]) }}>Guardar</Button>
                                    </td>

                                </tr>
                            })

                            }
                        </tbody>
                    </table>}

                    {query === 'glosario' && <table className="relative text-[12px] w-[800px] text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>

                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    Termino
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    Significado
                                </th>

                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cliente && cliente[query] && Object.entries(cliente[query]).sort(sortArray4).map((i, index) => {
                                return <tr className="bg-white border-b  hover:bg-gray-50 border border-b-[#a0a0a0] " key={index}>

                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_13`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['termino'] !== undefined ? data[i[0]]['termino'] : i[1]['termino']} required table label={'termino'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_14`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['significado'] !== undefined ? data[i[0]]['significado'] : i[1]['significado']} required table label={'significado'} shadow='shadow-white' />
                                    </td>
                                    <td className=" w-[150px] px-6 py-4">
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                    </td>
                                    <td className="w-[150px] px-6 py-4">
                                        <Button theme="Success" click={(e) => { saveFrontPage2(e, i[0]) }}>Guardar</Button>
                                    </td>

                                </tr>
                            })

                            }
                        </tbody>
                    </table>}

                </div>





            </div>



            {success === 'Cargando' && <Loader></Loader>}
        </div>
    )
}







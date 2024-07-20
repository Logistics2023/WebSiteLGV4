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

export default function Home() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const refFirst = useRef(null);

    function handlerOnChange(e, key) {
        setData({ ...data, [key]: { ...data[key], [e.target.name]: e.target.value } })
    }
    function saveFrontPage(e, key) {
        e.preventDefault()
        if (data[key]) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/comisionFTL/${key}`, data[key], setUserSuccess)
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
        if (x[1]['de'] *1 < 1* y[1]['de']) { return -1 }
        if (x[1]['de'] *1> 1* y[1]['de']) { return 1 }
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
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente, success])
    return (
        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed top-0  w-screen h-screen  object-cover ' alt="" />

            <div className='relative pt-[90px] w-screen h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center p-5'>
                {/* <Link href={`/Admin/Cotizador/Add?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                    <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                        ADD
                    </div>
                </Link> */}
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
                    <table className="relative text-[12px] w-[800px] text-left  text-gray-500 ">
                        <thead className="realative top-0 text-xs text-gray-700 uppercase  bg-gray-50  ">

                            <tr className=''>
                                <th colspan="3" scope="colgroup" className="text-[12px] text-center font-bold px-6 py-3">
                                    COMISION AGENCIA
                                </th>
                            </tr>
                            <tr className=''>
                                <th colspan="2" scope="colgroup" className="text-[12px] text-center font-bold px-6 py-3">
                                    VALOR CIF FRONTERA
                                </th>
                                <th scope="col" className="text-[12px] text-center font-bold px-6 py-3">
                                    TARIFA
                                </th>
                            </tr>
                        </thead>
                        <tbody className='space-y-5'>
                            {cliente && cliente[`comisionFTL`] && Object.entries(cliente[`comisionFTL`]).sort(sortArray).map((i, index) => {
                                return <tr className="bg-white border-b  hover:bg-gray-50 border border-b-[#a0a0a0] " key={index}>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="number" id={`floating_1`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['de'] ? data[i[0]]['de'] : i[1]['de']} required table label={'de'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="nember" id={`floating_2`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['hasta'] ? data[i[0]]['hasta'] : i[1]['hasta']} required table label={'hasta'} shadow='shadow-white' />
                                    </td>
                                    <td className="px-6 py-4">
                                        < InputFlotante type="text" id={`floating_3`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['monto'] ? data[i[0]]['monto'] : i[1]['monto']} required table label={'monto'} shadow='shadow-white' />
                                    </td>
                                    {/* <td className="w-[150px] px-6 py-4">
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/comisionFTL/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                    </td> */}
                                    <td className="w-[150px] px-6 py-4">
                                        <Button theme="Success" click={(e) => { saveFrontPage(e, i[0]) }}>Guardar</Button>
                                    </td>
                                </tr>
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {success === 'Cargando' && <Loader></Loader>}
        </div>
    )
}







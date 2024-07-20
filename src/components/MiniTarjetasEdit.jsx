'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import InputFlotante from '@/components/InputFlotante'
import "animate.css/animate.compat.css"


export default function Home() {
    const { user, introVideo, userDB, option, setOption, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const [query, setQuery] = useState('')
    const [data2, setData2] = useState({})

    function onChangeHandler2(e, i) {
        setData2({ ...data2, [i]: { ...data2[i], [e.target.name]: e.target.value } })
    }

    function saveMiniTarjetas(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}`, { miniTarjetas: data2 }, setUserSuccess)
    }

    function getDB() {
        getSpecificData('/Cliente', setCliente)
        console.log('ejec')

    }
    function deleteHandler(e, route, key) {
        e.preventDefault()
        setUserSuccess('Cargando')
        removeData(route, setUserSuccess, getDB)
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }

        if (cliente && cliente[query] && cliente[query] && cliente[query].miniTarjetas) {
            setData2({ ...cliente[query].miniTarjetas })
        }
    }, [cliente])
    useEffect(() => {
        if (Object.keys(data2).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].miniTarjetas) {
            setData2({ ...cliente[query].miniTarjetas, ...data2, })
        }
    }, [data2, query, option, cliente, success])
    return (
        option === 'MiniTarjetas' && <form className="relative  pt-5" onSubmit={saveMiniTarjetas} >
            <Link href={`/Admin/Edit/Add?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                    ADD
                </div>
            </Link>
            {/* ---------------------------------MINI TARJETAS------------------------------------------- */}
            {data2 && data2 !== undefined && Object.entries(data2).map((i, index) => {
                return <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2  md:gap-2 pb-5 border-b-[.5px] mb-5 border-[#666666]" key={`input-${index}`}>
                    <h4 className='col-span-2  text-base font-bold leading-7 text-gray-900  text-center p-5'>MINI TARJETA</h4>
                    < InputFlotante type="text" name={`ip`} id={`floating_1`} onChange={(e) => onChangeHandler2(e, i[0])} value={data2[i[0]] && data2[i[0]]['ip'] ? data2[i[0]]['ip'] : i[1][`ip`]} required label={'Item principal'} shadow='shadow-white' />
                    < InputFlotante type="text" name={`ic`} id={`floating_2`} onChange={(e) => onChangeHandler2(e, i[0])} value={data2[i[0]] && data2[i[0]]['ic'] ? data2[i[0]]['ic'] : i[1][`ic`]} required label={'Item contenido'} shadow='shadow-white' />
                    
                    < InputFlotante type="text" name={`ipEN`} id={`floating_1`} onChange={(e) => onChangeHandler2(e, i[0])} value={data2[i[0]] && data2[i[0]]['ipEN'] ? data2[i[0]]['ipEN'] : i[1][`ipEN`]} label={'Item principal ingles'} shadow='shadow-white' />
                    < InputFlotante type="text" name={`icEN`} id={`floating_2`} onChange={(e) => onChangeHandler2(e, i[0])} value={data2[i[0]] && data2[i[0]]['icEN'] ? data2[i[0]]['icEN'] : i[1][`icEN`]} label={'Item contenido ingles'} shadow='shadow-white' />
                    
                    
                    <div className="col-span-2 mt-6 flex items-center justify-center gap-x-6">
                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/miniTarjetas/${i[0]}`, i[0])}>Eliminar</Button>
                        <Button type="submit" theme="Primary">Guardar</Button>
                    </div>

                </div>
            })
            }
            {/* ----------------------------------------------------------------------------------------- */}
        </form>
    )
}







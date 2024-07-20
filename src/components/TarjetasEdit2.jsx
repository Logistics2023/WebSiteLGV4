'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import { uploadIMG } from '@/firebase/storage'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import InputFlotante from '@/components/InputFlotante'
import "animate.css/animate.compat.css"
import TextEditorSimple from '@/components/TextEditorSimple'



export default function Home() {
    const { user, introVideo, userDB, option, setOption, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const [itemEdit, setItemEdit] = useState([''])
    const [query, setQuery] = useState('')
    const [data3, setData3] = useState({})

    function onChangeHandler3(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], [e.target.name]: e.target.value } })
    }
    function onChangeHandler4(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], paragraph: e } })
    }
    function onChangeHandler5(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], paragraphEN: e } })
    }
    function saveFrontPage2(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        Object.entries(data3).map(i => {
            let db = { ...i[1] }
            delete db['file']
            if (i[1].file && i[1].file !== undefined) {
                uploadIMG(`/Cliente/${query}/tarjetas/${[i[0]]}`, '/', `/${query}/tarjetas/${[i[0]]}`, i[1].file, db, setUserSuccess)
            } else {
                writeUserData(`/Cliente/${query}/tarjetas`, { [i[0]]: db }, setUserSuccess)
            }
        })
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
        if (cliente && cliente[query] && cliente[query] && cliente[query].tarjetas) {
            console.log('getData3')
            setData3({ ...cliente[query].tarjetas })
        }
    }, [cliente])
    useEffect(() => {
        if (Object.keys(data3).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].tarjetas) {
            console.log('getData3')
            setData3({ ...cliente[query].tarjetas, ...data3, })
        }
    }, [data3, query, option, cliente, success])
    console.log(data3.images)
    return (
        query !== 'contactos' && option === 'Tarjetas' && <form className="relative  pt-10" onSubmit={saveFrontPage2} >
            <Link href={`/Admin/Edit/AddTarjetas?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                    ADD
                </div>
            </Link>
            {/* ---------------------------------TARJETAS 3---------------------------------------- */}

            {data3 && data3 !== undefined && Object.entries(data3).map((i) => {
                return <div className="">
                    {i[0].includes(itemEdit) && <div className={`flex items-center justify-between py-5 transition-all border-b-[.5px] border-[#666666] ${itemEdit === i[0] ? ' bg-gradient-to-t from-[#00195cbe] via-[#00195cbe] to-[#00195c]  p-5 text-white' : ''} `} onClick={() => itemEdit == i[0] ? setItemEdit('') : setItemEdit(i[0])}>
                        <span className='font-bold uppercase w-[50%]'>
                            {i[1][`title`]}
                        </span>
                        <Link type='button' className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-[20px] text-white font-bold py-2 px-4 " href={`/Admin/Edit/AddContentTarjetas?item=${query}&route=${i[0]}`} >
                            Añadir galeria IMG
                        </Link>
                    </div>}
                    {itemEdit === i[0] && <div className='space-y-5'>
                        <div className="w-full flex justify-center">
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]"
                                style={{
                                    backgroundImage: `url(${i[1][`url`]})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="text-center flex flex-col justify-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                                </div>
                            </div>
                        </div>
                        < InputFlotante type="text" name={`url`} id={`floating_5`} onChange={(e) => onChangeHandler3(e, i[0])} value={data3[i[0]] && data3[i[0]]['url'] ? data3[i[0]]['url'] : i[1][`url`]} required label={'IMG url'} shadow='shadow-white' />
                        < InputFlotante type="text" name={`title`} id={`floating_6`} onChange={(e) => onChangeHandler3(e, i[0])} value={data3[i[0]] && data3[i[0]]['title'] ? data3[i[0]]['title'] : i[1][`title`]} required label={'Titulo'} shadow='shadow-white' />
                        < InputFlotante type="text" name={`titleEN`} id={`floating_6`} onChange={(e) => onChangeHandler3(e, i[0])} value={data3[i[0]] && data3[i[0]]['titleEN'] ? data3[i[0]]['titleEN'] : i[1][`titleEN`]} required label={'Titulo Ingles'} shadow='shadow-white' />
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Descripción</label>
                        <TextEditorSimple value={i[1][`paragraph`]} setValue={(e) => onChangeHandler4(e, i[0])} edit={true} ></TextEditorSimple>
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Descripción (Ingles)</label>
                        <TextEditorSimple value={i[1][`paragraphEN`]} setValue={(e) => onChangeHandler5(e, i[0])} edit={true} ></TextEditorSimple>
                        <br />
                        <div className='flex justify-center'>
                            <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/tarjetas/${i[0]}`, i[0], setData3)}>Eliminar</Button>
                            <Button type="submit" theme="Primary">Guardar</Button>
                        </div>
                    </div>}
                </div>
            })
            }




            {/* ----------------------------------------------------------------------------------------- */}
        </form>
    )
}



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
                writeUserData(`/Cliente/${option}/`, { [i[0]]: db }, setUserSuccess)
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

        if (Object.keys(data3).length === 0 && cliente && cliente[option] && cliente[option]) {
            console.log('getData3')
            setData3({ ...cliente[option], ...data3, })
        }

    }, [data3, query, option, cliente, success])
    console.log()
    console.log(data3)
    return (
         <form className="relative  pt-10" onSubmit={saveFrontPage2} >
            <Link href={`/Admin/Edit/AddTestimonios?item=Testimonios`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
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
                        <Link type='button' className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-[20px] text-white font-bold py-2 px-4 " href={`/Admin/Edit/AddContent?item=${query}&route=${i[0]}`} >
                            Mas contenido
                        </Link>
                    </div>}
                    {itemEdit === i[0] && <div className='space-y-5 pt-10'>
                       
                        < InputFlotante type="text" name={`title`} id={`floating_6`} onChange={(e) => onChangeHandler3(e, i[0])} value={data3[i[0]] && data3[i[0]]['title'] ? data3[i[0]]['title'] : i[1][`title`]} required label={'Nombre'} shadow='shadow-white' />
                        < InputFlotante type="text" name={`titleEN`} id={`floating_6`} onChange={(e) => onChangeHandler3(e, i[0])} value={data3[i[0]] && data3[i[0]]['titleEN'] ? data3[i[0]]['titleEN'] : i[1][`titleEN`]} required label={'Nombre'} shadow='shadow-white' />
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Testimonio</label>
                        <TextEditorSimple value={i[1][`paragraph`]} setValue={(e) => onChangeHandler4(e, i[0])} edit={true} ></TextEditorSimple>
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Testimonio (Ingles)</label>
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






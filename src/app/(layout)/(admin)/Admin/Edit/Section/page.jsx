'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import "animate.css/animate.compat.css"
import { useRouter } from 'next/navigation';
import SectionEdit from '@/components/SectionEdit'
import MiniTarjetasEdit from '@/components/MiniTarjetasEdit'
import TarjetasEdit from '@/components/TarjetasEdit'
import TarjetasEdit2 from '@/components/TarjetasEdit2'
import TarjetasEdit3 from '@/components/TarjetasEdit3'
import TarjetasEdit4 from '@/components/TarjetasEdit4'
import SliderEdit from '@/components/SliderEdit'
import Contactos from '@/components/Contactos'
import Link from 'next/link'

function NavSection() {

    const { user, introVideo, userDB, option, setOption, cliente } = useUser()
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])
    return (
        <div className='w-full'>
            <ul className="flex border-b border-[blue] ">
                <li className={`-mb-px mr-1 ${option === 'Seccion' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Seccion')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-700 font-semibold" href="#">Seccion</Link>
                </li>
                <li className={`-mb-px mr-1 ${option === 'MiniTarjetas' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('MiniTarjetas')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold" href="#">MiniTarjetas</Link>
                </li>
                {query !== 'inicio' && <li className={`-mb-px mr-1 ${option === 'Tarjetas' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Tarjetas')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500  font-semibold" href="#">Tarjetas</Link>
                </li>}
            </ul>
        </div>
    )
}


function NavSection2() {

    const { user, introVideo, userDB, option, setOption, cliente } = useUser()
    const [query, setQuery] = useState('')
    

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1].split('&')[0])
        }
    }, [cliente, option])
    return (
        <div className='w-full'>
            <ul className="flex border-b border-[blue] ">
                <li className={`-mb-px mr-1 ${option === 'Seccion' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Seccion')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-700 font-semibold cursor-pointer" href={`/Seccion?item=${query}&opcion=seccion`}>Seccion</Link>
                </li>
                <li className={`-mb-px mr-1 ${option === 'MiniTarjetas' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('MiniTarjetas')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold cursor-pointer" href="#">MiniTarjetas</Link>
                </li>
               <li className={`-mb-px mr-1 ${option === 'Tarjetas' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Tarjetas')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500  font-semibold cursor-pointer" href="#">Tarjetas</Link>
                </li>
                <li className={`-mb-px mr-1 ${option === 'Slider1' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Slider1')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold cursor-pointer" href="#">Clientes</Link>
                </li>
                <li className={`-mb-px mr-1 ${option === 'Slider2' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Slider2')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold cursor-pointer" href="#">Socios</Link>
                </li>
                <li className={`-mb-px mr-1 ${option === 'Slider3' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Slider3')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold cursor-pointer" href="#">Empresas</Link>
                </li>
                <li className={`-mb-px mr-1 ${option === 'Testimonios' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Testimonios')}>
                    <Link className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold cursor-pointer" href="#">Testimonios</Link>
                </li>
            </ul>
        </div>
    )
}






export default function Home() {

    const { user, introVideo, userDB, option, setOption, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')

    function close(e) {
        router.back()
    }

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente,option])
    return (
        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />
            <div className="fixed  top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] pb-[200px]  h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16  lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    {query !== 'contactos' && query !== 'experiencia' && query !== 'solucionesIT' &&<>
                        <NavSection />
                        {option === 'Seccion' && <SectionEdit />}
                        {option === 'MiniTarjetas' && <MiniTarjetasEdit />}
                        {option === 'Tarjetas' && <TarjetasEdit />}
                    </>}
                    {query !== 'contactos' && query !== 'experiencia'&& query === 'solucionesIT' && <>
                        <NavSection />
                        {option === 'Seccion' && <SectionEdit />}
                        {option === 'MiniTarjetas' && <MiniTarjetasEdit />}
                        {option === 'Tarjetas' && <TarjetasEdit4 />
                        }

                    </>}
                    {query === 'experiencia' && query !== 'solucionesIT' && <>
                        <NavSection2 />
                        {option === 'Seccion' && <SectionEdit />}
                        {option === 'MiniTarjetas' && <MiniTarjetasEdit />}
                        {option === 'Tarjetas' && <TarjetasEdit2 />}
                        {option === 'Slider1' && <SliderEdit content={[]} />}
                        {option === 'Slider2' && <SliderEdit content={[]} />}
                        {option === 'Slider3' && <SliderEdit content={[]} />}
                        {option === 'Testimonios' && <TarjetasEdit3 />}

                    </>}

                    {query === 'contactos' && <Contactos />}
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}







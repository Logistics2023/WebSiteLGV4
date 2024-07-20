'use client';

import Link from 'next/link'
import "animate.css/animate.compat.css"



const Button = ({ url, children, src }) => {
    return <button className='bg-[#ffbd2f] w-[150px] sm:w-[200px] lg:w-[250px] flex flex-col justify-self-center justify-center items-center  p-2 rounded-[5px]  m-3'>
        <img src={src} className='w-[100px]' alt="" />
        <Link href={`/Admin/Cotizador/Section?item=${url}`} className='font-medium'> {children}</Link>
    </button>
}
export default function Home() {

    return (
        <div className="relative min-h-full">
            <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />
            <div className='relative  py-[100px]  bg-gradient-to-t from-[#00061860] to-[#000618d1] lg: pb-[100px] lg:pb-0  h-screen flex flex-col justify-center z-10 '>
                <div className='flex justify-center'>
                    <img src="/logo.svg" className='w-[80vw] sm:w-[50vw] lg:w-[25vw]' alt="User" />
                </div>
                <div className='relative   z-10  grid  grid-cols-2   lg:grid-cols-4 '>
                    <Button url='FTL' src="/icons/FTL.png" >Cotizador FTL  </Button>
                    <Button url='FCL' src="/icons/FCL.png" > Cotizador FCL  </Button>
                    <Button url='mercancias' src="/icons/DESPACHO DE EXPORTACION.png" > Mercancia </Button>
                    <Button url='glosario' src="/icons/GLOSARIO.png" > Glosario </Button>
                </div>
            </div>
        </div>
    )
}

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card2 from '@/components/Card2'


function Admin() {
    // const { user } = useUser()
    const router = useRouter()

    function redirection(url) {
        router.push(url)
    }


    // useEffect(() => {
    //     setUserPdfData({})       
    // }, []);

    return (
        <div className=''>
            {/* <img src="/truck.png" className='fixed  w-screen h-screen  object-cover lg:hidden' alt="" /> */}
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className='relative bg-gradient-to-t from-[#00061860]  pb-[100px] lg:pb-0  to-[#000618d1] min-h-screen py-[100px] z-10 '>
                <div className='hidden lg:flex justify-center'>
                    <img src="/logo.svg" className='w-[20vw]' alt="User" />
                </div>

                <div className='flex flex-col justify-around items-center z-10 lg:flex lg:flex-row lg:justify-around'>
                    <Card2 img="/usuarios.png" buttonText={"Administrar Clientes"} click={(e) => redirection("Admin/Users")} />
                    <Card2 img="/editor.png" buttonText={"Editor Web"} click={(e) => redirection("Admin/Edit")} />
                    <Card2 img="/cotizador.png" buttonText={"Cotizador"} click={(e) => redirection("Admin/Cotizador")} />
                    <Card2 img="/cotizador.png" buttonText={"Tracking"} click={(e) => redirection("Admin/Tracking")} />
                </div>
            </div>

            
        </div >

    )
}

export default Admin
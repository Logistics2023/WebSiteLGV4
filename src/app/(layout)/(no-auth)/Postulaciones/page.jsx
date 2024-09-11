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
import Error from '@/components/Error'
import Success from '@/components/Success'

import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import SelectSimple from '@/components/SelectSimple'
import { arrDB } from '@/db/arrDB'
import ReCAPTCHA from "react-google-recaptcha";
import { PDFDocument } from 'pdf-lib';







export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [captcha, setCaptcha] = useState('')
    const [pdfName, setPDFname] = useState('Subir CV PDF')



    function handlerOnChange(e, key) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function handlerClickSelect(name, i, uuid) {
        let db = { [name]: i }
        setData({ ...data, ...db })
    }



    function handlerOnChangePDF(e) {
console.log((e.target.files[0].size / 1024 / 1024).toFixed(2) > 3)
        if ((e.target.files[0].size / 1024 / 1024).toFixed(2) > 3.5) {
            console.log('con')
            setModal('El PDF no puede ser mayor a 3.5mb')
            return
        }
        console.log((e.target.files[0].size / 1024 / 1024).toFixed(2))
        var fileToLoad = e.target.files[0];
        var fileReader = new FileReader();
        var base64;
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            console.log(base64);

            setData({ ...data, cv: base64 })
            setPDFname(e.target.files[0].name)
        };
        fileReader.readAsDataURL(fileToLoad);
    }

    async function saveFrontPage(e) {
        e.preventDefault()
        setModal('Enviando Postulacion...')
        console.log('click')
        console.log((pdfName == 'Subir CV PDF' || data.cv === null || data.cv === undefined))
        if ((pdfName == 'Subir CV PDF' || data.cv === null || data.cv === undefined)) {
            console.log('error')
            setUserSuccess('PDFerror')
            return
        }
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await res.json()
        if (resData?.success !== undefined && resData?.success === 'true') {
            setModal('Postulación enviada')
        } else if (resData?.success !== undefined && resData?.success === false && resData.err.code === 'EENVELOPE') {
            setModal('Error de validacion de tu correo')
        } else {
            setModal('Error de envio')
        }

        console.log(resData)
        // writeUserData(`/Tracking/${data['CODIGO DE SERVICIO']}`, { ...data, ['FECHA DE CREACION']: getDate(new Date()), subItems: data2, trackIcon: db }, setUserSuccess)
    }

    function handlerCheckOnchange(e) {
        console.log(e.target.checked)
        setData({ ...data, 'Estudia actualmente': e.target.checked })
    }



    console.log(data)
    function onChange(value) {
        setCaptcha(value);
    }
    // console.log(data)

    return (

        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className="fixed h-screen flex justify-center items-end  w-full  bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%]  max-h-[90vh] overflow-auto lg:w-[50%] bg-white border-b  py-5  px-5">

                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] " onSubmit={(e) => { saveFrontPage(e,) }}>

                        <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={() => router.back()}>
                            X
                        </div>
                        <div className='relative  px-2 py-5 my-5 mt-10 bg-white space-y-5'>

                            <h5 className='text-center font-medium text-[16px]'>Formulario de Postulación - Logistics Gear {query}<br /> </h5>
                            <br />
                            {/* < InputFlotante type="date" id="floating_5" onChange={(e) => handlerOnChange(e)} value={getDate(new Date())} disabled required label={'Fecha'} shadow='shadow-white' /> */}
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['Nombre completo']} required label={'Nombre completo'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['Correo electrónico']} required label={'Correo electrónico'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['Celular']} required label={'Celular'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['Lugar de residencia']} required label={'Lugar de residencia'} shadow='shadow-white' />
                            <SelectSimple arr={['Prácticas profesionales', 'Puesto de trabajo']} name='Tipo de postulación' click={handlerClickSelect} defaultValue={data['Tipo de postulación'] ? data['Tipo de postulación'] : 'Seleccionar'} uuid='8768798' label='Prácticas profesionales' required={true}></SelectSimple>
                            {data['Tipo de postulación'] && data['Tipo de postulación'] === 'Prácticas profesionales' && <div className="flex items-start">
                                <div className="flex items-center">
                                    <Link href="/Politicas" className="ml-2 text-[14px] font-medium text-gray-800 ">Estudia actualmente</Link>
                                    <div className="flex items-center h-5 ml-5">
                                        <input id="remember" type="checkbox" value="" onChange={handlerCheckOnchange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                    </div>
                                </div>
                            </div>}
                            {data['Tipo de postulación'] && data['Tipo de postulación'] === 'Prácticas profesionales' && < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['Institución educativa']} required name={'Institucion educativa'} label={'Institución educativa'} shadow='shadow-white' />}

                            <SelectSimple arr={['Comercial', 'Operaciones', 'Marketing', 'Diseño Gráfico', 'Sistemas Informáticos']} name='Área a postula' click={handlerClickSelect} defaultValue={data['Área a postula'] ? data['Área a postula'] : 'Seleccionar'} uuid='8768798' label='Área a postular' required={true}></SelectSimple>
                            {/* < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['Área a postula']} required name={'Area a postula'} label={'Área a postula'} shadow='shadow-white' /> */}

                            <div className='relative'>
                                <label htmlFor='file' className=" relative w-full flex  justify-center items-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px]  px-5 py-2 text-center z-20" >
                                    {pdfName}
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.568 1.4248L20.3932 5.41231V20.5758H6.10352V20.6253H20.442V5.46249L16.568 1.4248Z" fill="#909090" />
                                        <path d="M16.5205 1.375H6.05469V20.5755H20.3932V5.41269L16.5205 1.375Z" fill="#F4F4F4" />
                                        <path d="M5.94977 2.40625H1.55664V7.09981H15.3754V2.40625H5.94977Z" fill="#7A7B7C" />
                                        <path d="M15.4494 7.02024H1.64648V2.32324H15.4494V7.02024Z" fill="#DD2025" />
                                        <path d="M6.22278 3.11684H5.32422V6.41684H6.03097V5.30378L6.18703 5.31272C6.33872 5.31063 6.48903 5.28345 6.63184 5.23228C6.7574 5.18965 6.87279 5.12154 6.97078 5.03222C7.07127 4.94796 7.15022 4.84096 7.20109 4.72009C7.2707 4.51983 7.29535 4.3067 7.27328 4.09584C7.26936 3.94518 7.24294 3.79594 7.19491 3.65309C7.15162 3.54983 7.08725 3.45675 7.00592 3.3798C6.92459 3.30285 6.82809 3.24373 6.72259 3.20622C6.63165 3.17253 6.53739 3.14857 6.44141 3.13472C6.3689 3.12291 6.29556 3.11693 6.22209 3.11684M6.09216 4.69397H6.03097V3.67647H6.16366C6.22222 3.67224 6.28098 3.68123 6.3356 3.70277C6.39022 3.72431 6.4393 3.75785 6.47922 3.8009C6.56194 3.9116 6.60613 4.04634 6.60503 4.18453C6.60503 4.35365 6.60503 4.50697 6.45241 4.6149C6.34248 4.67545 6.2173 4.70337 6.09216 4.69397ZM8.61597 3.1079C8.53966 3.1079 8.46541 3.1134 8.41316 3.11547L8.24953 3.11959H7.71328V6.41959H8.34441C8.58557 6.42579 8.82563 6.38493 9.05116 6.29928C9.23274 6.22757 9.39346 6.11152 9.51866 5.96172C9.64134 5.81126 9.72894 5.63535 9.77509 5.44678C9.82932 5.2336 9.85566 5.01429 9.85347 4.79434C9.86693 4.53457 9.84682 4.27415 9.79366 4.01953C9.74276 3.83231 9.64856 3.65969 9.51866 3.51559C9.41677 3.39907 9.29143 3.30536 9.15084 3.24059C9.03041 3.18477 8.90368 3.14368 8.77341 3.11822C8.7216 3.10972 8.66915 3.10581 8.61666 3.10653M8.49153 5.81322H8.42278V3.70672H8.43172C8.57346 3.69033 8.71688 3.7159 8.84422 3.78028C8.93749 3.85475 9.01349 3.94858 9.06697 4.05528C9.12469 4.16757 9.15796 4.29082 9.16459 4.4169C9.17078 4.56815 9.16459 4.6919 9.16459 4.79434C9.16714 4.91234 9.15955 5.03033 9.14191 5.14703C9.12028 5.2667 9.08113 5.38253 9.02572 5.49078C8.96312 5.59173 8.87763 5.67652 8.77616 5.73828C8.6914 5.79328 8.5909 5.81889 8.49016 5.81115M11.9827 3.11959H10.312V6.41959H11.0188V5.11059H11.9125V4.49734H11.0188V3.73284H11.9813V3.11959" fill="#464648" />
                                        <path d="M14.9735 13.9258C14.9735 13.9258 17.1652 13.5284 17.1652 14.2771C17.1652 15.0258 15.8074 14.7212 14.9735 13.9258ZM13.3531 13.9828C13.0048 14.0596 12.6654 14.1722 12.3404 14.319L12.6154 13.7003C12.8904 13.0815 13.1757 12.238 13.1757 12.238C13.503 12.7908 13.8849 13.3095 14.3156 13.7862C13.9913 13.8345 13.67 13.9006 13.3531 13.9842V13.9828ZM12.4854 9.51409C12.4854 8.86165 12.6965 8.68359 12.8608 8.68359C13.0251 8.68359 13.2101 8.76265 13.2162 9.32915C13.1626 9.89878 13.0434 10.4603 12.8608 11.0025C12.6099 10.5476 12.4804 10.0357 12.4847 9.51615L12.4854 9.51409ZM9.28924 16.7438C8.61687 16.3417 10.6993 15.1035 11.0767 15.0636C11.0747 15.0643 9.99324 17.1646 9.28924 16.7438ZM17.8053 14.3658C17.7984 14.297 17.7366 13.536 16.3822 13.5683C15.8176 13.5584 15.2533 13.5982 14.6957 13.6872C14.1553 13.1432 13.6901 12.5293 13.3125 11.8619C13.5502 11.1739 13.6943 10.4571 13.7408 9.73065C13.7209 8.90565 13.5236 8.43265 12.8911 8.43953C12.2586 8.4464 12.1664 8.99984 12.2496 9.82346C12.331 10.377 12.4847 10.9174 12.7068 11.4308C12.7068 11.4308 12.4146 12.3404 12.0282 13.2452C11.6419 14.1499 11.3779 14.6243 11.3779 14.6243C10.7059 14.8428 10.0734 15.1677 9.50443 15.5868C8.93793 16.1141 8.70762 16.519 9.00599 16.924C9.26312 17.2732 10.1631 17.3523 10.9674 16.2983C11.3941 15.7534 11.7845 15.1811 12.1362 14.5851C12.1362 14.5851 13.3627 14.2489 13.7442 14.1568C14.1258 14.0647 14.5871 13.9918 14.5871 13.9918C14.5871 13.9918 15.7071 15.1186 16.7871 15.0787C17.8672 15.0388 17.8149 14.4332 17.8081 14.3672" fill="#DD2025" />
                                        <path d="M16.4688 1.42773V5.46542H20.3414L16.4688 1.42773Z" fill="#909090" />
                                        <path d="M16.5215 1.375V5.41269H20.3942L16.5215 1.375Z" fill="#F4F4F4" />
                                        <path d="M6.17005 3.06411H5.27148V6.36411H5.98098V5.25173L6.13773 5.26067C6.28943 5.25858 6.43973 5.2314 6.58255 5.18023C6.7081 5.1376 6.82349 5.06949 6.92148 4.98017C7.02122 4.89568 7.09945 4.7887 7.14973 4.66804C7.21934 4.46778 7.24399 4.25465 7.22192 4.04379C7.218 3.89313 7.19158 3.7439 7.14355 3.60104C7.10026 3.49779 7.03589 3.40471 6.95456 3.32776C6.87323 3.25081 6.77673 3.19168 6.67123 3.15417C6.57987 3.12016 6.48515 3.09596 6.38867 3.08198C6.31616 3.07017 6.24282 3.0642 6.16936 3.06411M6.03942 4.64123H5.97823V3.62373H6.11161C6.17017 3.61951 6.22893 3.6285 6.28355 3.65004C6.33817 3.67158 6.38725 3.70511 6.42717 3.74817C6.50989 3.85887 6.55408 3.99361 6.55298 4.13179C6.55298 4.30092 6.55298 4.45423 6.40036 4.56217C6.29043 4.62272 6.16526 4.64995 6.04011 4.64054M8.56323 3.05517C8.48692 3.05517 8.41267 3.06067 8.36042 3.06273L8.19886 3.06686H7.66261V6.36686H8.29373C8.5349 6.37306 8.77496 6.33219 9.00048 6.24654C9.18206 6.17483 9.34279 6.05878 9.46798 5.90898C9.59067 5.75852 9.67827 5.58261 9.72442 5.39404C9.77865 5.18087 9.80499 4.96156 9.8028 4.74161C9.81625 4.48184 9.79615 4.22142 9.74298 3.96679C9.69209 3.77958 9.59789 3.60696 9.46798 3.46286C9.36609 3.34633 9.24076 3.25262 9.10017 3.18786C8.97974 3.13203 8.85301 3.09094 8.72273 3.06548C8.67093 3.05699 8.61848 3.05308 8.56598 3.05379M8.44086 5.76048H8.37211V3.65398H8.38105C8.52278 3.63759 8.66621 3.66317 8.79355 3.72754C8.88682 3.80202 8.96281 3.89584 9.0163 4.00254C9.07402 4.11484 9.10729 4.23808 9.11392 4.36417C9.12011 4.51542 9.11392 4.63917 9.11392 4.74161C9.11646 4.8596 9.10887 4.9776 9.09123 5.09429C9.06961 5.21396 9.03046 5.32979 8.97505 5.43804C8.91245 5.539 8.82696 5.62379 8.72548 5.68554C8.64072 5.74055 8.54023 5.76615 8.43948 5.75842M11.9299 3.06686H10.2593V6.36686H10.966V5.05786H11.8598V4.44461H10.966V3.68011H11.9285V3.06686" fill="white" />
                                    </svg>

                                </label>
                                <input type="file" id='file' className='absolute left-0 right-0 mx-auto h-1 border-none bottom-2 ' onChange={handlerOnChangePDF} accept='.pdf' required />
                            </div>

                            {/*clave Secreta: 6Lcx0QcqAAAAAA5Xoi63qQdgoxV1HSLjhTgM0wZ7 */}
                            {/* 6Lcx0QcqAAAAAKRCwB2c1imV5kcfohYg1bbWzzxY */}
                            {captcha === '' && <div className='w-full flex justify-center'>
                                <ReCAPTCHA
                                    sitekey="6LdcOwwqAAAAAPEqYv1NDkUpgJRRSaEna_ER9YTT"
                                    onChange={onChange}
                                />
                            </div>}

                            {captcha !== '' && <button
                                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-300  font-medium rounded-lg text-[12px] w-full  min-w-[150px] px-2 py-2 text-center"
                            >
                                Postularme
                            </button>}
                        </div>
                    </form>
                </div>
            </div>


            {modal === 'Enviando Postulacion...' && <Loader>{modal}</Loader>}
            {modal === 'Error de validacion de tu correo' && <Error>{modal}</Error>}
            {modal === 'Postulación enviada' && <Success>{modal}</Success>}
            {modal === 'Error de envio' && <Error>{modal}</Error>}
            {modal === 'El PDF no puede ser mayor a 3.5mb' && <Error>{modal}</Error>}

        </div>
    )
}

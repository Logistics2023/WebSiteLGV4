'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, getSpecificData } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Subtitle from '@/components/Subtitle'
import { useRouter } from 'next/navigation';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import priceFTL from '@/db/priceFTL.json'
import 'react-awesome-slider/dist/styles.css';
import Footer from '@/components/Footer'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/Button'
import InputFlotante from '@/components/InputFlotante'
import { arrDB } from '@/db/arrDB'






function Pages() {
    const { user, introVideo, languaje, userDB, setUserProfile, setUserSuccess, nav, navItem, setuserDB, focus, setFocus, seeMore, setSeeMore } = useUser()


    const [query, setQuery] = useState('')
    const [db, setDB] = useState(null)

    console.log(db)
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
        query && getSpecificData(`Tracking/${query}`, setDB)
    }, [query])

    return <div className="relative flex justify-center min-h-screen pt-[70px]">
        <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />

        <div className="relative  py-[25px] max-w-[960px] w-[95vw] bg-white lg:p-[20px]  shadow-[0 4px 8px rgba(0,0,0,0.1)]">
            {db ? <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] "  >
                <h5 className='text-center font-medium text-[16px]'>{languaje === 'Español' ? 'Informacion de Carga' : 'Information'}<br /> </h5>

                <div className='relative p-5 my-5 bg-white space-y-5 shadow-2xl '>

                    <h5 className='relative font-medium text-[16px]'>{languaje === 'Español' ? 'DETALLE DEL SERVICIO' : 'SERVICE DETAILS'} <br /> </h5>
                    <div className='relative flex  '>
                        {arrDB.map((i, index) => <div key={index} className='w-full  relative flex flex-col items-center m-2 cursor-pointer p-2' >
                            <span className={`absolute z-10  top-[-5px] left-0 right-0 mx-auto border-[2px] border-[#294B98] rounded-full  w-[10px] h-[10px] ${db.trackIcon && i.img === db.trackIcon['img'] ? 'bg-[#39ff27]' : 'bg-white '}`}></span>
                            <img src={i.img} className={` inline h-[20px] sm:h-[25px] md:h-[50px]  ${db.trackIcon && i.img === db.trackIcon['img'] ? 'grayscale-0 brightness-125' : 'grayscale '}`} alt="" />
                            <span className={`h-[10px] text-[8px] sm:text-[12px] ${db.trackIcon && i.img === db.trackIcon['img'] ? 'text-[#294B98] font-medium' : ' font-medium'}`}>{languaje === 'Español' ? i.text : i.textEN}</span>
                        </div>)}
                        <span className='absolute top-[5px] h-[2px] bg-[#294B98] w-full'></span>
                    </div>
                    <table className='w-full mt-[20px] border-collapse	table-fixed'>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'FECHA DE CREACION' : 'CREATION DATE'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['FECHA DE CREACION'].split('-').reverse().toString().replaceAll(',', '-')}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'CODIGO DE SERVICIO' : 'SERVICE CODE'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['CODIGO DE SERVICIO']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'CODIGO DE CLIENTE' : 'CLIENT CODE'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['CODIGO DE CLIENTE']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'MODALIDAD DE TRANSPORTE' : 'MODALITY OF TRANSPORTATION'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['MODALIDAD DE TRANSPORTE']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'ORIGEN' : 'ORIGIN'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['ORIGEN']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'DESTINO' : 'DESTINATION'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['DESTINO']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'MERCANCIA' : 'COMMODITY'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['MERCANCIA']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'PESO TN' : 'WEIGHT TN'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['PESO TN']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'SHIPPER' : 'SHIPPER'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['SHIPPER']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'CONSIGNATARIO' : 'CONSIGNEE'}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['CONSIGNATARIO']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'Español' ? 'MANIFIESTO' : ''}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['MANIFIESTO']}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                ETD
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['ETD'].split('-').reverse().toString().replaceAll(',', '-')}
                            </td>
                        </tr>
                        <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                ETA
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {db['ETA'].split('-').reverse().toString().replaceAll(',', '-')}
                            </td>
                        </tr>
                    </table>
                    {db && db.subItems && <h5 className=' font-medium text-[16px]'>STATUS <br /> </h5>}


                    <table className='w-full mt-[20px] border-collapse	table-fixed'>


                        {db && db.subItems && Object.values(db.subItems).map((item, index) => {
                            return <tr>
                                <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                    {languaje === 'English' && item[`ipEN`] ? item[`ipEN`] : item[`ip`]}
                                </th>
                                <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                    {languaje === 'English' && item[`icEN`] ? item[`icEN`] : item[`ic`]}
                                </td>
                            </tr>
                        })
                        }

                    </table>




                    {/* 
                        <div className='flex justify-center'>
                            <Button theme="Primary" click={(e) => { saveFrontPage(e,) }}>Guardar</Button>
                        </div> */}
                </div>
            </form> :
                <div>{languaje === 'Español' ? 'DATOS INEXISTENTES' : 'NO DATA'}</div>
            }





        </div>
    </div>
}

export default Pages

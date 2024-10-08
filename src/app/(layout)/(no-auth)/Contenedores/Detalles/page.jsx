
'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
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
import { Translator, getTranslation } from '@miracleufo/react-g-translator';


function Pages() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, cliente, languaje, nav, navItem, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()


    const [query, setQuery] = useState('')
    const [route, setRoute] = useState('')

    function sortArray(a, b) {
        console.log(a[0].replaceAll('item', ''))
        return (a[0].replaceAll('item', '') * 1) - (b[0].replaceAll('item', '') * 1)
    }


    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setRoute(window.location.href.split('=')[2])
            setQuery(window.location.href.split('=')[1].split('&')[0])
        }
    })


    cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && console.log(cliente[query].tarjetas[route])


    return cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] &&
        <div className="relative flex justify-center min-h-screen pt-[70px]">
            <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />

            <div className="relative  py-[100px] w-[95vw] md:max-w-[960px] bg-white p-[20px]  shadow-[0 4px 8px rgba(0,0,0,0.1)]">
                {/* <h1 className='font-bold text-[20px]'>Gama Completa de Contenedores - Logistics Gear</h1> */}

                <h2 className='font-bold text-[18px] text-[#333] text-center'>
                    {languaje === 'English' && cliente[query].tarjetas[route]['subtitle 1EN']
                        ? cliente[query].tarjetas[route]['subtitle 1EN']
                        : <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
                            {cliente[query].tarjetas[route]['subtitle 1']}
                        </Translator>}
                </h2>
                <br />
                <div className='flex justify-center'>
                    {/* <video className='' autoPlay loop muted playsInline controls>
                        <source src={cliente[query].tarjetas[route].urlVideo} type="video/mp4" />
                    </video> */}

                    {console.log((cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlVideo != 'null'))}
                    {(cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlVideo != 'null')
                        ? <video src={cliente[query].tarjetas[route].urlVideo} className='h-[300px]' autoPlay loop muted playsInline ></video>
                        : <img src={cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].urlIMG != 'null' ? cliente[query].tarjetas[route].urlIMG : '/404.png'} className='block max-h-[300px]' alt="" />
                    }
                </div>

                <table className='w-full mt-[20px] border-collapse	table-fixed'>
                    <caption className='    text-[1.2em] text-left m-[10px]'>
                        {languaje === 'English' && cliente[query].tarjetas[route]['subtitle 2EN']
                            ? cliente[query].tarjetas[route]['subtitle 2EN']
                            : <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
                                {cliente[query].tarjetas[route]['subtitle 2']}
                            </Translator>}
                    </caption>
                    {cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].especificaciones && Object.entries(cliente[query].tarjetas[route].especificaciones).sort(sortArray).map((i, index) => {
                        return <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {languaje === 'English' && i[1].ipEN
                                    ? i[1].ipEN
                                    : <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
                                        {i[1].ip}
                                    </Translator>
                                }
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {languaje === 'English' && i[1].icEN ? i[1].icEN : i[1].ic}
                            </td>
                        </tr>
                    })}
                </table>
            </div>


        </div>
}

export default Pages

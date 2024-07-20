'use client'
import { Suspense } from "react";

import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { useEffect, useState, useRef, use } from 'react'
import parse from 'html-react-parser';

import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import MiniTarjeta from '@/components/MiniTarjeta'
import { glosario } from '@/db'
import Footer from '@/components/Footer'
import TextMaquina from '@/components/TextMaquina'
import { useRouter } from 'next/navigation';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import 'react-awesome-slider/dist/styles.css';
import InputEspecial from '@/components/InputEspecial'
import QRscanner from '@/components/QRscanner'
import { QRreaderUtils } from '@/utils/QRreader'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import SelectSimple from '@/components/SelectSimple'
import priceFTL from '@/db/FTL.json'
import mercancias from '@/db/mercancias.json'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import dynamic from 'next/dynamic'
import { equipoDB, mercanciaDB, tipoDeUnidadDB } from '@/db/arrDB'
import { getTranslate } from '@/utils/GetTranslate'
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
// import parse from 'html-react-parser';
const InvoicePDF = dynamic(() => import("@/components/CotizacionPDF"), {
  ssr: false,
});
function extractContent(html) {
  return new DOMParser()
    .parseFromString(html, "text/html")
    .documentElement.textContent;
}

function Componente({ title, image, paragraph, id, route, titleEN, paragraphEN }) {
  const { cliente, languaje } = useUser()

  function redirect(data) {
    window.open(`https://api.whatsapp.com/send?phone=${cliente.contactos.celular.replaceAll(' ', '')}&text=hola%20Logistics%20Gear%20me%20gustaria%20solicitar%20el%20servicio%20de:%20${data.replaceAll(' ', '%20')}`,)
  }
  const router = useRouter()
  // console.log(paragraph)
  return (
    <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
      <div className='relative w-full min-h-full md:w-auto bg-[#ffffffcb] my-5 flex  lg:max-w-[500px] lg:min-w-[250px]  lg:text-[18px] lg:mx-5 lg:flex lg:flex-col lg:justify-between lg:items-center rounded-[15px] '>
        <img src={image} className="relative w-[150px] md:min-h-[40%] lg:max-w-[200px] object-contain p-5" alt="" />
        <div className="relative w-full bg-gradient-to-t md:min-h-[45%] from-[#00195cbe] via-[#00195cbe] to-[#00195c] space-y-5 p-5 py-5 rounded-r-[15px] lg:rounded-t-[0]  lg:rounded-b-[15px]">
          <h4 className="w-full text-left font-medium border-b-[3px] text-white pb-5 pl-0 ml-0 border-[#ffffff] p-5">{languaje === 'English' && titleEN ? titleEN : title}</h4>
          <p className="relative text-white "  >
            {languaje === 'English' && paragraphEN
              ? paragraphEN !== undefined && parse(paragraphEN)
              : paragraph !== undefined && parse(paragraph)
            }
          </p>
          <div className=" relative flex mt-5 mb-10 justify-end w-[100%]">
            <button className="block bg-[#ffb834] px-3 text-[12px] border text-center font-medium py-2 m-1  
         cursor-pointer rounded-[5px]"  onClick={() => redirect(title)}>Solicitar servicio</button>
          </div>
        </div>
      </div>
    </Translator>)

}

function Componente3({ title, image, paragraph, id, route, hash, titleEN, paragraphEN }) {
  const { cliente, languaje } = useUser()

  const router = useRouter()
  // console.log(paragraph)
  return (
    <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
      <div className='relative w-full min-h-full md:w-auto bg-[#ffffffcb] my-5 flex  lg:max-w-[500px] lg:min-w-[250px]  lg:text-[18px] lg:mx-5 lg:flex lg:flex-col lg:justify-between lg:items-center rounded-[15px] '>
        <img src={image} className="relative w-[150px] md:min-h-[40%] lg:max-w-[200px] object-contain p-5" alt="" />
        <div className="relative w-full bg-gradient-to-t md:min-h-[45%] from-[#00195cbe] via-[#00195cbe] to-[#00195c] space-y-5 p-5 py-5 rounded-r-[15px] lg:rounded-t-[0]  lg:rounded-b-[15px]">
          <h4 className="w-full text-left font-medium border-b-[3px] text-white pb-5 pl-0 ml-0 border-[#ffffff] p-5">{languaje === 'English' && titleEN ? titleEN : title}</h4>
          <p className="relative text-white "  >
            {languaje === 'English' && paragraphEN
              ? paragraphEN !== undefined && parse(paragraphEN)
              : paragraph !== undefined && parse(paragraph)
            }
          </p>
          {console.log(hash)}
          <div className=" relative flex mt-5 mb-10 justify-end w-[100%]">
            <a href={hash}>
              <button className="block bg-[#ffb834] px-3 text-[12px] border text-center font-medium py-2 m-1  
         cursor-pointer rounded-[5px]">{languaje === 'English' ? 'Ir a Herramienta' : 'Go to Tool'}</button>
            </a>

          </div>
        </div>
      </div>
    </Translator>)

}

function Componente2({ title, image, paragraph, id, route, titleEN, paragraphEN }) {
  const { cliente, languaje } = useUser()

  const router = useRouter()

  // console.log('render')


  // getTranslate().then((db) => {
  //   console.log(db)
  // }).catch(console.error);



  return (
    <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
      <div className='relative w-full h-full   bg-[#ffffffcb] my-5 md:w-[30vw]   lg:text-[18px] lg:mx-5 rounded-[15px] overflow-hidden'>
        <img src={image} className="relative max-h-[90vw] md:w-[30vw] overflow-hidden md:h-[25vw] block w-full object-cover rounded-t-[15px] " alt="" />
        <div className="relative  w-full h-full bg-gradient-to-t  from-[#00195cbe] via-[#00195cbe] to-[#00195c] space-y-5 px-5 py-5  lg:rounded-t-[0]  rounded-b-[15px]">
          <h4 className="w-full text-left font-medium border-b-[3px] text-white pb-5 pl-0 ml-0 border-[#ffffff] p-5">{languaje === 'English' && titleEN ? titleEN : title}</h4>
          <p className="relative text-white md:w-[15vw] lg:w-[20vw]">
            {languaje === 'English' && paragraphEN
              ? `${extractContent(paragraphEN).split(' ').slice(0, 10).toString().replaceAll(',', ' ')}...`
              : `${extractContent(paragraph).split(' ').slice(0, 10).toString().replaceAll(',', ' ')}...`}
          </p>
          <div className=" relative bottom-0 flex mt-5 mb-10 justify-end  w-[100%]">
            <button className="block bg-[#ffb834] px-3 text-[12px] border text-center font-medium py-2 m-1  
         cursor-pointer rounded-[5px]"  onClick={() => router.push(`/Galeria?query=${id}&item=${route}`)}>{languaje === 'Español' ? 'Saber mas' : 'Know more'}</button>
          </div>
        </div>
      </div>
    </Translator>
  )
}

export default function Section({ subtitle, subtitleEN, description, descriptionEN, video, gradiente, id, children, tarjetas, miniTarjetas, especial }) {

  const { cliente, languaje } = useUser()
  const [data, setData] = useState('')

  const redirectHandlerWindow = (ref) => {
    window.open(ref, '_blank')
  }

  useEffect(() => {
    // const fetchData = async () => {
    //   const db = await getTranslation(description, 'es', languaje.slice(0, 2).toLowerCase())
    //   return db
    // }
    // fetchData().then((db) => {
    //   setData(db)
    // }).catch(console.error);


    // getTranslate(description).then((db) => {
    //   setData(db)
    // }).catch(console.error);
  }, [])
  // console.log(languaje)

  return <section className='relative w-full   bg-gradient-to-tr from-[#00195c] via-[#384C94] to-[#00195c] overflow-x-hidden overflow-hidden' id={id}
    style={{
      backgroundColor: '#011B68',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23272A68'/%3E%3Cstop offset='1' stop-color='%23011B68'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23505268' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23505268' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >


    {/* <div className='relative px-5 py-12 w-full min-h-[50vh] flex flex-col z-30 lg:grid lg:grid-cols-2 justify-around items-center  from-[#00195cdc] via-[#00195cb6] to-[#00195cdc] '> */}

    <div className='relative px-5 py-12 w-full lg:px-[100px]  z-30    from-[#00195cdc] via-[#00195cb6] to-[#00195cdc] '>
      <div>
        <Subtitle><h3 className='text-[30px] text-[white] text-center font-medium  py-10'>{subtitleEN && languaje !== 'Español' ? subtitleEN : subtitle}</h3></Subtitle>
        <ScrollAnimation animateIn='bounceInLeft'
          animateOut='bounceOutLeft'
          initiallyVisible={true}
        >
          {descriptionEN
            ? <p className=' text-[16px] text-[white] pb-5  ql-editor'
              dangerouslySetInnerHTML={{ __html: languaje === 'Español' ? description : descriptionEN }}
            >
            </p>
            :
            <p className=' text-[16px] text-[white] pb-5  ql-editor'
            //  dangerouslySetInnerHTML={{ __html: data }}
            >
              <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
                {parse(description.replaceAll("<s>", "<span style='text-transform: uppercase; font-weight: 500'>").replaceAll("</s>", "</span>"))}</Translator>
            </p>



          }
        </ScrollAnimation>
      </div>

      {/* ---------------------------------------------Mini Tarjetas---------------------------------------- */}

      <div className={`relative w-full h-full text-[white] gap-5 py-12 ${cliente && cliente[id] && cliente[id].miniTarjetas && Object.values(cliente[id].miniTarjetas).length > 4 ? 'grid grid-cols-2 lg:grid-cols-3' : 'grid grid-cols-2'}`}>
        {cliente && cliente[id] && cliente[id].miniTarjetas && Object.values(cliente[id].miniTarjetas).map((i, index) => <MiniTarjeta e1={i[`ip`]} e2={i[`ic`]} />)}
      </div>
      {!especial && <div className='flex w-full justify-start '>
        <button type="button" className="w-full border-[2px] md:max-w-[300px] text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center " onClick={() => redirectHandlerWindow(`https://api.whatsapp.com/send?phone=${cliente.contactos.celular.replaceAll(' ', '')}&text=hola%20Logistics%20Gear,%20quiero%20ordenar%20un%20servicio%20${subtitle}%20`)}>
          {languaje === 'Español' ? 'Solicitar Cotización' : 'Request Quote'}
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>}
    </div>

    {/* ---------------------------------------------Tarjetas---------------------------------------- */}
    <div className='relative min-h-screen  w-full flex flex-col justify-top lg:flex-wrap  lg:flex-row lg:justify-center lg:items-center  z-20  '>

      <video className='absolute bottom-0  w-full h-full min-h-[100vh] object-cover z-10' autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>
      <div className='absolute top-0 w-full min-h-[100vh] h-full object-cover z-20 bg-gradient-to-tr from-[#00195c]  via-[#cfbd7546] to-[#00195c]    lg:bg-gradient-to-tr lg:from-[#00195c]  lg:via-[#00195c36] lg:to-[#00195c] '></div>

      <div className={`relative flex flex-wrap py-10 ${tarjetas && Object.entries(tarjetas).length > 2 ? 'md:grid md:grid-cols-3' : 'md:grid md:grid-cols-2'}`}>
        {cliente && cliente[id] && cliente[id].tarjetas && Object.entries(tarjetas).map((i, index) => {
          return <div className=' w-full  md:w-auto p-5 z-50' key={index}>
            {id !== 'experiencia' && id !== 'solucionesIT' && <Componente route={i[0]} id={id} db={i[1]} title={i[1].title} image={i[1].url} paragraph={i[1].paragraph} paragraphEN={i[1].paragraphEN} />}
            {id === 'experiencia' && <Componente2 route={i[0]} id={id} db={i[1]} title={i[1].title} image={i[1].url} paragraph={i[1].paragraph} paragraphEN={i[1].paragraphEN} />}
            {id === 'solucionesIT' && <Componente3 route={i[0]} hash={i[1].hash} id={id} db={i[1]} title={i[1].title} image={i[1].url} paragraph={i[1].paragraph} paragraphEN={i[1].paragraphEN} />}

          </div>
        })}
      </div>
    </div>
  </section>




}
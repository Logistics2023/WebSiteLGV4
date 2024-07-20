'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Slider from '@/components/Slider'
import SliderTestimonios from '@/components/SliderTestimonios'
import Section from '@/components/Section'
import { glosario } from '@/db'
import Footer from '@/components/Footer'
import TextMaquina from '@/components/TextMaquina'
import TextMaquina2 from '@/components/TextMaquina2'
import { useRouter, usePathname } from 'next/navigation';
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
import MiniTarjeta from '@/components/MiniTarjeta'
import mercancias from '@/db/mercancias.json'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import dynamic from 'next/dynamic'
import { equipoDB, mercanciaDB, tipoDeUnidadDB } from '@/db/arrDB'
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
import parse from 'html-react-parser';

import { useHash } from '@/HOCs/useHash';


const InvoicePDF = dynamic(() => import("@/components/CotizacionPDF"), {
  ssr: false,
});

export default function Home() {
  const { user, introVideo, userDB, selectValue, setSelectValue, setUserProfile, languaje, modal, setModal, setUserSuccess, calcValueFCL, setCalcValueFCL, calcValue, setCalcValue, element, setElement, naviera, setNaviera, success, setUserData, postsIMG, setUserPostsIMG, nav, cliente, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()


  const [code, setCode] = useState('')
  const hash = useHash();

  // const [hash, sethash] = useState('')

  const pathname = usePathname()

  const router = useRouter()
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const inputRef = useRef('')
  const inputRef2 = useRef('')


  const redirectHandlerWindow = (ref) => {
    window.open(ref, '_blank')
  }


  function handlerClickSelect2(e) {
    setSelectValue({ ...selectValue, SERVICIO: e })

  }
  function handlerOnChangeQR(e) {
    QRreaderUtils(e, setCode)

  }
  // let data = priceFTL.reduce((acc, i, index) => {
  //   return acc.includes(i.ORIGEN) ? acc : [...acc, i.ORIGEN]
  // }, [])

  async function HandlerCheckOut(e) {

    //  const data =  Object.entries(calcValue).map((i, index) => `${i[0]}: ${i[1]}`)
    router.push('PDF')
    return

    const db = Object.entries(calcValue).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }
  async function HandlerCheckOut2(e) {
    const db = Object.entries({ ORIGEN: inputRef.current.value, DESTINO: inputRef2.current.value, ...selectValue }).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }

  function handlerOnChange(e) {
    e.stopPropagation();
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value })

  }

  function reset() {
    setFocus('')
  }

  



  // async function getTranslate() {
  //   const res = await fetch("/api/translate");
  //   return console.log(await res.json());
  // }

  // getTranslate()



  // console.log(inputRef.current.value)
  // console.log(inputRef2.current.value)
  // console.log(cliente.inicio.content)

  function preValidate() {
    if (inputRef.current && inputRef2.current && selectValue.MERCANCIA && selectValue['PESO (KG)'] && selectValue.SERVICIO && selectValue['TIPO DE UNIDAD'] && selectValue['VOLUMEN M3']) {
      let val = Object.values(cliente.priceFTL).find((i) => {
        return i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value && i.MERCANCIA === selectValue.MERCANCIA && i['PESO (KG)'] >= selectValue['PESO (KG)'] && i.SERVICIO === selectValue.SERVICIO && i['TIPO DE UNIDAD'] === selectValue['TIPO DE UNIDAD'] && i['VOLUMEN M3'] >= selectValue['VOLUMEN M3']
      })
      return val
    }
  }

  console.log(cliente)
 

  return (
    <main className={`relative  w-screen `} onClick={reset} id='inicio'>
      <div className='absolute top-0 justify-space-between'>
        <div id='Tracking'></div>
        <div id='FTL'></div>
        <div id='FCL'></div>
      </div>








      {cliente['experiencia'] && <Section
        subtitle={cliente['experiencia'].titulo} subtitleEN={cliente['experiencia'].tituloEN}
        description={cliente['experiencia'].content} descriptionEN={cliente['experiencia'].contentEN}
        video={cliente['experiencia'].url} degrade='#00000067' tarjetas={cliente['experiencia'].tarjetas} miniTarjetas={cliente['experiencia'].miniTarjetas} id={'experiencia'} especial={true}></Section>}

      <div className='relative  h-[100vh] md:h-[80vh] bg-gradient-to-t py-[20vh] md:py-[10vh] from-[#00195cdc] via-[#293f79d3] to-[#00195cdc]'>
        {/* <div className='relative  h-[100vh] md:h-[80vh] bg-gradient-to-t py-[20vh] md:py-[10vh] from-[#00195c] via-[#293e79] to-[#00195c]'> */}



        {cliente.Slider1 && <>
          <h1 className='text-center font-bold text-[25px] py-[50px] text-white' id='testimonios'>Testimonios</h1>
          <SliderTestimonios content={Object.values(cliente.Testimonios)} />
        </>}




      </div>

      <Footer></Footer>




    </main>

  )
}





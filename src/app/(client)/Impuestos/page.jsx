'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Error from '@/components/Error'
import BottomNavigation from '@/components/BottomNavigation'
import InputEspecial from '@/components/InputEspecial'
import { useRouter } from 'next/navigation';
import SelectSimple from '@/components/SelectSimple'
import InputFlotante from '@/components/InputFlotante.jsx'

export default function Home() {
    const { user, introVideo, userDB, setUserProfile, cliente, setUserSuccess, success, setUserData, setFocus, postsIMG, setUserPostsIMG } = useUser()
    const [res, setRes] = useState(false)
    const [mercancias, setMercancias] = useState([])
    const [data, setData] = useState({})
    const [selectValue, setSelectValue] = useState('Seleccionar')
    const inputRef = useRef('')
    const inputRef2 = useRef('')
    const inputRef3 = useRef('')
    const inputRef4 = useRef('')
    const inputRef5 = useRef('')

    function onChangeHandler(e, db) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function formHandler(e) {
        e.preventDefault()
        if (data.mercancia && data.transporte && data[`Valor FOB`] && data[`Costo Transporte ${data.transporte}`]) {
            setRes(true)
        }
    }
    function limpiar(e) {
        e.preventDefault()
        setSelectValue('Seleccionar')
        if (inputRef.current) inputRef.current.value = ''
        if (inputRef2.current) inputRef2.current.value = ''
        if (inputRef3.current) inputRef3.current.value = ''
        if (inputRef4.current) inputRef4.current.value = ''
        if (inputRef5.current) inputRef5.current.value = ''
        setData({})
        setRes(false)
    }
    function handlerClickSelect(name, i, uuid) {
        setSelectValue(i)
        let db = { ...data, mercancia: inputRef.current ? inputRef.current.value : 'MERCANCIA', transporte: i }
        setData(db)
        if (inputRef3.current) {
            inputRef3.current.value = ''
        }

    }
    function handlerSelect(i) {
        inputRef.current.value = i
        setData({ ...data, mercancia: i })
        setFocus(false)
    }
    function CIF() {
        if (data.transporte === 'Maritimo') {
            return (data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * 1 + data[`Costo Transporte Terrestre Puerto`] * (30 / 100) + (data['Seguro'] ? data['Seguro'] * 1 : data[`Valor FOB`] * 0.02))
        }
        if (data.transporte === 'Aereo') {
            return (data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * (25 / 100) + (data['Seguro'] ? data['Seguro'] * 1 : data[`Valor FOB`] * 0.02))
        }
        if (data.transporte === 'Terrestre') {
            return (data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * (30 / 100) + (data['Seguro'] ? data['Seguro'] * 1 : data[`Valor FOB`] * 0.02))
        }

    }


    function GA() {
        if (Object.values(cliente.mercancias).find((i) => i.MERCANCIA === data.mercancia).GA == '0') {
            return data.mercancia && 0
        }
        return data.mercancia && (Object.values(cliente.mercancias).find((i) => i.MERCANCIA === data.mercancia).GA / 100) * (CIF() * 1)
    }

    function baseImponible() {
        if (CIF() && GA() !== undefined&& GA() !== null) {
            console.log(CIF() * 1)
            console.log(GA())
            return ((CIF() * 1 + GA() * 1) * 1).toFixed(2)
        }
    }
    function IVA() {
        if (data.mercancia) {
            return (baseImponible() * (Object.values(cliente.mercancias).reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA'] / 100)).toFixed(2)
        }
    }
    function totalImpuestos() {
        if (data.mercancia) {
            return ((IVA() * 1 + GA() * 1 + 15) * 1).toFixed(2)
        }
    }
    function almacenaje() {
        return (CIF() * (.57 / 100)).toFixed(2)
    }

    // CIF() && console.log(Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() *1 && i.hasta >= CIF() *1).monto)
    // CIF() && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() && i.hasta >= CIF()) && CIF() * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() && i.hasta >= CIF()).monto

    function comisionAgencia() {
        // if (CIF() *1  > 0 && CIF() *1  < 1001) { if (CIF() *1  && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() *1  && i.hasta >= CIF() *1 )) return (console.log( Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() *1  && i.hasta >= CIF() *1 ).monto * 1)) }
        if (CIF() * 1 > 0 && CIF() * 1 < 1001) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
        if (CIF() * 1 > 1000 && CIF() * 1 < 10001) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (CIF() * 1 * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
        if (CIF() * 1 > 10000 && CIF() * 1 < 20001) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (CIF() * 1 * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
        if (CIF() * 1 > 20000 && CIF() * 1 < 30001) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (CIF() * 1 * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
        if (CIF() * 1 > 30000 && CIF() * 1 < 50001) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (CIF() * 1 * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
        if (CIF() * 1 > 50000 && CIF() * 1 < 100001) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (CIF() * 1 * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
        if (CIF() * 1 > 100000 && CIF() * 1 < 1000000000000) { if (CIF() * 1 && Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1)) return (CIF() * 1 * Object.values(cliente.comisionFTL).find((i) => i.de <= CIF() * 1 && i.hasta >= CIF() * 1).monto * 1) }
    }
    console.log(CIF())
    console.log(data)
    function totalDespachoAduanero() {
        return (comisionAgencia() * 1 + 50).toFixed(2)
    }
    function totalCostosImportacion() {
        return (totalDespachoAduanero() * 1 + almacenaje() * 1 + totalImpuestos() * 1).toFixed(2)
    }
    function contactar(e) {
        window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=hola%20Logistics`, '_blank')



        // const db = Object.entries({ ORIGEN: inputRef.current.value, DESTINO: inputRef2.current.value, ...selectValue }).reverse().reduce((acc, i, index) => {
        //   const data = `${i[0]}: ${i[1]}\n`
        //   return data + '\r\n' + acc
        // }, ``)

        // var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
        // whatsappMessage = window.encodeURIComponent(whatsappMessage)
        // console.log(whatsappMessage)
        // // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
        // window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')
    }



    const formatoMexico = (num) => {
        if (num && num !== undefined) {
            let number = (num  * 1).toFixed(2)

            const exp = /(\d)(?=(\d{3})+(?!\d))/g;

            const rep = '$1,';

            let arr = number.toString().split('.');

            arr[0] = arr[0].replace(exp, rep);

            return arr[1] ? arr.join('.') : arr[0];
        }
        return num

    }
    console.log(cliente)

    useEffect(() => {
        cliente && setMercancias(Object.values(cliente.mercancias))
    }, [user, cliente])
    return (
        mercancias && <div className="h-full "
            style={{
                backgroundImage: 'url(/gif.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>

            <div className=' w-screen pt-[50px] min-h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center  z-10'>

                <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />
                <div className='w-full text-center flex justify-center'>
                    <img src="/logo.svg" className='w-[300px] z-10' alt="User" />
                </div>

                <div className='relative bg-[#ffffff] rounded-[10px] p-10 m-[10px] '>

                    <form className={`relative space-y-6   z-10   w-[80vw] md:min-w-[400px] max-w-[400px]`} >
                        <h5 className="text-[16px] text-center font-bold text-[#636363] z-[50]">IMPUESTOS DE IMPORTACION</h5>
                        <SelectSimple arr={['Terrestre', 'Maritimo', 'Aereo']} name='transporte' click={handlerClickSelect} defaultValue={selectValue} uuid='8768798' label='Tipo de transporte'></SelectSimple>
                        <InputEspecial data={mercancias} node={'MERCANCIA'} inputRef={inputRef} focusTxt='MERCANCIA' id='floating_1' select={handlerSelect}></InputEspecial>
                        <InputFlotante type="number" id="floating_3" onChange={onChangeHandler} inputRef={inputRef2} defaultValue={data['Valor FOB']} required label={'Valor FOB'} />
                        {
                            data.transporte && <>
                                <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} inputRef={inputRef3} defaultValue={data[`Costo Transporte ${data.transporte}`]} required label={`Costo Transporte ${data.transporte}`} />
                            </>
                        }
                        {
                            data.transporte === 'Maritimo' && <>
                                <InputFlotante type="number" id="floating_5" onChange={onChangeHandler} inputRef={inputRef4} defaultValue={data['Costo Transporte Terrestre Puerto']} required label={`Costo Transporte Terrestre Puerto`} />
                            </>
                        }
                        <InputFlotante type="number" id="floating_6" onChange={onChangeHandler} inputRef={inputRef5} value={data['Seguro'] !== null && data['Seguro'] !== undefined ? data['Seguro'] : data['Valor FOB'] * 0.02} required label={'Seguro'} />

                        {res && <table className='relative w-full'>
                            <tbody className='w-full'>
                                <tr className='relative flex justify-between   w-full '>
                                    <td className='font-bold bg-slate-100 border w-[70%]'>CIF FRONTERA</td>
                                    <td className='border text-right w-[30%]'>
                                        {formatoMexico(CIF())} USD
                                    </td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold bg-slate-100 border w-[70%]'>GA</td>
                                    <td className='border text-right w-[30%]'>
                                        {formatoMexico(GA())} USD
                                    </td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold bg-slate-100 border w-[70%]'>BASE IMPONIBLE IVA</td>
                                    <td className='border text-right w-[30%]'>
                                        {formatoMexico(baseImponible())} USD
                                    </td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold  bg-slate-100 border w-[70%]'>IVA</td>
                                    <td className='border text-right w-[30%]'>
                                        {formatoMexico(IVA())} USD
                                        {/* {data.mercancia && (CIF() + (CIF() * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['GA'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA'] / 100)} */}
                                    </td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold  bg-slate-100 border w-[70%]'>USO DE SISTEMA</td>
                                    <td className='border text-right w-[30%]'>15 USD</td>
                                </tr>
                                <tr className='flex justify-between bg-yellow-500   w-full'>
                                    <td className='font-bold bg-yellow-500 bg-slate-100 border border-yellow-400  w-[70%]'>TOTAL IMPUESTOS</td>
                                    <td className='bg-yellow-500 font-bold border border-yellow-400 w-[30%] text-right'>{formatoMexico(totalImpuestos())} USD</td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold  bg-slate-100 border w-[70%]'>ALMACENAJE 0,57%CIF</td>
                                    <td className='border text-right w-[30%]'>{formatoMexico(almacenaje())} USD</td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold  bg-slate-100 border w-[70%]'>COMISION AGENCIA</td>
                                    <td className='border text-right w-[30%]'>
                                        {formatoMexico(comisionAgencia())} USD

                                    </td>
                                </tr>
                                <tr className='flex justify-between  w-full '>
                                    <td className='font-bold  bg-slate-100 border w-[70%]'>GASTOS DE DESPACHO</td>
                                    <td className='border text-right w-[30%]'>50 USD</td>
                                </tr>
                                <tr className='flex justify-between bg-yellow-500  w-full '>
                                    <td className='font-bold bg-yellow-500 bg-slate-100 border border-yellow-400  w-[70%]'>TOTAL DESPACHO ADUANERO</td>
                                    <td className='bg-yellow-500 font-bold border border-yellow-400 w-[30%] text-right'>
                                        {formatoMexico(totalDespachoAduanero())} USD
                                    </td>
                                </tr>
                                <tr className='flex justify-between bg-yellow-500   w-full '>
                                    <td className='font-bold bg-yellow-500 bg-slate-100 border border-yellow-400 w-[70%]'>TOTAL COSTOS IMPORTACION</td>
                                    <td className='bg-yellow-500 font-bold border border-yellow-400 w-[30%] text-right'>
                                        {formatoMexico(totalCostosImportacion())}  USD
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {res && <p className='italic'>
                            <span className='font-bold'>Nota importante sobre el cálculo de impuestos de importación: </span>
                            <br />
                            <span>Por favor tenga en cuenta que los costos mostrados por esta calculadora
                                son aproximados y están sujetos a posibles variaciones debido a costos
                                adicionales que pueden surgir durante el proceso de importación.
                                Este cálculo es puramente referencial y no debe ser considerado como una cotización final.</span>
                            <br />
                            <span>Para obtener una cotización exacta y formal que considere todas las variables y costos
                                potenciales, le recomendamos ponerse en contacto directamente con nosotros. Esto garantizará
                                que reciba una estimación precisa y personalizada acorde a las especificaciones y requisitos de su carga.</span>
                        </p>}

                        <div className='flex  justify-center'>
                            {res
                                ? <><Button theme="Success" click={limpiar} >LIMPIAR</Button><Button theme="Primary" click={contactar} >Contactar</Button></>
                                : <Button theme="Primary" click={formHandler} >CALCULAR</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            {success == 'AccountNonExist' && <Error>Cuenta inexistente</Error>}
            {success == 'Complete' && <Error>Complete el formulario</Error>}
        </div >
    )
}






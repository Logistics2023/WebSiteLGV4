

'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState, useRef } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import emailjs from '@emailjs/browser';
function CotizacionTerrestre() {
    const { user, userDB, pdfData, setUserPdfData, setUserSuccess } = useUser()
    const router = useRouter()
    const form = useRef();

    const [tarifa, setTarifa] = useState([""])
    const [otrosGastos, setOtrosGastos] = useState([""])
    const [incluye, setIncluye] = useState([""])
    const [excluye, setExcluye] = useState([""])
    const [notas, setNotas] = useState([""])
    const [filter, setFilter] = useState("")
    const [autocomplete, setAutocomplete] = useState(false)
    const [itemSelect, setItemSelect] = useState({})

    const [calc, setCalc] = useState({})


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_lu2j0u6', 'template_go8elcc', form.current, {
                publicKey: 'dLkt6jdeg5n5DEnKs',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };





    function handleEventChange(e) {
        let data = e.target.name !== 'nombre' &&
            e.target.name !== 'correo' &&
            e.target.name !== 'empresa' &&
            e.target.name !== 'telefono' &&
            e.target.name !== 'cargo' &&
            e.target.name !== 'ciudad' &&
            e.target.name !== 'ci'
            ? { [`CA-${e.target.name}`]: e.target.value } : { [`${e.target.name}`]: e.target.value }
        setUserPdfData({ ...pdfData, ...data, tarifa, otrosGastos, incluye, excluye, notas })
    }
    function handlerCounter(word) {
        const newTarifa = tarifa.map(i => i)
        newTarifa.pop()
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa: [...tarifa, ...[""]], otrosGastos, incluye, excluye, notas })
            setTarifa([...tarifa, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa: newTarifa, otrosGastos, incluye, excluye, notas })
            setTarifa(newTarifa)
        }
    }
    function handlerCounterTwo(word) {
        const newOtrosGastos = otrosGastos.map(i => i)
        newOtrosGastos.pop()
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos: [...otrosGastos, ...[""]], incluye, excluye, notas })
            setOtrosGastos([...otrosGastos, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos: newOtrosGastos, incluye, excluye, notas })
            setOtrosGastos(newOtrosGastos)
        }
    }
    function handlerCounterThree(word) {
        const newIncluye = incluye.map(i => i)
        newIncluye.pop()
        word == "pluss" ? setIncluye([...incluye, ...[""]]) : setIncluye(newIncluye)
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, notas, incluye: [...incluye, ...[""]], excluye })
            setIncluye([...incluye, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, notas, incluye: newIncluye, excluye })
            setIncluye(newIncluye)
        }
    }
    function handlerCounterFour(word) {
        const newExcluye = excluye.map(i => i)
        newExcluye.pop()
        word == "pluss" ? setExcluye([...excluye, ...[""]]) : setExcluye(newExcluye)
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, notas, excluye: [...excluye, ...[""]] })
            setExcluye([...excluye, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, notas, excluye: newExcluye })
            setExcluye(newExcluye)
        }
    }
    function handlerCounterFive(word) {
        const newNotas = notas.map(i => i)
        newNotas.pop()
        word == "pluss" ? setNotas([...notas, ...[""]]) : setNotas(newNotas)
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye, notas: [...notas, ...[""]] })
            setNotas([...notas, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye, notas: newNotas })
            setNotas(newNotas)
        }
    }


    function handlerCalc(e, index) {

        if (e.target.name == `CANTIDADFLETE${index}` && calc[`FLETEUNITARIO${index}`] !== undefined) {
            let object = reducer(e, index, 'FLETEUNITARIO', 'PRODUCTFLETE', 'FLETETOTAL')
            setCalc({ ...calc, ...object })
            setUserPdfData({ ...pdfData, ...calc, ...object })
            return
        }

        if (e.target.name == `FLETEUNITARIO${index}` && calc[`CANTIDADFLETE${index}`] !== undefined) {
            let object = reducer(e, index, 'CANTIDADFLETE', 'PRODUCTFLETE', 'FLETETOTAL')
            setCalc({ ...calc, ...object })
            setUserPdfData({ ...pdfData, ...calc, ...object })
            return
        }

        if (e.target.name == `CANTIDAD${index}` && calc[`COSTOUNITARIO${index}`] !== undefined) {
            let object = reducer(e, index, 'COSTOUNITARIO', 'PRODUCT', 'TOTAL')
            setCalc({ ...calc, ...object })
            setUserPdfData({ ...pdfData, ...calc, ...object })
            return
        }

        if (e.target.name == `COSTOUNITARIO${index}` && calc[`CANTIDAD${index}`] !== undefined) {
            let object = reducer(e, index, 'CANTIDAD', 'PRODUCT', 'TOTAL')
            setCalc({ ...calc, ...object })
            setUserPdfData({ ...pdfData, ...calc, ...object })
            return
        }

        let object = {
            [e.target.name]: e.target.name.includes('UNITARIO') ? formatoMexico(round(e.target.value).toFixed(2)) : e.target.value,

        }
        setCalc({ ...calc, ...object })
        setUserPdfData({ ...pdfData, ...calc, ...object })

    }

    function round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }

    const formatoMexico = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = number.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }
    function reducer(e, index, counter, prod, total) {
        let product = e.target.value * calc[`${counter}${index}`].replaceAll(',', '')
        let data = {
            ...calc,
            [e.target.name]: e.target.name.includes('UNITARIO') ? formatoMexico(round(e.target.value).toFixed(2)) : e.target.value,
            [`${prod}${index}`]: formatoMexico(round(product).toFixed(2)),
        }

        let arr = Object.entries(data)

        let red = arr.reduce((ac, i) => {
            let str = i[0]
            if (str.includes(total)) {
                return ac
            }
            if (prod == 'PRODUCT' && str.includes('PRODUCTFLETE')) {
                return ac
            }
            let res = str.includes(prod)
            let r = res ? i[1].replaceAll(',', '') * 1 + ac * 1 : ac * 1
            return r
        }, 0)

        let object = {
            [e.target.name]: e.target.name.includes('UNITARIO') ? formatoMexico(round(e.target.value).toFixed(2)) : e.target.value,
            [`${prod}${index}`]: formatoMexico(round(product).toFixed(2)),
            PRODUCTOFLETETOTAL: prod === 'PRODUCTFLETE' ? formatoMexico(round(red).toFixed(2)) : data['PRODUCTOFLETETOTAL'],
            PRODUCTOTOTAL: prod === 'PRODUCT' ? formatoMexico(round(red).toFixed(2)) : data['PRODUCTOTOTAL'],
        }

        let mainObj = { ...calc, ...object }

        let sumaTotal = mainObj.PRODUCTOTOTAL !== undefined && mainObj.PRODUCTOFLETETOTAL !== undefined ? (mainObj.PRODUCTOTOTAL.replaceAll(',', '') * 1 + mainObj.PRODUCTOFLETETOTAL.replaceAll(',', '') * 1).toFixed(2) : (mainObj.PRODUCTOTOTAL ? mainObj.PRODUCTOTOTAL : (mainObj.PRODUCTOFLETETOTAL && mainObj.PRODUCTOFLETETOTAL))


        return { ...mainObj, sumaTotal: formatoMexico(sumaTotal) }
    }

    function handleFilterChange(e) {
        setFilter(e.target.value)
    }
    function handlerPDFTester() {

        setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye })
    }
    function handlerPdfButton() {
        setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye })
        let object = {
            CotizacionAerea: userDB.CotizacionAerea ? userDB.CotizacionAerea + 1 : 1
        }
        writeUserData('/', object, setUserSuccess)
    }
    function handlerFilterButton(e) {

        e.preventDefault()
        let obj = {
            nombre: '',
            correo: '',
            empresa: '',
            telefono: '',
            cargo: '',
            ciudad: '',
            ci: ''

        }
        let f = userDB.users[filter] ? userDB.users[filter] : obj

        setItemSelect(f)
        setUserPdfData({ ...pdfData, ...f })

        setAutocomplete(true)
        console.log(f)
    }


    function savei(e, word) {
        e.preventDefault()
        let obj = pdfData && Object.entries(pdfData).reduce((ac, i, index) => {
            return i[0].includes(`CA-${word.toUpperCase()}`) ? { ...ac, ...{ [i[0]]: i[1] } } : ac
        }, {})
        word === 'incluye' && writeUserData('/ca-incluye', obj, setUserSuccess)
        word === 'excluye' && writeUserData('/ca-excluye', obj, setUserSuccess)
        word === 'notas' && writeUserData('/ca-notas', obj, setUserSuccess)
    }
    function complete(e, word) {
        e.preventDefault()
        word === 'incluye' && setUserPdfData({ ...pdfData, ...userDB['ca-incluye'] })
        word === 'excluye' && setUserPdfData({ ...pdfData, ...userDB['ca-excluye'] })
        word === 'notas' && setUserPdfData({ ...pdfData, ...userDB['ca-notas'] })
    }

    function generateNO() {
        let cotizacionNo = userDB.CotizacionTerrestre
            ? `${userDB.CotizacionAerea + 1 < 10 ? '00' : ''}${userDB.CotizacionAerea + 1 > 9
                && userDB.CotizacionAerea + 1 < 100 ? '0' : ''}${userDB.CotizacionAerea + 1}/${new Date().getFullYear().toString().substring(2, 4)}` : `001/${new Date().getFullYear().toString().substring(2, 4)}`
        let date = getDayMonthYear()


        userDB !== '' && setUserPdfData({
            ...pdfData,
            ["CA-COTIZACION No"]: cotizacionNo,
            ["CA-FECHA"]: date,
            operador: userDB.admins[user.uid].name

        })


        let object = {
            CotizacionAerea: userDB.CotizacionAerea ? userDB.CotizacionAerea + 1 : 1
        }
        writeUserData('/', object, setUserSuccess)
    }

    console.log(userDB)


        // async function startCapture(displayMediaOptions) {
        //     let captureStream = null;

        //     try {
        //       captureStream =
        //         await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        //         console.log(captureStream)
        //     } catch (err) {
        //       console.error(`Error: ${err}`);
        //     }
        //     return captureStream;
        //   }

        //   startCapture()



//   function genPDF()
//   {
//    html2canvas(document.body,{
//    onrendered:function(canvas){

//    var img=canvas.toDataURL("image/png");
//    var doc = new jsPDF();
//    doc.addImage(img,'JPEG',20,20);
//    doc.save('test.pdf');
//    }

//    });

//   }
//   genPDF()
    useEffect(() => {


    }, [userDB, tarifa]);

    return (
        <div className="relative flex  justify-center min-h-screen ">
            <img src="/airplane-bg.jpg" className='fixed top-0 left-0 w-screen h-screen  object-cover  ' alt="" />
            <div className={'relative  py-[100px] mt-[70px] max-w-[960px] w-[95vw] md:w-[80vw] bg-white p-[20px]  shadow-[0 4px 8px rgba(0,0,0,0.1)]'}>
                <form className={'space-y-6 '} ref={form} onSubmit={sendEmail}>
                    {/* <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>
                        <InputFlotante className={'relative bg-[#00195c] text-center text-white my-3 p-2'} type="text" onChange={handleFilterChange} label='Autocompletar por CI' />
                        <Button style={'buttonSecondary'} click={handlerFilterButton}>Completar</Button>
                    </div> */}

                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>INSTRUCCIONES DE EMBARQUE</div>
                    <div className={'space-y-6'}>
                        <div className={style.imgForm}>
                            <Image src="/logo.svg" width="250" height="150" alt="User" />
                        </div>
                    </div>
                    <br />

                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>EMBARCADOR / EXPORTADOR / NOMBRE COMPLETO / DIRECCIÓN </div>

                    <div className={'space-y-6'}>
                        <InputFlotante type="text" name={`DETALLEADICIONAL`} label="NOMBRE" />
                        <InputFlotante type="number" name={`COSTOUNITARIO`} label="DIRECCIÓN" />
                        <InputFlotante type="number" name={`CANTIDAD`} label="TAX ID" />
                        <InputFlotante type="number" label="TELEFONO" />
                        <InputFlotante type="number" label="EMAIL" />
                    </div>
                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>CONSIGNATARIO / IMPORTADOR / NOMBRE COMPLETO / DIRECCIÓN </div>

                    <div className={'space-y-6'}>
                        <InputFlotante type="text" name={`DETALLEADICIONAL`} label="NOMBRE" />
                        <InputFlotante type="number" name={`COSTOUNITARIO`} label="DIRECCIÓN" />
                        <InputFlotante type="number" name={`CANTIDAD`} label="TAX ID" />
                        <InputFlotante type="number" label="TELEFONO" />
                        <InputFlotante type="number" label="EMAIL" />
                    </div>
                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>CONSIGNATARIO / IMPORTADOR / NOMBRE COMPLETO / DIRECCIÓN </div>
                    <div className={'space-y-6'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quam tempora error, maxime eius totam temporibus iste doloremque amet animi, nulla adipisci architecto officiis doloribus voluptate velit dolorum consequuntur eaque!
                        Iure repellat impedit repellendus saepe necessitatibus at tenetur adipisci, asperiores possimus doloremque quaerat earum veritatis accusantium cumque aspernatur expedita, quibusdam est quidem rerum porro perferendis eos eaque voluptates ipsa. Illo.
                        Repudiandae reiciendis at, ipsam, magnam ullam voluptatum dolorum ad eius laudantium voluptatem sed non aspernatur expedita nostrum quia veniam qui labore alias ratione voluptate placeat. Explicabo fugit quae nemo dicta?
                        Aut eum beatae, molestias fuga cum voluptatem expedita saepe ipsa assumenda hic quo ratione laudantium eius ducimus sed ipsum, dolorem aliquam. Impedit obcaecati neque, accusamus sint est tempore qui fugit?
                        Odit, eaque aspernatur. Dolorum nesciunt eum, nihil possimus ratione nobis voluptas distinctio vitae quo, dolorem autem aliquid? Quo recusandae aliquid maiores non praesentium dolorum itaque id, maxime necessitatibus dolores veniam?
                    </div>
                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>NOTIFICA A:</div>

                    <div className={'space-y-6'}>
                        <InputFlotante type="text" name={`DETALLEADICIONAL`} label="NOMBRE" />
                        <InputFlotante type="number" name={`COSTOUNITARIO`} label="DIRECCIÓN" />
                        <InputFlotante type="number" name={`CANTIDAD`} label="TAX ID" />
                        <InputFlotante type="number" label="TELEFONO" />
                        <InputFlotante type="number" label="EMAIL" />
                    </div>
                    <div className={'space-y-6'}>
                        <div>
                            <label htmlFor="" className={'block relative bg-[#ffb834] text-center text-white my-3 p-2'}>PARTES DE LA TRASACCIÓN / PARTIES TO TRANSACTION</label>
                            <div className={'flex justify-around '}>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Yes</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>No</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>DOCUMENTOS INCLUIDOS CON EL ENVIO <span className={'inline-block w-[50px] bg-green-500 text-white'} onClick={() => handlerCounterFour('pluss')}>+</span> <span className={'inline-block w-[50px] bg-red-500 text-white'} onClick={() => handlerCounterFour('less')}>-</span></div>

                    {
                        excluye.map((i, index) => {
                            return (

                                <div className={style.InputFlotantesAll} key={index}>
                                    <InputFlotante type="text" name={`EXCLUYE${index}`} onChange={handleEventChange} defaultValue={pdfData[`CA-EXCLUYE${index}`] && pdfData[`CA-EXCLUYE${index}`]} />
                                </div>
                            )
                        })
                    }
                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>INSTRUCCIONES DOMESTICAS/ TAMBIEN NOTIFICAR / AGENTE EN LA PUERTA DE DESCARGA </div>

                    <div className={'space-y-6'}>
                        <InputFlotante type="text" name={`DETALLEADICIONAL`} label="NOMBRE" />
                        <InputFlotante type="number" name={`COSTOUNITARIO`} label="DIRECCIÓN" />
                        <InputFlotante type="number" name={`CANTIDAD`} label="TAX ID" />
                        <InputFlotante type="number" label="TELEFONO" />
                        <InputFlotante type="number" label="EMAIL" />
                    </div>
                    <div className={'space-y-6'}>
                        <div>
                            <label htmlFor="" className={'block relative bg-[#ffb834] text-center text-white my-3 p-2'}>RUTA DE EXPORTACION TRAZADA</label>
                            <div className={'flex justify-around '}>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Yes</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>No</span></div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className={'block relative bg-[#ffb834] text-center text-white my-3 p-2'}>SERVICIOS REQUERIDOS</label>
                            <div className={'flex justify-around '}>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Puerto a puerto</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Puerto a puerta</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Puerta a puerta</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Puerta a puerto</span></div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className={'block relative bg-[#ffb834] text-center text-white my-3 p-2'}>CARGA PELIGROSA</label>
                            <div className={'flex justify-around justify-around'}>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Si</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>No</span></div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className={'block relative bg-[#ffb834] text-center text-white my-3 p-2'}>CARGA DE CREDITO ?</label>
                            <div className={'flex justify-around '}>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Si</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>No</span></div>
                            </div>                        </div>
                        <div>
                            <label htmlFor="" className={'block relative bg-[#ffb834] text-center text-white my-3 p-2'}>MODALIDAD DE TRANSPORTE</label>
                            <div className={'flex justify-around '}>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Aerea</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Maritima</span></div>
                                <div><input type="checkbox" className={'mr-5'} name="" id="" /><span>Terrestre</span></div>
                            </div>
                        </div>
                    </div>

                    <div className={'space-y-6'}>
                        <InputFlotante type="text" label={"DESCRIPCIÓN DE LA CARGA"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"SUBPARTIDA / CODIGO ARMONIZADO"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"PESO BRUTO POR PAQUETE"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"CANTIDAD DE PAQUETES"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"PESO BRUTO TOTAL"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"DIMENCIÓN POR PAQUETE (Largo x ancho x alto)(Cm)"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"VOLUMEN TOTAL (M3)"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"VALOR DE LA CARGA EN USO"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"SELLOS Y NUMEROS // CONTAINER // SEAL No."} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"REFERENCIA DEL EXPORTADOR"} onChange={handleEventChange} />
                    </div>
                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>REMARKS / INSTRUCCIONES ESPECIALES <span className={'inline-block w-[50px] bg-green-500 text-white'} onClick={() => handlerCounterFive('pluss')}>+</span> <span className={'inline-block w-[50px] bg-red-500 text-white'} onClick={() => handlerCounterFive('less')}>-</span></div>
                    {
                        notas.map((i, index) => {
                            return (

                                <div className={style.InputFlotantesAll} key={index}>
                                    <InputFlotante type="text" name={`NOTAS${index}`} onChange={handleEventChange} defaultValue={pdfData[`CA-NOTAS${index}`] && pdfData[`CA-NOTAS${index}`]} />
                                </div>
                            )
                        })
                    }
                    <br />


                    <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>FAVOR CONFIRMAR QUE TODOS LOS DATOS SEAN CORRECTOS ANTES DE ENVIAR</div>
                    <br />
                    <div className={'space-y-6'}>
                        <InputFlotante type="text" label={"NOMBRE"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"EMPRESA"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"CARGO"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"TELEFONO"} onChange={handleEventChange} />
                        <InputFlotante type="text" label={"FECHA"} onChange={handleEventChange} />
                    </div>
                    <br />
                    <div className='flex justify-center'>
                        <Button theme="Primary" type='submit'>Guardar</Button>
                        {/* <Button theme="Primary" type='submit' click={(e) => { saveFrontPage(e,) }}>Guardar</Button> */}

                    </div>

                </form>
            </div>
            {/* <div className={'relative bg-[#00195c] text-center text-white my-3 p-2'}>
                <Button style={'buttonPrimary'} click={generateNO}>Generar N°</Button>
                <InvoicePDF />
            </div> */}
            <br />
            <br />
        </div>
    )
}

export default CotizacionTerrestre
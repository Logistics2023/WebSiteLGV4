'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react'
import { useUser } from '@/context/Context'
import Link from 'next/link'
import { handleSignOut } from '@/firebase/utils'
import Modal from '@/components/Modal'
import { glosario } from '@/db'
import SelectSimple from '@/components/SelectSimple'
import { Translator, getTranslation } from '@miracleufo/react-g-translator';


export default function BottomNavigation({ rol }) {
    const { user, userDB, modal, setModal, setUserProfile, languaje, setSelect, setLanguaje, setUserSuccess, setUserData, setUserProduct, setRecetaDB, setUserCart, setUserDistributorPDB, filter, setFilter, nav, setNav, navItem, setNavItem, setSeeMore } = useUser()
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollY, setScrollY] = useState(0)
    const router = useRouter()
    const pathname = usePathname()
    function openNav(e) {
        e.preventDefault()
        e.stopPropagation()
        setNav(!nav)
    }

    function handlerNavItem(item) {
        setSelect(null)
        navItem === item
            ? setNavItem('')
            : setNavItem(item)
    }
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setShow(false);
            setFilter('')
            setScrollY(window.scrollY)

        } else {
            setFilter('')
            setShow(true);
            setScrollY(window.scrollY)
        }
        setLastScrollY(window.scrollY);
    };


    function handlerFilter(e) {
        setFilter(e.target.value)
        console.log(filter)
    }
    function handlerClickSelect(name, i, uuid) {
        setLanguaje(i)
        handlerNavItem('')
        setTimeout(() => {
            setUserSuccess('')
        }, 1);
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY, show, filter, languaje]);
    return <>
        <nav className={`fixed  w-screen   transition-all ${pathname == '/Glosario' ? ' bg-gradient-to-br from-[#00195c] via-[#274492] to-[#00195c]' : ''} z-40  ${show ? 'top-0' : 'top-[-100px]'} transition-all  ${scrollY > 50 ? 'bg-gradient-to-t from-[#00195cdc] via-[#00195cb6] to-[#00195cdc] lg:border-b lg:border-gray-200' : ''}`}>
            {/* <div className='absolute top-0 justify-space-between'>
            <div id='Tracking'></div>
            <div id='FTL'></div>
            <div id='FCL'></div>
          </div> */}
            <div className="w-screen flex items-center justify-between mx-auto py-4 px-4 lg:px-8 ">
                <div className='flex items-center  md:hidden'>
                    <Link href="/" className="flex items-center">
                        <img src="/logo.svg" className="relative top-[3px] h-[50px]  mr-3" alt="Flowbite Logo" />
                    </Link>
                </div>
                <Link href="/" className=" items-center hidden  md:flex">
                    <img src="/logo.svg" className="relative top-[3px] h-[50px]  mr-3" alt="Flowbite Logo" />
                </Link>
                {
                    pathname === '/Glosario' && <div className="relative w-[60vw] max-w-[500px] h-[40px] ">
                        <input type="search" id="location-search" onChange={handlerFilter} className="block p-3 w-full  h-full z-20  placeholder-white text-[12px]   bg-[#7397e69d] rounded-[5px] focus:ring-blue-500 focus:border-blue-500 text-white" placeholder="Glosario" required />
                        <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-[12px] font-medium text-[#000000] bg-[#ffffffc7] rounded-r-[5px] border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>

                    </div>
                }
                {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' &&
                    <div className='relative  flex items-center  lg:hidden'>
                        {
                            pathname === '/' && (user
                                ? <button className=' relative h-[35px]   z-50 bg-[#F7BE38] mr-5 p-2 px-5 rounded-[5px] border lg:hidden' onClick={() => handleSignOut()}>Cerrar Sesión</button>
                                : <button className=' relative h-[35px] z-50 bg-[#F7BE38]  mr-5 p-2 px-5 rounded-[5px] border lg:hidden' onClick={() => router.push('/Login')}>Iniciar Sesión</button>
                            )
                        }

                        <div className='relative w-[60px] mr-2'>
                            {pathname === '/' && <SelectSimple arr={['Español', 'English']} bg='bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 text-white border-[#ffffff38]' position={'absolute left-0 md:px-1 sm:px-4'} click={handlerClickSelect} defaultValue={languaje.slice(0, 2)} />}
                        </div>

                        <button type="button" className="  relative flex items-center  w-[40px] h-[40px] justify-center text-[12px] text-gray-500 rounded-lg lg:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 z-50" onClick={openNav}>
                            <svg className="w-12 h-12 p-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 17 14">
                                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>


                    </div>
                }



                {/* {pathname === '/' && pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <div className="hidden w-screen lg:block md:w-auto " id="navbar-default"> */}
                {pathname !== '/Glosario' && pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <div className="hidden w-screen lg:block md:w-auto " id="navbar-default">

                    <ul className="list-none font-medium flex flex-col p-4 md:p-0 mt-0 rounded-lg md:flex-row md:items-center md:space-x-8  ">
                        <li onClick={() => handlerNavItem('Inicio')}>
                            <Link href='/#inicio' className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Inicio' ? 'text-[#F1BA06]' : 'text-white'}`}>{languaje === 'Español' ? 'Inicio' : 'Home'}</Link>
                        </li>
                        <li onClick={() => handlerNavItem('Servicios')}>
                            <Link href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Servicios' ? 'text-[#F1BA06]' : 'text-white'}`}> {languaje === 'Español' ? 'Servicios' : 'Services'}</Link>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'Servicios' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/#terrestre' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Transporte Terrestre</span>
                                </Link>
                                <Link href='/#maritimo' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Transporte Maritimo</span>
                                </Link>
                                <Link href='/#aereo' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/AEREO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Transporte Aereo</span>
                                </Link>
                                <Link href='/#despachos' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/DESPACHO ADUANERO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Despachos Aduaneros</span>
                                </Link>
                            </div>
                        </li>
                        <li onClick={() => handlerNavItem('ServiciosEspecializados')}>
                            <Link href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'ServiciosEspecializados' ? 'text-[#F1BA06]' : 'text-white'}`}>{languaje === 'Español' ? 'Servicios Especializados' : 'Specialized services'}</Link>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'ServiciosEspecializados' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/#proyecto' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/CARGA REFRIGERADA.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium">Cargas Proyecto</span>
                                </Link>
                                <Link href='/#exportaciones' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Exportaciones</span>
                                </Link>
                                <Link href='/#farmaceutico' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Farmacéutico y Sanitario</span>
                                </Link>
                            </div>
                        </li>

                        <li onClick={() => handlerNavItem('Herramientas')}>
                            <Link href="/SolucionesIT" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Herramientas' ? 'text-[#F1BA06]' : 'text-white'}`} >{languaje === 'Español' ? 'Soluciones IT' : 'Solutions IT'}</Link>
                            {/* <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'Herramientas' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                    <Link href='/Contenedores?item=maritimos' className='bg-[#F1BA06]   flex flex-col items-center justify-around px-[5px] py-[5px] rounded-[7px]'>
                                        <img src="/icons/TIPOS DE CONTENEDORES MARITIMOS.png" className=" w-[35px]" alt="" />
                                        <span className="text-[12px] font-medium text-center">Contenedores maritimos</span>
                                    </Link>
                                    <Link href='/Contenedores?item=aereos' className='bg-[#F1BA06]   flex flex-col items-center  justify-around px-[5px] py-[5px] rounded-[7px]'>
                                        <img src="/icons/TIPOS DE CONTENEDORES AEREOS.png" className=" w-[35px]" alt="" />
                                        <span className="text-[12px] font-medium text-center">Contenedores aereos</span>
                                    </Link>
                                    <Link href='/Calculadora' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                        <img src="/icons/CALCULADORA DE PESO CARGABLE.png" className=" w-[35px]" alt="" />
                                        <span className="text-[12px] font-medium text-center">Calculadora de peso cargable  </span>
                                    </Link>
                                    <Link href='/Impuestos' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                        <img src="/icons/CALCULADORA DE IMPUESTOS.png" className=" w-[35px]" alt="" />
                                        <span className="text-[12px] font-medium text-center">Calculadora de impuestos  </span>
                                    </Link>
                                    <Link href='/#home' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                        <img src="/icons/DIRECCION.png" className=" w-[35px]" alt="" />
                                        <span className="text-[12px] font-medium text-center">Tracking</span>
                                    </Link>
                                </div> */}
                        </li>
                        <li onClick={() => handlerNavItem('Experiencia')}>
                            <Link href="/Experiencia" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Experiencia' ? 'text-[#F1BA06]' : 'text-white'}`} >{languaje === 'Español' ? 'Experiencia' : 'Experience'}</Link>
                        </li>
                        <li onClick={() => handlerNavItem('GuiaComex')}>
                            <Link href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'GuiaComex' ? 'text-[#F1BA06]' : 'text-white'}`}>{languaje === 'Español' ? 'Guia Comex' : 'Comex Guide'}</Link>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'GuiaComex' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/Contenedores?item=maritimos' onClick={() => setNav(false)} className='bg-[#F1BA06] flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TIPOS DE CONTENEDORES MARITIMOS.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Contenedores maritimos' : 'Maritime containers'}</span>
                                </Link>
                                <Link href='/Contenedores?item=aereos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center justify-around px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TIPOS DE CONTENEDORES AEREOS.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Contenedores aereos' : 'Air containers'}</span>
                                </Link>
                                <Link href='/Glosario' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/GLOSARIO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Glosario' : 'Glossary'}</span>
                                </Link>
                            </div>
                        </li>
                        <li onClick={() => handlerNavItem('Nosotros')}>
                            <Link href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Nosotros' ? 'text-[#F1BA06]' : 'text-white'}`}>{languaje === 'Español' ? 'Acerca de' : 'About Us'}</Link>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'Nosotros' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/#Nosotros' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/NOSOTROS.png" className=" w-[35px]" alt="" />
                                    <span>Nosotros</span>
                                </Link>
                                <Link href='/#PorQueElegirnos' onClick={() => { setNav(false); setSeeMore('PORQUE') }} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/NOSOTROS.png" className=" w-[35px]" alt="" />
                                    <span>Por que nosotros?</span>
                                </Link>
                            </div>
                        </li>


                        <li>
                            {
                                pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && (user
                                    ? <button className=' relative h-[35px]  z-50 bg-[#F7BE38] p-2 px-5 rounded-[5px] border hidden lg:block' onClick={() => handleSignOut()}>{languaje === 'Español' ? 'Cerrar Sesión' : 'Logout'}</button>
                                    : <button className=' relative h-[35px] z-50 bg-[#F7BE38]   p-2 px-5 rounded-[5px] border hidden lg:block' onClick={() => router.push('/Login')}>{languaje === 'Español' ? 'Iniciar Sesión' : 'Login'}</button>
                                )
                            }
                        </li>
                        {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <li>
                            <button className='flex items-center text-white h-[35px]  bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800      rounded-[5px] border    text-center  p-2 px-5' onClick={() => window.open('https://sistemas.logisticsgear.net')}>
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z" stroke="white" stroke-width="1.5" />
                                    <path d="M14 14C14 15.105 14 16 10 16C6 16 6 15.105 6 14C6 12.895 7.79 12 10 12C12.21 12 14 12.895 14 14Z" stroke="white" stroke-width="1.5" />
                                    <path d="M1 9.417C1 6.219 1 4.62 1.378 4.082C1.755 3.545 3.258 3.03 6.265 2.001L6.838 1.805C8.405 1.268 9.188 1 10 1C10.811 1 11.595 1.268 13.162 1.805L13.735 2.001C16.742 3.03 18.245 3.545 18.622 4.082C19 4.62 19 6.22 19 9.417V10.991C19 13.496 18.163 15.428 17 16.904M1.193 13C2.05 17.298 5.576 19.513 7.899 20.527C8.62 20.842 8.981 21 10 21C11.02 21 11.38 20.842 12.101 20.527C12.68 20.275 13.332 19.947 14 19.533" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                <span className='ml-5'>
                                    My LG
                                </span>
                            </button>
                        </li>}
                        <div className='relative w-[100px]'>

                            {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <SelectSimple arr={['Español', 'English']} bg='bg-[#F7BE38] text-black border-[#ffffff38]' position={'absolute left-0 px-4'} click={handlerClickSelect} defaultValue={languaje} />}

                        </div>

                    </ul>
                </div>}



                {pathname === '/Glosario' && <div className="hidden w-screen lg:block md:w-auto " id="navbar-default">

                    <ul className="list-none font-medium flex flex-col p-4 md:p-0 mt-0 rounded-lg md:flex-row md:items-center md:space-x-8  ">
                      


                        <li>
                            {
                                pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && (user
                                    ? <button className=' relative h-[35px]  z-50 bg-[#F7BE38] p-2 px-5 rounded-[5px] border hidden lg:block' onClick={() => handleSignOut()}>{languaje === 'Español' ? 'Cerrar Sesión' : 'Logout'}</button>
                                    : <button className=' relative h-[35px] z-50 bg-[#F7BE38]   p-2 px-5 rounded-[5px] border hidden lg:block' onClick={() => router.push('/Login')}>{languaje === 'Español' ? 'Iniciar Sesión' : 'Login'}</button>
                                )
                            }
                        </li>
                        {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <li>
                            <button className='flex items-center text-white h-[35px]  bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800      rounded-[5px] border    text-center  p-2 px-5' onClick={() => window.open('https://sistemas.logisticsgear.net')}>
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z" stroke="white" stroke-width="1.5" />
                                    <path d="M14 14C14 15.105 14 16 10 16C6 16 6 15.105 6 14C6 12.895 7.79 12 10 12C12.21 12 14 12.895 14 14Z" stroke="white" stroke-width="1.5" />
                                    <path d="M1 9.417C1 6.219 1 4.62 1.378 4.082C1.755 3.545 3.258 3.03 6.265 2.001L6.838 1.805C8.405 1.268 9.188 1 10 1C10.811 1 11.595 1.268 13.162 1.805L13.735 2.001C16.742 3.03 18.245 3.545 18.622 4.082C19 4.62 19 6.22 19 9.417V10.991C19 13.496 18.163 15.428 17 16.904M1.193 13C2.05 17.298 5.576 19.513 7.899 20.527C8.62 20.842 8.981 21 10 21C11.02 21 11.38 20.842 12.101 20.527C12.68 20.275 13.332 19.947 14 19.533" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                <span className='ml-5'>
                                    My LG
                                </span>
                            </button>
                        </li>}
                        <div className='relative w-[100px]'>

                            {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <SelectSimple arr={['Español', 'English']} bg='bg-[#F7BE38] text-black border-[#ffffff38]' position={'absolute left-0 px-4'} click={handlerClickSelect} defaultValue={languaje} />}

                        </div>

                    </ul>
                </div>}
            </div>
        </nav>





        <div className={`fixed top-0 w-screen lg:w-screen lg:border-r-8 overflow-auto  bg-gradient-to-tr from-[#00195c] via-[#274492] to-[#00195c] h-screen transition-all	z-50  py-[20px] pb-[50px] ${nav ? 'left-0  ' : 'left-[-100vw] '} z-50`}
            style={{
                backgroundColor: '#011B68',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%23323268'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%231a2768'/%3E%3Cstop offset='1' stop-color='%23323268'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
            }}>
            <div className="py-4 overflow-y-auto absolute top-[10px] right-[20px]">
                <div className="w-[100%] text-[12px] flex justify-between items-center">
                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setNav(false)}>
                        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#991b1b" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/*-------------------------------------------- MOBILE--------------------------- */}
            <div className='pt-[50PX]'>

                <Link href='/' onClick={() => setNav(false)}>
                    <h3 className="flex justify-center items-center text-black text-[12px] font-medium pt-2 pl-5 m-0 border border-[#ffffff38] bg-[#F1BA06] text-center px-[5px] py-[5px] rounded-[7px] mx-[20px] my-[15px]">
                        {languaje === 'Español' ? 'INICIO' : 'HOME'}
                        {/* <svg className="ml-10 rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg> */}
                    </h3>
                </Link>

                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">{languaje === 'Español' ? 'NOSOTROS' : 'ABOUT US'}</h3>
                <div className='grid grid-cols-2 gap-[20px] p-[20px] pt-[10px]'>
                    <Link href='/#Nosotros' onClick={() => setNav(false)} className='bg-[#F1BA06]    flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/NOSOTROS.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Nosotros' : 'About Us'}</span>
                    </Link>
                    <Link href='/#PorQueElegirnos' onClick={() => { setNav(false); setSeeMore('PORQUE') }} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TRABAJO CONCLUIDO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Por que elegirnos?' : 'Why We'}</span>
                    </Link>
                </div>
                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">{languaje === 'Español' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES'}</h3>
                <div className='grid grid-cols-2 gap-[20px] p-[20px] pt-[10px]'>
                    <Link href='/#terrestre' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Transporte Terrestre' : 'Ground transportation'}</span>
                    </Link>
                    <Link href='/#maritimo' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Transporte Maritimo' : 'Marine transport'}</span>
                    </Link>
                    <Link href='/#aereo' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/AEREO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Transporte Aereo' : 'Air Transport'}</span>
                    </Link>
                    <Link href='/#despachos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/DESPACHO ADUANERO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Despachos Aduaneros' : 'Customs Clearances'}</span>
                    </Link>

                </div>
                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">{languaje === 'Español' ? 'SERVICIOS ESPECIALIZADOS' : 'SPECIALIZED SERVICES'}</h3>
                <div className='grid grid-cols-2 gap-[20px] p-[20px] pt-[10px] border-[#ffffff38] border-b-[5px] mb-10'>

                    <Link href='/#proyecto' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CARGA REFRIGERADA.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium">{languaje === 'Español' ? 'Cargas Proyecto' : 'Project Loads'}</span>
                    </Link>
                    <Link href='/#exportaciones' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Exportaciones' : 'Exports'}</span>
                    </Link>
                    <Link href='/#farmaceutico' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Farmacéutico y Sanitario' : 'Pharmaceutical and Healthcare'}</span>
                    </Link>
                </div>

                <Link href='/SolucionesIT' onClick={() => setNav(false)}>
                    <h3 className="text-black text-[12px] font-medium pt-2 pl-5 m-0 bg-[#F1BA06]  border border-[#ffffff38] text-center px-[5px] py-[5px] rounded-[7px] mx-[20px] my-[15px]">{languaje === 'Español' ? 'SOLUCIONES IT' : 'IT SOLUTIONS'}</h3>
                </Link>

                <div className='relative grid grid-cols-2 gap-[20px] p-[20px] pt-[10px] border-[#ffffff38] border-b-[5px] mb-10'>
                    <Link href='/Calculadora' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CALCULADORA DE PESO CARGABLE.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Calculadora de peso cargable' : 'Loadable Weight Calculator'}</span>
                    </Link>
                    <Link href='/Impuestos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CALCULADORA DE IMPUESTOS.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Calculadora de impuestos' : 'tax calculator'} </span>
                    </Link>
                    <Link href='/Tracking' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/DIRECCION.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Tracking' : 'Tracking'}</span>
                    </Link>
                </div>


                <Link href='/Experiencia' onClick={() => setNav(false)}>
                    <h3 className="text-black text-[12px] font-medium pt-2 pl-5 m-0 bg-[#F1BA06]  border border-[#ffffff38] text-center px-[5px] py-[5px] rounded-[7px] mx-[20px] my-[15px]">{languaje === 'Español' ? 'EXPERIENCIA' : 'EXPERIENCE'}</h3>
                </Link>
                <div className='relative grid grid-cols-2 gap-[20px] p-[20px] pt-[10px] border-[#ffffff38] border-b-[5px] mb-10'>
                    <Link href='/Experiencia' onClick={() => setNav(false)} className='bg-[#F1BA06] flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/EXPERIENCIA.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Nuestra huella' : 'Maritime containers'}</span>
                    </Link>
                    <Link href='/Experiencia#testimonios' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center justify-around px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CONTACTO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Testimonios' : 'Air containers'}</span>
                    </Link>
                </div>



                {/* <div className='bg-[#00000029] py-10 mt-10'> */}

                <h3 className=" text-[12px] text-left font-medium pt-2 pl-5 m-0 text-white  px-[5px] py-[5px] rounded-[7px] mx-[20px] my-[15px]">{languaje === 'Español' ? 'GUIA COMEX' : 'COMEX GUIDE'}</h3>

                <div className='relative grid grid-cols-2 gap-[20px] p-[20px] pt-[10px] '>
                    <Link href='/Contenedores?item=maritimos' onClick={() => setNav(false)} className='bg-[#F1BA06] flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TIPOS DE CONTENEDORES MARITIMOS.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Contenedores maritimos' : 'Maritime containers'}</span>
                    </Link>
                    <Link href='/Contenedores?item=aereos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center justify-around px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TIPOS DE CONTENEDORES AEREOS.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Contenedores aereos' : 'Air containers'}</span>
                    </Link>
                    <Link href='/Glosario' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/GLOSARIO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">{languaje === 'Español' ? 'Glosario' : 'Glossary'}</span>
                    </Link>
                </div>
                <div className='relative grid grid-cols-2 gap-[20px] p-[100px] pt-[10px] '>

                </div>
                {/* </div> */}


            </div>
        </div>
    </>
}



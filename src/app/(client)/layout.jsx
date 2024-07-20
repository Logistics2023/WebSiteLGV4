'use client'

import Loader from '@/components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'
import { getSpecificData } from '@/firebase/utils'
import { onAuth } from '@/firebase/utils'
import Modal from '@/components/Modal'

function Home({ children }) {

    const { user, userDB, setUserProfile, modal, setUserData, setModal, cliente, setNavItem, setCliente, setFocus } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (user === undefined) { onAuth(setUserProfile, setUserData) }
        if (user === null && userDB === null) setModal('REGISTRATE')
        if (user && user !== undefined && userDB === null) setModal('REGISTRATE')
        cliente === undefined && getSpecificData('/Cliente', setCliente)
    }, [user, cliente])
    return (
        <>
            {modal === 'REGISTRATE' && <Modal onClickTrue={() => { router.push('/SignUp'); setModal('') }} textTrue='Registrarme' theme='success' textFalse='Cancelar' onClickFalse={() => {router.back(), setModal('')}}>Registrate o Inicia Sesión para utilizar nuestras herramientas gratis</Modal>}
            <div onClick={() => { setFocus(false); setNavItem(false) }}>{children}</div>
        </>
    )
}
export default Home
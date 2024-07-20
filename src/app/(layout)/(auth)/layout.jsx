'use client'   

import Loader from '@/components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'
import { getSpecificData } from '@/firebase/utils'
import { onAuth } from '@/firebase/utils'

function Home({ children }) {

    const { user, userDB, setUserProfile, setUserData, cliente, setNavItem, setCliente, setFocus } = useUser()
    const router = useRouter()
    console.log(user)
    useEffect(() => {
        if (user === undefined) { onAuth(setUserProfile, setUserData) }
        if (user === null) { router.replace('/Login') }
        if (user && user !== undefined && userDB === null) { router.replace('/Register') }
        cliente === undefined && getSpecificData('/Cliente', setCliente)
    }, [user, cliente])
    return (

       user && user !== undefined && <div onClick={() => {setFocus(false); setNavItem(false)} }>{children}</div>

    )
}

export default Home

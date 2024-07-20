'use client'
import { useUser } from '@/context/Context'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'

import Loader from '@/components/Loader'

function Home({ children }) {
  const router = useRouter()
  const { user, introVideo, userDB, setUserProfile,modal, setModal, setUserSuccess, calcValueFCL, setCalcValueFCL, calcValue, setCalcValue, element, setElement, naviera, setNaviera, success, setUserData, postsIMG, setUserPostsIMG, nav, cliente, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()




  return (
    <>
       {success === 'Change' &&  <Loader>ghfhfhj</Loader>}

          {modal === 'REGISTRATE' && <Modal onClickTrue={() =>{ router.push('/SignUp'); setModal('')}} textTrue='Registrarme' theme='success' textFalse='Cancelar' onClickFalse={() => setModal('')}>Registrate o Inicia Sesión para utilizar nuestras herramientas gratis</Modal>}
        {children}
    </>
  )
}

export default Home


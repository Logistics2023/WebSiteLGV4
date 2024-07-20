'use client'
import { TypeAnimation } from 'react-type-animation';
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'

const TextMaquina = () => {
  const { languaje, setUserDistributorPDB, filter, setFilter, nav, setNav, navItem, setNavItem, setSeeMore } = useUser()

  console.log(languaje)



  return <TypeAnimation
    sequence={[
      // Specialists in Project Cargo Specialists in Exports
      'SPECIALIST IN PROJECT CARGO',
      1000, // wait 1s before replacing "Mice" with "Hamsters" Specialists in Pharmaceuticals
      'SPECIALIST IN EXPORTS',
      1000,
      'SPECIALIST IN PHARMACEUTICALS',
      1000,
    ]}
    wrapper="span"
    speed={40}
    style={{ fontSize: '16px', display: 'inline-block', color: 'white', width: '300px', textAlign: 'left', }}
    repeat={Infinity}
  />
};
export default TextMaquina
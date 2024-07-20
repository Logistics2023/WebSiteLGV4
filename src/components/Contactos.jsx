'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import "animate.css/animate.compat.css"
import { useRouter } from 'next/navigation';

export default function Home() {
    const { option, setUserSuccess, success, cliente } = useUser()
    const [textEditor, setTextEditor] = useState(undefined)
    const [query, setQuery] = useState('')

    function addContact(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        const obj = {
            [e.target[0].name]: e.target[0].value,
            [e.target[1].name]: e.target[1].value,
            [e.target[2].name]: e.target[2].value,
            [e.target[3].name]: e.target[3].value,
            [e.target[4].name]: e.target[4].value,
            [e.target[5].name]: e.target[5].value,
            [e.target[6].name]: e.target[6].value,
            [e.target[7].name]: e.target[7].value,
            [e.target[8].name]: e.target[8].value,
            [e.target[9].name]: e.target[9].value,
        }
        writeUserData(`Cliente/contactos/`, obj, setUserSuccess)
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])
    useEffect(() => {
        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].content) {
            console.log('text')
            setTextEditor(cliente[query].content)
        }
    }, [textEditor, query, option, cliente, success])
    return (
        <form className="relative  pt-10" onSubmit={addContact}>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Administrar contactos</h2>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Departamento</label>
                            <input type="text" name="departamento" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['departamento']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Dirección 1</label>
                            <input type="text" name="direccion 1" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['direccion 1']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Dirección 2</label>
                            <input type="text" name="direccion 2" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['direccion 2']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Telefono</label>
                            <input type="text" name="telefono" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['telefono']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Celular</label>
                            <input type="text" name="celular" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['celular']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Facebook</label>
                            <input type="text" name="facebook" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['facebook']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">TiK Tok</label>
                            <input type="text" name="twiter" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['twiter']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block 
                                  text-[12px] font-medium leading-6 text-gray-900">Gmail</label>
                            <input type="text" name="gmail" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['gmail']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Instagram</label>
                            <input type="text" name="instagram" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['instagram']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Linkedin</label>
                            <input type="text" name="linkedin" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['linkedin']} />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <Button type="submit" theme="Primary" >Guardar</Button>
                </div>
            </form>
    )
}


'use client'
import { useUser } from '@/context/Context'
import dynamic  from 'next/dynamic'
const InvoicePDF = dynamic(() => import("@/components/docPDF"), {
    ssr: false,
  });
  


export default function Home() {



  return (
    <div  className="h-full w-full">

                      <InvoicePDF />
    </div>
  )
}

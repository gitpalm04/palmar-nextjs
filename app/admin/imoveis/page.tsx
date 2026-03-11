"use client"

import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"

export default function AdminImoveis(){

 const [imoveis,setImoveis] = useState([])

 useEffect(()=>{
   fetch("/api/imoveis")
   .then(r=>r.json())
   .then(setImoveis)
 },[])

 return(

  <div className="container py-10">

   <h1 className="text-3xl font-bold mb-6">
    Gerenciar Imóveis
   </h1>

   <Button>Novo imóvel</Button>

   <div className="mt-6 space-y-3">

    {imoveis.map((i:any)=>(
      <div key={i.id} className="border p-4 rounded">

       <strong>{i.titulo}</strong>

      </div>
    ))}

   </div>

  </div>
 )
}
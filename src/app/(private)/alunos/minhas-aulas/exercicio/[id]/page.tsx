"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";

import { dadosExercicio, } from "@/app/http/exercicios/get-all-exercicio";
import { getExercicioById } from "@/app/http/exercicios/get-exercicio-by-id";

export default function ExercicioDetalhes() {
  const router = useRouter();
  const params = useParams();


  const id = Number(params.id);


  const [exercicio, setExercicio] = useState<dadosExercicio | null>(null);
  
  useEffect(() => {
  console.log("EXERCICIO RECEBIDO:", exercicio);
}, [exercicio]);


 
useEffect(() => {
  async function load() {
    const exercicio = await getExercicioById(id);
    setExercicio(exercicio);
  }

  load();
}, [id]);

  if (!exercicio) {
    return (
      <div className="text-center text-white mt-10">
        Exercício não encontrado.
      </div>
    );
  }

  return (
    <div className=" text-white mt-6">
      <header className="flex items-center p-2 gap-4 mb-4">
        <button onClick={() => router.back()} className="text-orange-400">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-semibold flex-1">
          {exercicio.grupo_muscular} - {exercicio.nome}
        </h1>
      </header>

      <div className="bg-purple-900 rounded-t-3xl rounded-b-none p-4 space-y-8  min-h-screen">
        <video controls className="w-full h-64 rounded-md">
          <source
            src={exercicio.videoExercicios?.[0]?.url}
            type="video/mp4"
          />
        </video>
      <div className="font-semibold">Descrição</div>
        <p>{exercicio.descricao}</p>
      </div>
    </div>
  );
}

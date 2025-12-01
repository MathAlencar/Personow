import { api } from "@/app/api-client";

import { dadosExercicio } from "./get-all-exercicio";

export async function getExercicioById(id: number): Promise<dadosExercicio> {
  try {
    const response = await api
      .get(`exercicios/unique/${id}`)
      .json<{ result: dadosExercicio }>();

    return response.result;
  } catch (error: any) {
    console.error("Erro ao buscar exercício por ID:", error);
    throw error;
  }
}

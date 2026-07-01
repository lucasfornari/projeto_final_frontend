'use server'

import { apiServerFetch } from '@/lib/api-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type ItemEntrada = {
  produtoId: number
  quantidade: number
  precoUnitario?: number
}

export type DadosOrcamento = {
  clienteId: number
  situacao: string
  valorDesconto: number
  validoAte?: string
  observacoes?: string
  itens: ItemEntrada[]
}

export type ResultadoOrcamento = {
  erro?: string
}

export async function criarOrcamento(
  dados: DadosOrcamento,
): Promise<ResultadoOrcamento> {
  const res = await apiServerFetch('/orcamentos', {
    method: 'POST',
    body: JSON.stringify(dados),
  })

  if (!res.ok) {
    return { erro: 'Não foi possível salvar o orçamento.' }
  }

  revalidatePath('/orcamentos')
  redirect('/orcamentos')
}

export async function atualizarOrcamento(
  id: number,
  dados: DadosOrcamento,
): Promise<ResultadoOrcamento> {
  const res = await apiServerFetch(`/orcamentos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dados),
  })

  if (!res.ok) {
    return { erro: 'Não foi possível salvar o orçamento.' }
  }

  revalidatePath('/orcamentos')
  redirect('/orcamentos')
}

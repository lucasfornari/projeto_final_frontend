'use server'

import { apiServerFetch } from '@/lib/api-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type EstadoFormulario = {
  erro?: string
}

export async function salvarProduto(
  _estado: EstadoFormulario | undefined,
  formData: FormData,
): Promise<EstadoFormulario> {
  const id = formData.get('id') as string

  const corpo = {
    nome: (formData.get('nome') as string).trim(),
    codigoSku: (formData.get('codigoSku') as string).trim() || undefined,
    descricao: (formData.get('descricao') as string).trim() || undefined,
    precoUnitario: Number(formData.get('precoUnitario')),
    unidade: (formData.get('unidade') as string).trim() || undefined,
    ativo: formData.get('ativo') === 'on',
  }

  let res: Response
  if (id) {
    res = await apiServerFetch(`/produtos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(corpo),
    })
  } else {
    res = await apiServerFetch('/produtos', {
      method: 'POST',
      body: JSON.stringify(corpo),
    })
  }

  if (!res.ok) {
    return { erro: 'Não foi possível salvar o produto.' }
  }

  revalidatePath('/produtos')
  redirect('/produtos')
}

export async function excluirProduto(formData: FormData) {
  const id = formData.get('id') as string
  await apiServerFetch(`/produtos/${id}`, { method: 'DELETE' })
  revalidatePath('/produtos')
}

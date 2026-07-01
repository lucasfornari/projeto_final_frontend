'use server'

import { apiServerFetch } from '@/lib/api-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type EstadoFormulario = {
  erro?: string
}

export async function salvarCliente(
  _estado: EstadoFormulario | undefined,
  formData: FormData,
): Promise<EstadoFormulario> {
  const id = formData.get('id') as string

  const corpo = {
    nome: (formData.get('nome') as string).trim(),
    documento: (formData.get('documento') as string).trim() || undefined,
    email: (formData.get('email') as string).trim() || undefined,
    telefone: (formData.get('telefone') as string).trim() || undefined,
    observacoes: (formData.get('observacoes') as string).trim() || undefined,
  }

  let res: Response
  if (id) {
    res = await apiServerFetch(`/clientes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(corpo),
    })
  } else {
    res = await apiServerFetch('/clientes', {
      method: 'POST',
      body: JSON.stringify(corpo),
    })
  }

  if (!res.ok) {
    return { erro: 'Não foi possível salvar o cliente.' }
  }

  revalidatePath('/clientes')
  redirect('/clientes')
}

export async function excluirCliente(formData: FormData) {
  const id = formData.get('id') as string
  await apiServerFetch(`/clientes/${id}`, { method: 'DELETE' })
  revalidatePath('/clientes')
}

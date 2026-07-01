'use server'

import { apiServerFetch } from '@/lib/api-server'
import { revalidatePath } from 'next/cache'

export type EstadoPerfil = {
  erro?: string
  sucesso?: string
}

export async function salvarPerfil(
  _estado: EstadoPerfil | undefined,
  formData: FormData,
): Promise<EstadoPerfil> {
  const corpo = {
    nomeCompleto: (formData.get('nomeCompleto') as string).trim(),
    email: (formData.get('email') as string).trim(),
  }

  const res = await apiServerFetch('/usuarios/atual', {
    method: 'PATCH',
    body: JSON.stringify(corpo),
  })

  if (!res.ok) {
    return { erro: 'Não foi possível atualizar o perfil.' }
  }

  revalidatePath('/usuario')
  return { sucesso: 'Perfil atualizado com sucesso.' }
}

export async function alterarSenha(dados: {
  senhaAtual: string
  novaSenha: string
}): Promise<EstadoPerfil> {
  const res = await apiServerFetch('/usuarios/atual/senha', {
    method: 'PATCH',
    body: JSON.stringify(dados),
  })

  if (!res.ok) {
    return { erro: 'Não foi possível alterar a senha. Confira a senha atual.' }
  }

  return { sucesso: 'Senha alterada com sucesso.' }
}

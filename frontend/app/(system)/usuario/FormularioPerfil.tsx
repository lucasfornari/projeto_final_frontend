'use client'

import { useActionState } from 'react'
import { salvarPerfil } from './actions'
import type { Usuario } from '@/types/usuario'

export default function FormularioPerfil({ usuario }: { usuario: Usuario }) {
  const [estado, formAction] = useActionState(salvarPerfil, undefined)

  return (
    <form action={formAction} className="card card-body mb-4">
      <h2 className="h5 mb-3">Dados do perfil</h2>

      {estado?.erro && (
        <div className="alert alert-danger" role="alert">
          {estado.erro}
        </div>
      )}
      {estado?.sucesso && (
        <div className="alert alert-success" role="alert">
          {estado.sucesso}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Nome completo</label>
        <input
          name="nomeCompleto"
          className="form-control"
          defaultValue={usuario.nomeCompleto}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          name="email"
          type="email"
          className="form-control"
          defaultValue={usuario.email}
          required
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primary">
          salvar
        </button>
      </div>
    </form>
  )
}

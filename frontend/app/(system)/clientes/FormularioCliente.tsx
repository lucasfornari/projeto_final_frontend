'use client'

import { useActionState } from 'react'
import { salvarCliente } from './actions'
import type { Cliente } from '@/types/cliente'

export default function FormularioCliente({ cliente }: { cliente?: Cliente }) {
  const [estado, formAction] = useActionState(salvarCliente, undefined)

  return (
    <form action={formAction} className="card card-body mb-4">
      <h2 className="h5 mb-3">{cliente ? 'Editar cliente' : 'Novo cliente'}</h2>

      {estado?.erro && (
        <div className="alert alert-danger" role="alert">
          {estado.erro}
        </div>
      )}

      {cliente && <input type="hidden" name="id" defaultValue={cliente.id} />}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            name="nome"
            className="form-control"
            defaultValue={cliente?.nome ?? ''}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Documento</label>
          <input
            name="documento"
            className="form-control"
            defaultValue={cliente?.documento ?? ''}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">E-mail</label>
          <input
            name="email"
            type="email"
            className="form-control"
            defaultValue={cliente?.email ?? ''}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Telefone</label>
          <input
            name="telefone"
            className="form-control"
            defaultValue={cliente?.telefone ?? ''}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Observações</label>
          <textarea
            name="observacoes"
            className="form-control"
            defaultValue={cliente?.observacoes ?? ''}
          />
        </div>
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </div>
    </form>
  )
}

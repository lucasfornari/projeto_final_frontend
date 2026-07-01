'use client'

import { useActionState } from 'react'
import { salvarProduto } from './actions'
import type { Produto } from '@/types/produto'

export default function FormularioProduto({ produto }: { produto?: Produto }) {
  const [estado, formAction] = useActionState(salvarProduto, undefined)

  return (
    <form action={formAction} className="card card-body mb-4">
      <h2 className="h5 mb-3">{produto ? 'Editar produto' : 'Novo produto'}</h2>

      {estado?.erro && (
        <div className="alert alert-danger" role="alert">
          {estado.erro}
        </div>
      )}

      {produto && <input type="hidden" name="id" defaultValue={produto.id} />}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            name="nome"
            className="form-control"
            defaultValue={produto?.nome ?? ''}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Código SKU</label>
          <input
            name="codigoSku"
            className="form-control"
            defaultValue={produto?.codigoSku ?? ''}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Unidade</label>
          <input
            name="unidade"
            className="form-control"
            defaultValue={produto?.unidade ?? 'UN'}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Preço unitário</label>
          <input
            name="precoUnitario"
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            defaultValue={produto?.precoUnitario ?? ''}
            required
          />
        </div>

        <div className="col-md-9">
          <label className="form-label">Descrição</label>
          <input
            name="descricao"
            className="form-control"
            defaultValue={produto?.descricao ?? ''}
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              name="ativo"
              className="form-check-input"
              id="ativo"
              defaultChecked={produto ? produto.ativo : true}
            />
            <label className="form-check-label" htmlFor="ativo">
              Ativo
            </label>
          </div>
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

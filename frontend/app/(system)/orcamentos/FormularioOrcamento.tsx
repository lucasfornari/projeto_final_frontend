'use client'

import { useState } from 'react'
import { criarOrcamento, atualizarOrcamento } from './actions'
import type { Cliente } from '@/types/cliente'
import type { Produto } from '@/types/produto'
import type { Orcamento, SituacaoOrcamento } from '@/types/orcamento'

const SITUACOES: SituacaoOrcamento[] = [
  'pendente',
  'enviado',
  'aprovado',
  'rejeitado',
  'cancelado',
]

type LinhaItem = {
  produtoId: string
  quantidade: string
  precoUnitario: string
}

export default function FormularioOrcamento({
  clientes,
  produtos,
  orcamento,
}: {
  clientes: Cliente[]
  produtos: Produto[]
  orcamento?: Orcamento
}) {
  const [clienteId, setClienteId] = useState(
    orcamento ? String(orcamento.clienteId) : '',
  )
  const [situacao, setSituacao] = useState<SituacaoOrcamento>(
    orcamento?.situacao ?? 'pendente',
  )
  const [valorDesconto, setValorDesconto] = useState(
    orcamento ? String(orcamento.valorDesconto) : '',
  )
  const [validoAte, setValidoAte] = useState(
    orcamento?.validoAte ? orcamento.validoAte.substring(0, 10) : '',
  )
  const [observacoes, setObservacoes] = useState(orcamento?.observacoes ?? '')
  const [itens, setItens] = useState<LinhaItem[]>(
    orcamento && orcamento.itens.length > 0
      ? orcamento.itens.map((i) => ({
          produtoId: String(i.produtoId),
          quantidade: String(i.quantidade),
          precoUnitario: String(i.precoUnitarioRegistro),
        }))
      : [{ produtoId: '', quantidade: '1', precoUnitario: '' }],
  )
  const [erro, setErro] = useState('')

  function alterarItem(indice: number, campo: keyof LinhaItem, valor: string) {
    const novos = [...itens]
    novos[indice] = { ...novos[indice], [campo]: valor }
    setItens(novos)
  }

  function adicionarItem() {
    setItens([...itens, { produtoId: '', quantidade: '1', precoUnitario: '' }])
  }

  function removerItem(indice: number) {
    setItens(itens.filter((_, i) => i !== indice))
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    setErro('')

    const dados = {
      clienteId: Number(clienteId),
      situacao,
      valorDesconto: valorDesconto ? Number(valorDesconto) : 0,
      validoAte: validoAte || undefined,
      observacoes: observacoes || undefined,
      itens: itens.map((i) => ({
        produtoId: Number(i.produtoId),
        quantidade: Number(i.quantidade),
        precoUnitario: i.precoUnitario ? Number(i.precoUnitario) : undefined,
      })),
    }

    const resultado = orcamento
      ? await atualizarOrcamento(orcamento.id, dados)
      : await criarOrcamento(dados)

    if (resultado?.erro) {
      setErro(resultado.erro)
    }
  }

  return (
    <form onSubmit={enviar} className="card card-body">
      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <select
            className="form-select"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Situação</label>
          <select
            className="form-select"
            value={situacao}
            onChange={(e) => setSituacao(e.target.value as SituacaoOrcamento)}
          >
            {SITUACOES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Válido até</label>
          <input
            type="date"
            className="form-control"
            value={validoAte}
            onChange={(e) => setValidoAte(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Desconto (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            value={valorDesconto}
            onChange={(e) => setValorDesconto(e.target.value)}
          />
        </div>

        <div className="col-md-9">
          <label className="form-label">Observações</label>
          <input
            className="form-control"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>
      </div>

      <h2 className="h5">Itens</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço unitário (opcional)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, indice) => (
            <tr key={indice}>
              <td>
                <select
                  className="form-select"
                  value={item.produtoId}
                  onChange={(e) =>
                    alterarItem(indice, 'produtoId', e.target.value)
                  }
                  required
                >
                  <option value="">Selecione...</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  className="form-control"
                  value={item.quantidade}
                  onChange={(e) =>
                    alterarItem(indice, 'quantidade', e.target.value)
                  }
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control"
                  value={item.precoUnitario}
                  onChange={(e) =>
                    alterarItem(indice, 'precoUnitario', e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removerItem(indice)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={adicionarItem}
        >
          Adicionar item
        </button>
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </div>
    </form>
  )
}

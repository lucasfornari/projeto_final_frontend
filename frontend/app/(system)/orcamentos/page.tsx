import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import { formatarMoeda } from '@/lib/formatar'
import type { Orcamento, SituacaoOrcamento } from '@/types/orcamento'

const SITUACOES: SituacaoOrcamento[] = [
  'pendente',
  'enviado',
  'aprovado',
  'rejeitado',
  'cancelado',
]

export default async function OrcamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string; ano?: string; situacao?: string }>
}) {
  const { mes, ano, situacao } = await searchParams

  const params = new URLSearchParams()
  if (mes) params.set('mes', mes)
  if (ano) params.set('ano', ano)
  if (situacao) params.set('situacao', situacao)
  const query = params.toString() ? `?${params.toString()}` : ''

  const res = await apiServerFetch(`/orcamentos${query}`)
  const orcamentos: Orcamento[] = res.ok ? await res.json() : []

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Orçamentos</h1>
        <Link href="/orcamentos/novo" className="btn btn-primary">
          Novo orçamento
        </Link>
      </div>

      <form className="row g-2 mb-3">
        <div className="col-auto">
          <input
            name="mes"
            type="number"
            min="1"
            max="12"
            className="form-control"
            placeholder="Mês"
            defaultValue={mes ?? ''}
          />
        </div>
        <div className="col-auto">
          <input
            name="ano"
            type="number"
            className="form-control"
            placeholder="Ano"
            defaultValue={ano ?? ''}
          />
        </div>
        <div className="col-auto">
          <select name="situacao" className="form-select" defaultValue={situacao ?? ''}>
            <option value="">Todas as situações</option>
            {SITUACOES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-outline-secondary">
            Filtrar
          </button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Situação</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((orcamento) => (
            <tr key={orcamento.id}>
              <td>{orcamento.id}</td>
              <td>{orcamento.cliente?.nome}</td>
              <td>{orcamento.situacao}</td>
              <td>{formatarMoeda(orcamento.total)}</td>
              <td className="text-end">
                <Link
                  href={`/orcamentos/${orcamento.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

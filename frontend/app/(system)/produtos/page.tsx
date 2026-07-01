import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import { formatarMoeda } from '@/lib/formatar'
import type { Produto } from '@/types/produto'
import FormularioProduto from './FormularioProduto'
import { excluirProduto } from './actions'

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string }>
}) {
  const { nome } = await searchParams

  const query = nome ? `?nome=${encodeURIComponent(nome)}` : ''
  const res = await apiServerFetch(`/produtos${query}`)
  const produtos: Produto[] = res.ok ? await res.json() : []

  return (
    <div>
      <h1 className="mb-4">Produtos</h1>

      <FormularioProduto />

      <form className="row g-2 mb-3">
        <div className="col-auto">
          <input
            name="nome"
            className="form-control"
            placeholder="Filtrar por nome"
            defaultValue={nome ?? ''}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-outline-secondary">
            Buscar
          </button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>SKU</th>
            <th>Preço</th>
            <th>Unidade</th>
            <th>Ativo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.codigoSku}</td>
              <td>{formatarMoeda(produto.precoUnitario)}</td>
              <td>{produto.unidade}</td>
              <td>{produto.ativo ? 'Sim' : 'Não'}</td>
              <td className="text-end">
                <Link
                  href={`/produtos/${produto.id}`}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Editar
                </Link>
                <form action={excluirProduto} className="d-inline">
                  <input type="hidden" name="id" value={produto.id} />
                  <button type="submit" className="btn btn-sm btn-outline-danger">
                    Excluir
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

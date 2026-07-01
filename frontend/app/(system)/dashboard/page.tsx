import { apiServerFetch } from '@/lib/api-server'
import { formatarMoeda } from '@/lib/formatar'
import type {
  ResumoDashboard,
  OrcamentosPorStatus,
  OrcamentosPorMes,
  ValorOrcadoPorMes,
  TopCliente,
  TopProduto,
} from '@/types/dashboard'

const MESES = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

async function buscarJson<T>(path: string, padrao: T): Promise<T> {
  const res = await apiServerFetch(path)
  return res.ok ? await res.json() : padrao
}

export default async function DashboardPage() {
  const ano = new Date().getFullYear()

  const resumo = await buscarJson<ResumoDashboard>('/dashboard/resumo', {
    totalOrcamentos: 0,
    totalClientes: 0,
    totalProdutosAtivos: 0,
  })
  const porStatus = await buscarJson<OrcamentosPorStatus[]>(
    '/dashboard/orcamentos-por-status',
    [],
  )
  const porMes = await buscarJson<OrcamentosPorMes[]>(
    `/dashboard/orcamentos-por-mes?ano=${ano}`,
    [],
  )
  const valorPorMes = await buscarJson<ValorOrcadoPorMes[]>(
    `/dashboard/valor-orcado-por-mes?ano=${ano}`,
    [],
  )
  const topClientes = await buscarJson<TopCliente[]>(
    '/dashboard/top-clientes-orcamentos?limit=10',
    [],
  )
  const topProdutos = await buscarJson<TopProduto[]>(
    '/dashboard/top-produtos-orcados?limit=10',
    [],
  )

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card card-body text-center">
            <div className="text-muted">Orçamentos</div>
            <div className="fs-2 fw-bold">{resumo.totalOrcamentos}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body text-center">
            <div className="text-muted">Clientes</div>
            <div className="fs-2 fw-bold">{resumo.totalClientes}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body text-center">
            <div className="text-muted">Produtos ativos</div>
            <div className="fs-2 fw-bold">{resumo.totalProdutosAtivos}</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <h2 className="h5">Orçamentos por situação</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Situação</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {porStatus.map((linha) => (
                <tr key={linha.situacao}>
                  <td>{linha.situacao}</td>
                  <td>{linha.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <h2 className="h5">Orçamentos por mês ({ano})</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Mês</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {porMes.map((linha) => (
                <tr key={linha.mes}>
                  <td>{MESES[linha.mes - 1]}</td>
                  <td>{linha.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <h2 className="h5">Valor orçado por mês ({ano})</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Mês</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {valorPorMes.map((linha) => (
                <tr key={linha.mes}>
                  <td>{MESES[linha.mes - 1]}</td>
                  <td>{formatarMoeda(linha.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <h2 className="h5">Top clientes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Orçamentos</th>
              </tr>
            </thead>
            <tbody>
              {topClientes.map((linha) => (
                <tr key={linha.clienteId}>
                  <td>{linha.nome}</td>
                  <td>{linha.totalOrcamentos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <h2 className="h5">Top produtos</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Ocorrências</th>
              </tr>
            </thead>
            <tbody>
              {topProdutos.map((linha) => (
                <tr key={linha.produtoId}>
                  <td>{linha.nome}</td>
                  <td>{linha.totalOcorrencias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

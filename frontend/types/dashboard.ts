export interface ResumoDashboard {
  totalOrcamentos: number
  totalClientes: number
  totalProdutosAtivos: number
}

export interface OrcamentosPorStatus {
  situacao: string
  total: number
}

export interface OrcamentosPorMes {
  ano: number
  mes: number
  total: number
}

export interface ValorOrcadoPorMes {
  ano: number
  mes: number
  total: number
}

export interface TopCliente {
  clienteId: number
  nome: string
  totalOrcamentos: number
}

export interface TopProduto {
  produtoId: number
  nome: string
  totalOcorrencias: number
}

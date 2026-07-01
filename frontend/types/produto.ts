export interface Produto {
  id: number
  codigoSku: string | null
  nome: string
  descricao: string | null
  precoUnitario: number
  unidade: string
  ativo: boolean
  criadoEm: string
  atualizadoEm: string
}

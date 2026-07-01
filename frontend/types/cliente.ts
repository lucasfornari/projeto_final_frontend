export interface Cliente {
  id: number
  nome: string
  documento: string | null
  email: string | null
  telefone: string | null
  observacoes: string | null
  criadoEm: string
  atualizadoEm: string
}

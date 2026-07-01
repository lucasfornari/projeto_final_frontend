import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import type { Cliente } from '@/types/cliente'
import type { Produto } from '@/types/produto'
import FormularioOrcamento from '../FormularioOrcamento'

export default async function NovoOrcamentoPage() {
  const resClientes = await apiServerFetch('/clientes')
  const resProdutos = await apiServerFetch('/produtos?ativo=true')

  const clientes: Cliente[] = resClientes.ok ? await resClientes.json() : []
  const produtos: Produto[] = resProdutos.ok ? await resProdutos.json() : []

  return (
    <div>
      <Link href="/orcamentos" className="btn btn-link px-0 mb-3">
        &larr; voltar
      </Link>
      <h1 className="mb-4">novo orçamento</h1>
      <FormularioOrcamento clientes={clientes} produtos={produtos} />
    </div>
  )
}

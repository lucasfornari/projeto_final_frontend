import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import type { Cliente } from '@/types/cliente'
import type { Produto } from '@/types/produto'
import type { Orcamento } from '@/types/orcamento'
import FormularioOrcamento from '../FormularioOrcamento'

export default async function EditarOrcamentoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const resOrcamento = await apiServerFetch(`/orcamentos/${id}`)
  if (!resOrcamento.ok) {
    return <p>orçamento não encontrado.</p>
  }

  const resClientes = await apiServerFetch('/clientes')
  const resProdutos = await apiServerFetch('/produtos?ativo=true')

  const orcamento: Orcamento = await resOrcamento.json()
  const clientes: Cliente[] = resClientes.ok ? await resClientes.json() : []
  const produtos: Produto[] = resProdutos.ok ? await resProdutos.json() : []

  return (
    <div>
      <Link href="/orcamentos" className="btn btn-link px-0 mb-3">
        &larr; Voltar
      </Link>
      <h1 className="mb-4">editar orçamento #{orcamento.id}</h1>
      <FormularioOrcamento
        clientes={clientes}
        produtos={produtos}
        orcamento={orcamento}
      />
    </div>
  )
}

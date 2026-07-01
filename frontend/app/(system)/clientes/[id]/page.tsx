import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import type { Cliente } from '@/types/cliente'
import FormularioCliente from '../FormularioCliente'

export default async function EditarClientePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await apiServerFetch(`/clientes/${id}`)

  if (!res.ok) {
    return <p>cliente não encontrado.</p>
  }

  const cliente: Cliente = await res.json()

  return (
    <div>
      <Link href="/clientes" className="btn btn-link px-0 mb-3">
      {/* &larr; é uma seta para esquerda */}
        &larr; voltar
      </Link>
      <FormularioCliente cliente={cliente} />
    </div>
  )
}

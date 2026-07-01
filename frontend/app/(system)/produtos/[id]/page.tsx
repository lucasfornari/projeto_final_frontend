import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import type { Produto } from '@/types/produto'
import FormularioProduto from '../FormularioProduto'

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await apiServerFetch(`/produtos/${id}`)

  if (!res.ok) {
    return <p>produto não encontrado.</p>
  }

  const produto: Produto = await res.json()

  return (
    <div>
      <Link href="/produtos" className="btn btn-link px-0 mb-3">
        &larr; voltar
      </Link>
      <FormularioProduto produto={produto} />
    </div>
  )
}

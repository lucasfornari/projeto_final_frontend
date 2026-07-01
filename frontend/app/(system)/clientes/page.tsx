import Link from 'next/link'
import { apiServerFetch } from '@/lib/api-server'
import type { Cliente } from '@/types/cliente'
import FormularioCliente from './FormularioCliente'
import { excluirCliente } from './actions'

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string }>
}) {
  const { nome } = await searchParams

  const query = nome ? `?nome=${encodeURIComponent(nome)}` : ''
  const res = await apiServerFetch(`/clientes${query}`)
  const clientes: Cliente[] = res.ok ? await res.json() : []

  return (
    <div>
      <h1 className="mb-4">Clientes</h1>

      <FormularioCliente />

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
            buscar
          </button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.documento}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td className="text-end">
                <Link
                  href={`/clientes/${cliente.id}`}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  editar
                </Link>
                <form action={excluirCliente} className="d-inline">
                  <input type="hidden" name="id" value={cliente.id} />
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

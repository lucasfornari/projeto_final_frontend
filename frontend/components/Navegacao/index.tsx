import Link from 'next/link'
import { logout } from '@/app/(auth)/logout/actions'

export default function Navegacao() {
  return (
    <nav className="d-flex align-items-center gap-3">
      <Link href="/dashboard" className="nav-link text-white">
        Dash
      </Link>
      <Link href="/produtos" className="nav-link text-white">
        Produtos
      </Link>
      <Link href="/clientes" className="nav-link text-white">
        Clientes
      </Link>
      <Link href="/orcamentos" className="nav-link text-white">
        Orçamentos
      </Link>
      <Link href="/usuario" className="nav-link text-white">
        Perfil
      </Link>
      <form action={logout}>
        <button type="submit" className="btn btn-outline-light btn-sm">
          Sair
        </button>
      </form>
    </nav>
  )
}

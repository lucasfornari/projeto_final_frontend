import Link from 'next/link'
import Navegacao from '@/components/Navegacao'

export default function Cabecalho() {
  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/dashboard" className="text-white text-decoration-none fs-5 fw-semibold">
          SENAC orçamentos
        </Link>
        <Navegacao />
      </div>
    </header>
  )
}

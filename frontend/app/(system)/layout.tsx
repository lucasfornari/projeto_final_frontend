import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Cabecalho />
      <main className="container flex-grow-1">{children}</main>
      <Rodape />
    </div>
  )
}

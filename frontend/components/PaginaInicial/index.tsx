import Image from "next/image";
import Link from "next/link";

export default function PaginaInicial() {
  return (
    <div className="auth-shell min-vh-100 d-flex flex-column">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3 py-5">
        <div className="text-center text-white" style={{ maxWidth: "520px" }}>
          <Image
            src="/logo.svg"
            alt="Logo Orçamentos"
            width={64}
            height={64}
            priority
            className="mb-4"
          />
          <h1 className="display-5 fw-semibold mb-3">SENAC orçamentos</h1>
          <p className="lead text-white-50 mb-4">
            orçamentos da empresa
          </p>
          <Link href="/login" className="btn btn-secondary btn-lg">
            Entrar
          </Link>
        </div>
      </main>
    </div>
  );
}

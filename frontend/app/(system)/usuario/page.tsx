import { apiServerFetch } from '@/lib/api-server'
import { formatarData } from '@/lib/formatar'
import type { Usuario } from '@/types/usuario'
import FormularioPerfil from './FormularioPerfil'
import FormularioSenha from './FormularioSenha'

export default async function UsuarioPage() {
  const res = await apiServerFetch('/usuarios/atual')

  if (!res.ok) {
    return <p>não foi possível carregar o usuário.</p>
  }

  const usuario: Usuario = await res.json()

  return (
    <div>
      <h1 className="mb-4">Perfil</h1>

      <div className="card card-body mb-4">
        <h2 className="h5 mb-3">Informações</h2>
        <ul className="list-unstyled mb-0">
          <li>
            <strong>ID:</strong> {usuario.id}
          </li>
          <li>
            <strong>E-mail:</strong> {usuario.email}
          </li>
          <li>
            <strong>Nome completo:</strong> {usuario.nomeCompleto}
          </li>
          <li>
            <strong>Perfil:</strong> {usuario.perfil}
          </li>
          <li>
            <strong>Ativo:</strong> {usuario.ativo ? 'Sim' : 'Não'}
          </li>
          <li>
            <strong>Criado em:</strong> {formatarData(usuario.criadoEm)}
          </li>
          <li>
            <strong>Atualizado em:</strong> {formatarData(usuario.atualizadoEm)}
          </li>
        </ul>
      </div>

      <FormularioPerfil usuario={usuario} />
      <FormularioSenha />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { alterarSenha } from './actions'

export default function FormularioSenha() {
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    setErro('')
    setSucesso('')

    if (novaSenha !== confirmacao) {
      setErro('A confirmação não confere com a nova senha.')
      return
    }

    const resultado = await alterarSenha({ senhaAtual, novaSenha })
    if (resultado.erro) {
      setErro(resultado.erro)
      return
    }

    setSucesso(resultado.sucesso ?? 'Senha alterada com sucesso.')
    setSenhaAtual('')
    setNovaSenha('')
    setConfirmacao('')
  }

  return (
    <form onSubmit={enviar} className="card card-body">
      <h2 className="h5 mb-3">alterar senha</h2>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}
      {sucesso && (
        <div className="alert alert-success" role="alert">
          {sucesso}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">senha atual</label>
        <input
          type="password"
          className="form-control"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">nova senha</label>
        <input
          type="password"
          className="form-control"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">confirmar nova senha</label>
        <input
          type="password"
          className="form-control"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          required
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primary">
          alterar senha
        </button>
      </div>
    </form>
  )
}
